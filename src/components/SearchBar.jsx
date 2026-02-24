import { useState, useEffect, useRef } from 'react'

function SearchBar({ onSearch }) {
    const [query, setQuery] = useState('')
    const debounceTimer = useRef(null)

    useEffect(() => {
        if (debounceTimer.current) {
            clearTimeout(debounceTimer.current)
        }

        debounceTimer.current = setTimeout(() => {
            onSearch(query)
        }, 400)

        return () => {
            if (debounceTimer.current) {
                clearTimeout(debounceTimer.current)
            }
        }
    }, [query, onSearch])

    const handleClear = () => {
        setQuery('')
        onSearch('')
    }

    return (
        <div className="search-container">
            <div className="search-input-wrapper">
                <span className="search-icon">🔍</span>
                <input
                    id="search-input"
                    type="text"
                    className="search-input"
                    placeholder="Search for news, topics, or keywords..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    aria-label="Search news"
                />
                {query && (
                    <button
                        className="search-clear-btn"
                        onClick={handleClear}
                        aria-label="Clear search"
                    >
                        ✕
                    </button>
                )}
            </div>
        </div>
    )
}

export default SearchBar
