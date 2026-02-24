import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'

function useNews() {
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [category, setCategory] = useState('all')
    const [searchQuery, setSearchQuery] = useState('')

    const fetchNews = useCallback(async () => {
        setLoading(true)
        setError(null)

        try {
            let url = '/api/news'
            const params = {}

            if (searchQuery) {
                url = '/api/search'
                params.q = searchQuery
            } else if (category && category !== 'all') {
                params.category = category
            }

            const response = await axios.get(url, { params, timeout: 10000 })

            if (response.data.success) {
                setArticles(response.data.articles)
            } else {
                setError(response.data.error || 'Failed to fetch news')
            }
        } catch (err) {
            console.error('Failed to fetch news:', err)
            if (err.code === 'ECONNABORTED') {
                setError('Request timed out. Please try again.')
            } else if (err.response) {
                setError(err.response.data?.error || 'Server error. Please try again.')
            } else {
                setError('Could not connect to the server. Make sure the backend is running.')
            }
        } finally {
            setLoading(false)
        }
    }, [category, searchQuery])

    useEffect(() => {
        fetchNews()
    }, [fetchNews])

    const handleCategoryChange = useCallback((newCategory) => {
        setSearchQuery('')
        setCategory(newCategory)
    }, [])

    const handleSearch = useCallback((query) => {
        setSearchQuery(query)
    }, [])

    const retry = useCallback(() => {
        fetchNews()
    }, [fetchNews])

    return {
        articles,
        loading,
        error,
        category,
        searchQuery,
        handleCategoryChange,
        handleSearch,
        retry,
    }
}

export default useNews
