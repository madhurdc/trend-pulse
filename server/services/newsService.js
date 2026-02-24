import axios from 'axios'
import dotenv from 'dotenv'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const API_KEY = process.env.NEWS_API_KEY
const BASE_URL = 'https://gnews.io/api/v4'

// Category mapping for GNews API
const CATEGORY_MAP = {
    technology: 'technology',
    finance: 'business',
    business: 'business',
    startups: 'technology',
    general: 'general',
    ai: 'technology',
    innovation: 'science',
}

/**
 * Load mock data as fallback
 */
function loadMockData() {
    try {
        const mockPath = join(__dirname, '..', 'data', 'mockData.json')
        const data = JSON.parse(readFileSync(mockPath, 'utf-8'))
        return data
    } catch (err) {
        console.error('Failed to load mock data:', err.message)
        return []
    }
}

/**
 * Normalize API response to standard article format
 */
function normalizeArticle(article, index, category = 'general') {
    return {
        id: `article-${Date.now()}-${index}`,
        title: article.title || 'Untitled',
        description: article.description || 'No description available.',
        source: article.source?.name || article.source || 'Unknown',
        category,
        published_at: article.publishedAt || new Date().toISOString(),
        image_url: article.image || article.urlToImage || null,
        article_url: article.url || '#',
    }
}

/**
 * Fetch news articles, optionally filtered by category
 */
export async function getNews(category = null) {
    // Try live API first
    if (API_KEY && API_KEY !== 'your_api_key_here') {
        try {
            const apiCategory = category ? (CATEGORY_MAP[category.toLowerCase()] || 'general') : 'general'
            const response = await axios.get(`${BASE_URL}/top-headlines`, {
                params: {
                    category: apiCategory,
                    lang: 'en',
                    max: 20,
                    apikey: API_KEY,
                },
                timeout: 8000,
            })

            if (response.data && response.data.articles) {
                return response.data.articles.map((a, i) =>
                    normalizeArticle(a, i, category || 'general')
                )
            }
        } catch (error) {
            console.warn('API request failed, falling back to mock data:', error.message)
        }
    }

    // Fallback to mock data
    const mockArticles = loadMockData()
    if (category && category.toLowerCase() !== 'all') {
        return mockArticles.filter(
            a => a.category.toLowerCase() === category.toLowerCase()
        )
    }
    return mockArticles
}

/**
 * Search news articles by keyword
 */
export async function searchNews(query) {
    // Try live API first
    if (API_KEY && API_KEY !== 'your_api_key_here') {
        try {
            const response = await axios.get(`${BASE_URL}/search`, {
                params: {
                    q: query,
                    lang: 'en',
                    max: 20,
                    apikey: API_KEY,
                },
                timeout: 8000,
            })

            if (response.data && response.data.articles) {
                return response.data.articles.map((a, i) =>
                    normalizeArticle(a, i, 'general')
                )
            }
        } catch (error) {
            console.warn('Search API failed, falling back to mock data:', error.message)
        }
    }

    // Fallback: search mock data
    const mockArticles = loadMockData()
    const q = query.toLowerCase()
    return mockArticles.filter(
        a =>
            a.title.toLowerCase().includes(q) ||
            a.description.toLowerCase().includes(q)
    )
}
