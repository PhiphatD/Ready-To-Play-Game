import './Navbar.css'

const Navbar = ({ searchText, setSearchText, darkMode, setDarkMode }) => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <h1>🎮 Ready To Play?</h1>
        </div>
        
        <div className="navbar-center">
          <div className="search-container">
            <input
              type="text"
              placeholder="ค้นหาเกมที่คุณต้องการ..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="search-input"
            />
            <div className="search-icon">🔍</div>
          </div>
        </div>

        <div className="navbar-actions">
          <button 
            className="theme-toggle"
            onClick={() => setDarkMode(!darkMode)}
            aria-label="Toggle dark mode"
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar