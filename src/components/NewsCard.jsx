function formatDate(dateStr) {
    try {
        const date = new Date(dateStr)
        const now = new Date()
        const diffMs = now - date
        const diffHrs = Math.floor(diffMs / (1000 * 60 * 60))
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

        if (diffHrs < 1) return 'Just now'
        if (diffHrs < 24) return `${diffHrs}h ago`
        if (diffDays < 7) return `${diffDays}d ago`
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    } catch {
        return ''
    }
}

function NewsCard({ article }) {
    const handleClick = () => {
        window.open(article.article_url, '_blank', 'noopener,noreferrer')
    }

    return (
        <article className="news-card" onClick={handleClick} tabIndex={0} role="link">
            <div className="news-card-image-wrapper">
                {article.image_url ? (
                    <img
                        className="news-card-image"
                        src={article.image_url}
                        alt={article.title}
                        loading="lazy"
                        onError={(e) => {
                            e.target.style.display = 'none'
                            e.target.nextElementSibling.style.display = 'flex'
                        }}
                    />
                ) : null}
                <div
                    className="news-card-image-placeholder"
                    style={{ display: article.image_url ? 'none' : 'flex' }}
                >
                    📰
                </div>
                <span className="news-card-category">{article.category}</span>
            </div>
            <div className="news-card-body">
                <div className="news-card-meta">
                    <span className="news-card-source">{article.source}</span>
                    <span className="news-card-date">{formatDate(article.published_at)}</span>
                </div>
                <h3 className="news-card-title">{article.title}</h3>
                <p className="news-card-description">{article.description}</p>
            </div>
            <div className="news-card-footer">
                <span className="news-card-read-more">
                    Read Full Article →
                </span>
            </div>
        </article>
    )
}

export default NewsCard
