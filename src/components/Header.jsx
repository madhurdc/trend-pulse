function Header({ darkMode, toggleDarkMode }) {
    return (
        <header className="header">
            <div className="header-content">
                <div className="header-logo">
                    <div className="header-logo-icon">⚡</div>
                    <h1>TrendPulse</h1>
                </div>
                <div className="header-actions">
                    <button
                        id="dark-mode-toggle"
                        className="dark-mode-btn"
                        onClick={toggleDarkMode}
                        aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                    >
                        {darkMode ? '☀️' : '🌙'}
                    </button>
                </div>
            </div>
        </header>
    )
}

export default Header
