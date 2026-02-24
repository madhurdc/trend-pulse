function LoadingSpinner() {
    return (
        <div className="loading-container" role="status" aria-label="Loading">
            <div className="loading-spinner" />
            <p className="loading-text">Fetching the latest news...</p>
        </div>
    )
}

function SkeletonLoader() {
    return (
        <div className="skeleton-grid">
            {[...Array(6)].map((_, i) => (
                <div key={i} className="skeleton-card">
                    <div className="skeleton-image" />
                    <div className="skeleton-body">
                        <div className="skeleton-line short" />
                        <div className="skeleton-line long" />
                        <div className="skeleton-line medium" />
                    </div>
                </div>
            ))}
        </div>
    )
}

export { LoadingSpinner, SkeletonLoader }
export default LoadingSpinner
