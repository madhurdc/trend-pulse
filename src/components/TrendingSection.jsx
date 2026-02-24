function TrendingSection({ articles }) {
    if (!articles || articles.length === 0) return null

    const trending = articles.slice(0, 3)

    return (
        <section className="trending-section">
            <div className="section-header">
                <h3>🔥 Trending Now</h3>
                <span className="badge">Live</span>
            </div>
            <div className="trending-grid">
                {trending.map(article => (
                    <a
                        key={article.id}
                        className="trending-card"
                        href={article.article_url}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {article.image_url ? (
                            <img
                                className="trending-card-image"
                                src={article.image_url}
                                alt={article.title}
                                loading="lazy"
                            />
                        ) : (
                            <div className="trending-card-image" style={{
                                background: 'var(--accent-gradient)',
                                width: '100%',
                                height: '100%',
                            }} />
                        )}
                        <div className="trending-card-overlay">
                            <span className="trending-card-source">{article.source}</span>
                            <h3 className="trending-card-title">{article.title}</h3>
                        </div>
                    </a>
                ))}
            </div>
        </section>
    )
}

export default TrendingSection
