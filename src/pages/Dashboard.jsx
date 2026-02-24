import useNews from '../hooks/useNews'
import SearchBar from '../components/SearchBar'
import CategoryFilter from '../components/CategoryFilter'
import TrendingSection from '../components/TrendingSection'
import NewsGrid from '../components/NewsGrid'
import { SkeletonLoader } from '../components/LoadingSpinner'
import ErrorMessage from '../components/ErrorMessage'

function Dashboard() {
    const {
        articles,
        loading,
        error,
        category,
        searchQuery,
        handleCategoryChange,
        handleSearch,
        retry,
    } = useNews()

    return (
        <main className="dashboard">
            {/* Hero Section */}
            <section className="hero">
                <h2>
                    Stay Ahead with <span className="gradient-text">TrendPulse</span>
                </h2>
                <p>
                    Your real-time dashboard for the latest news and trends across
                    technology, finance, startups, and more.
                </p>
            </section>

            {/* Search */}
            <SearchBar onSearch={handleSearch} />

            {/* Category Filter */}
            <CategoryFilter
                activeCategory={category}
                onCategoryChange={handleCategoryChange}
            />

            {/* Error State */}
            {error && <ErrorMessage message={error} onRetry={retry} />}

            {/* Loading State */}
            {loading && !error && <SkeletonLoader />}

            {/* Content */}
            {!loading && !error && (
                <>
                    {/* Show trending only on "all" category and no search */}
                    {!searchQuery && category === 'all' && (
                        <TrendingSection articles={articles} />
                    )}
                    <NewsGrid articles={searchQuery || category !== 'all' ? articles : articles.slice(3)} />
                </>
            )}
        </main>
    )
}

export default Dashboard
