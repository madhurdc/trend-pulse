import { Router } from 'express'
import { getNews, searchNews } from '../services/newsService.js'

const router = Router()

// GET /api/news — returns latest articles, optionally filtered by category
router.get('/news', async (req, res) => {
    try {
        const { category } = req.query
        const articles = await getNews(category)
        res.json({ success: true, count: articles.length, articles })
    } catch (error) {
        console.error('Error fetching news:', error.message)
        res.status(500).json({
            success: false,
            error: 'Failed to fetch news. Please try again later.',
        })
    }
})

// GET /api/search?q=keyword — returns search results
router.get('/search', async (req, res) => {
    try {
        const { q } = req.query
        if (!q || q.trim().length === 0) {
            return res.status(400).json({
                success: false,
                error: 'Search query is required.',
            })
        }
        const articles = await searchNews(q.trim())
        res.json({ success: true, count: articles.length, articles })
    } catch (error) {
        console.error('Error searching news:', error.message)
        res.status(500).json({
            success: false,
            error: 'Failed to search news. Please try again later.',
        })
    }
})

export default router
