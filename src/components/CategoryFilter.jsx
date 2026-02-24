const CATEGORIES = [
    { id: 'all', label: 'All', icon: '🌐' },
    { id: 'technology', label: 'Technology', icon: '💻' },
    { id: 'finance', label: 'Finance', icon: '📈' },
    { id: 'startups', label: 'Startups', icon: '🚀' },
    { id: 'business', label: 'Business', icon: '💼' },
    { id: 'ai', label: 'AI / Innovation', icon: '🤖' },
    { id: 'general', label: 'General', icon: '📰' },
]

function CategoryFilter({ activeCategory, onCategoryChange }) {
    return (
        <div className="category-filter" role="tablist" aria-label="Filter by category">
            {CATEGORIES.map(cat => (
                <button
                    key={cat.id}
                    id={`category-${cat.id}`}
                    className={`category-btn ${activeCategory === cat.id ? 'active' : ''}`}
                    onClick={() => onCategoryChange(cat.id)}
                    role="tab"
                    aria-selected={activeCategory === cat.id}
                >
                    {cat.icon} {cat.label}
                </button>
            ))}
        </div>
    )
}

export default CategoryFilter
