import React from "react";
import TrackComponent from "../components/Motorcycle/TrackComponent";
import "../styles/track.css";

const TrackerPage: React.FC = () => {
  return (
    <div className="tracker-page-wrapper">
      <TrackComponent />
    </div>
  );
};

export default TrackerPage;