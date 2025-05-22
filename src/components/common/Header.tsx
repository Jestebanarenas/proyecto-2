import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const [user, setUser] = React.useState<{ name: string; picture: string } | null>(null);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    const userStr = localStorage.getItem('google_user');
    if (userStr) {
      setUser(JSON.parse(userStr));
    } else {
      setUser(null);
    }

    // Listen for storage changes (in case of login/logout in another tab)
    const onStorage = () => {
      const userStr = localStorage.getItem('google_user');
      if (userStr) {
        setUser(JSON.parse(userStr));
      } else {
        setUser(null);
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('google_token');
    localStorage.removeItem('google_user');
    setUser(null);
    navigate('/login');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        {/* Imagen SVG de hamburguesa y título al lado */}
        <Link to="/" className="navbar-brand" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <svg width="38" height="38" viewBox="0 0 48 48" fill="none">
            {/* Pan superior */}
            <ellipse cx="24" cy="16" rx="18" ry="8" fill="#FFD966" stroke="#C68642" strokeWidth="2"/>
            {/* Semillas */}
            <ellipse cx="18" cy="14" rx="1.2" ry="0.6" fill="#fff" />
            <ellipse cx="24" cy="13" rx="1.2" ry="0.6" fill="#fff" />
            <ellipse cx="30" cy="15" rx="1.2" ry="0.6" fill="#fff" />
            {/* Lechuga */}
            <rect x="8" y="20" width="32" height="4" rx="2" fill="#92C47E"/>
            {/* Carne */}
            <rect x="10" y="24" width="28" height="6" rx="3" fill="#8B5C2A"/>
            {/* Queso */}
            <rect x="12" y="30" width="24" height="4" rx="2" fill="#FFD966"/>
            {/* Pan inferior */}
            <ellipse cx="24" cy="36" rx="16" ry="6" fill="#FFD966" stroke="#C68642" strokeWidth="2"/>
          </svg>
          <span style={{ marginLeft: 12, fontWeight: 700, fontSize: 22, color: "#222" }}>Domi JJJ</span>
        </Link>
      </div>
      
      <div className="navbar-links">
        {/* Main action buttons - always visible */}
        <Link to="/orders/new" className="navbar-link primary-action">Crear Pedido</Link>
        <Link to="/orders/track" className="navbar-link primary-action">Rastrear</Link>
        {/* Deployable Menu Button */}
        <div className="navbar-menu-container">
          <button 
            className="navbar-menu-toggle"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
            <span>Menú</span>
          </button>
          
          {/* Dropdown Menu */}
          {isMenuOpen && (
            <div className="navbar-dropdown">
              <div className="navbar-dropdown-overlay" onClick={closeMenu}></div>
              <div className="navbar-dropdown-content">
                <div className="navbar-dropdown-section">
                  <h4>Gestión</h4>
                  <Link to="/customers" className="navbar-dropdown-link" onClick={closeMenu}>
                    <span className="dropdown-icon">👥</span>
                    Clientes
                  </Link>
                  <Link to="/adresses" className="navbar-dropdown-link" onClick={closeMenu}>
                    <span className="dropdown-icon">📍</span>
                    Direcciones
                  </Link>
                  <Link to="/products" className="navbar-dropdown-link" onClick={closeMenu}>
                    <span className="dropdown-icon">🍕</span>
                    Productos
                  </Link>
                  <Link to="/restaurants" className="navbar-dropdown-link" onClick={closeMenu}>
                    <span className="dropdown-icon">🏪</span>
                    Restaurantes
                  </Link>
                </div>
                
                <div className="navbar-dropdown-section">
                  <h4>Pedidos</h4>
                  <Link to="/orders/by-customer" className="navbar-dropdown-link" onClick={closeMenu}>
                    <span className="dropdown-icon">📋</span>
                    Órdenes por Cliente
                  </Link>
                  <Link to="/stats" className="navbar-dropdown-link" onClick={closeMenu}>
                    <span className="dropdown-icon">📊</span>
                    Estadísticas
                  </Link>
                </div>
                
                <div className="navbar-dropdown-section">
                  <h4>Operaciones</h4>
                  <Link to="/drivers" className="navbar-dropdown-link" onClick={closeMenu}>
                    <span className="dropdown-icon">🚗</span>
                    Conductores
                  </Link>
                  <Link to="/motorcycles" className="navbar-dropdown-link" onClick={closeMenu}>
                    <span className="dropdown-icon">🏍️</span>
                    Motos
                  </Link>
                  <Link to="/shifts" className="navbar-dropdown-link" onClick={closeMenu}>
                    <span className="dropdown-icon">⏰</span>
                    Turnos
                  </Link>
                </div>
                
                <div className="navbar-dropdown-section">
                  <h4>Otros</h4>
                  <Link to="/photos" className="navbar-dropdown-link" onClick={closeMenu}>
                    <span className="dropdown-icon">📸</span>
                    Fotos
                  </Link>
                  <Link to="/issues" className="navbar-dropdown-link" onClick={closeMenu}>
                    <span className="dropdown-icon">⚠️</span>
                    Incidencias
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* User authentication */}
        {!user && (
          <Link to="/login" className="navbar-link">Login</Link>
        )}
        {user && (
          <div className="header-user-info">
            <img src={user.picture} alt="user" />
            <span>{user.name}</span>
            <button onClick={handleLogout}>
              Cerrar sesión
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;