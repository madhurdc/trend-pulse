import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import newsRoutes from './routes/news.js'

dotenv.config()

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

app.listen(PORT, () => {
    console.log(`🚀 TrendPulse server running on http://localhost:${PORT}`)
})
