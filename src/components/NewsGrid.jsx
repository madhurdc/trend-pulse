import NewsCard from './NewsCard'

function NewsGrid({ articles }) {
    if (!articles || articles.length === 0) {
        return (
            <div className="empty-state">
                <div className="empty-state-icon">🔍</div>
                <h3>No articles found</h3>
                <p>Try adjusting your search or filter to find what you're looking for.</p>
            </div>
        )
    }

    return (
        <section className="news-section">
            <div className="section-header">
                <h3>📋 Latest News</h3>
                <span style={{ color: 'var(--text-tertiary)', fontSize: '0.85rem' }}>
                    {articles.length} article{articles.length !== 1 ? 's' : ''}
                </span>
            </div>
            <div className="news-grid">
                {articles.map(article => (
                    <NewsCard key={article.id} article={article} />
                ))}
            </div>
        </section>
    )
}

export default NewsGrid
