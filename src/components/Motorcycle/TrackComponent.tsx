import React, { useState, useEffect } from "react";
import { getMotorcycles } from "../../api/motorcycle.api";
import { MotorcycleResponse } from "../../types/Motorcycle.type";
import { io, Socket } from "socket.io-client";
import OrderMap from "../map/map";
import "../../styles/track.css";

interface Coordinate {
  lat: number;
  lng: number;
}

interface MotorcyclePosition {
  [plate: string]: Coordinate;
}

const TrackComponent: React.FC = () => {
  const [motorcycles, setMotorcycles] = useState<MotorcycleResponse[]>([]);
  const [selectedPlate, setSelectedPlate] = useState<string | null>(null);
  const [positions, setPositions] = useState<MotorcyclePosition>({});
  const [loading, setLoading] = useState(false);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [trackingStatus, setTrackingStatus] = useState<{
    [plate: string]: boolean;
  }>({});

  useEffect(() => {
    const newSocket = io(
      process.env.REACT_APP_API_URL || "http://localhost:5000"
    );
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    const loadMotorcycles = async () => {
      setLoading(true);
      try {
        const data = await getMotorcycles();
        setMotorcycles(data);
      } catch (error) {
        console.error("Error loading motorcycles:", error);
      } finally {
        setLoading(false);
      }
    };

    loadMotorcycles();
  }, []);

  useEffect(() => {
    if (!socket) return;

    motorcycles.forEach((motorcycle) => {
      socket.on(motorcycle.license_plate, (coord: Coordinate) => {
        setPositions((prev) => ({
          ...prev,
          [motorcycle.license_plate]: coord,
        }));
      });
    });

    return () => {
      motorcycles.forEach((motorcycle) => {
        socket.off(motorcycle.license_plate);
      });
    };
  }, [motorcycles, socket]);

  const startTracking = async (plate: string) => {
    if (!socket) return;

    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/motorcycles/track/${plate}`,
        {
          method: "POST",
        }
      );
      const data = await response.json();

      if (data.status === "ok") {
        setTrackingStatus((prev) => ({ ...prev, [plate]: true }));
        setSelectedPlate(plate);
      }
    } catch (error) {
      console.error("Error starting tracking:", error);
    } finally {
      setLoading(false);
    }
  };

  const stopTracking = async (plate: string) => {
    if (!socket) return;

    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/motorcycles/stop/${plate}`,
        {
          method: "POST",
        }
      );
      const data = await response.json();

      if (data.status === "ok") {
        setTrackingStatus((prev) => ({ ...prev, [plate]: false }));
        if (selectedPlate === plate) {
          setSelectedPlate(null);
        }
      }
    } catch (error) {
      console.error("Error stopping tracking:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="tracker-container">
      <div className="tracker-header">
        <h2>Rastreo de Motociclistas</h2>
        <p>Selecciona el motociclista a rastrear</p>
      </div>

      <div className="tracker-content">
        <div className="motorcycle-list-container">
          <div className="list-header">
            <h3>Motocicletas Disponibles</h3>
            {loading && <span className="loading-indicator">Cargando...</span>}
          </div>

          <div className="motorcycle-list">
            {motorcycles.length === 0 && !loading ? (
              <div className="empty-state">No hay motocicletas disponibles</div>
            ) : (
              motorcycles.map((motorcycle) => (
                <div
                  key={motorcycle.license_plate}
                  className={`motorcycle-item ${
                    selectedPlate === motorcycle.license_plate ? "active" : ""
                  }`}
                >
                  <div className="motorcycle-info">
                    <span className="plate">{motorcycle.license_plate}</span>
                    <span className="details">
                      {motorcycle.brand} • {motorcycle.status}
                    </span>
                  </div>
                  <div className="track-actions">
                    {trackingStatus[motorcycle.license_plate] ? (
                      <button
                        onClick={() => stopTracking(motorcycle.license_plate)}
                        disabled={loading}
                        className="btn-stop"
                      >
                        Detener
                      </button>
                    ) : (
                      <button
                        onClick={() => startTracking(motorcycle.license_plate)}
                        disabled={loading}
                        className="btn-start"
                      >
                        Rastrear
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="map-view">
          {selectedPlate && positions[selectedPlate] ? (
            <>
              <div className="map-header">
                <h3>Rastreando: {selectedPlate}</h3>
                <span className="status-indicator active">Activo</span>
              </div>
              <div className="map-wrapper">
                <OrderMap
                  lat={positions[selectedPlate].lat}
                  lng={positions[selectedPlate].lng}
                  address={`${selectedPlate} current position`}
                />
              </div>
            </>
          ) : (
            <div className="map-placeholder">
              <div className="placeholder-content">
                <svg
                  width="64"
                  height="64"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <h4>Ningún motociclista seleccionado</h4>
                <p>
                  Selecciona un motociclista de la lista para comenzar a
                  rastrearlo
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrackComponent;
