function ErrorMessage({ message, onRetry }) {
    return (
        <div className="error-container" role="alert">
            <div className="error-icon">⚠️</div>
            <h3 className="error-title">Something went wrong</h3>
            <p className="error-message">
                {message || 'Unable to load news articles. Please check your connection and try again.'}
            </p>
            {onRetry && (
                <button className="error-retry-btn" onClick={onRetry}>
                    Try Again
                </button>
            )}
        </div>
    )
}

export default ErrorMessage
