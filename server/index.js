import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import newsRoutes from './routes/news.js'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

// API routes
app.use('/api', newsRoutes)

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// Serve frontend in production
const distPath = join(__dirname, '..', 'dist')
app.use(express.static(distPath))
app.get('*', (req, res) => {
    res.sendFile(join(distPath, 'index.html'))
})

app.listen(PORT, () => {
    console.log(`🚀 TrendPulse server running on http://localhost:${PORT}`)
})
