import { useState } from 'react'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'

function App() {
    const [darkMode, setDarkMode] = useState(false)

    const toggleDarkMode = () => {
        setDarkMode(prev => !prev)
    }

    return (
        <div className={`app ${darkMode ? 'dark' : ''}`}>
            <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
            <Dashboard />
        </div>
    )
}

export default App
