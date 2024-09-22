const app = require('./app')
const {config} = require('dotenv')
const initializeDatabase = require('./db/connect.db');

config({
    path:'./config.env'
})

const PORT = process.env.PORT || 8000;





const startServer = async () => {
    try {
        await initializeDatabase();
        app.listen(PORT, ()=>{
            console.log(`⚙️ Server is running on port ${PORT}!`)
        })
    } catch (error) {
        console.error('🚨 Server crash:', error)
        process.exit(1)
    }
}

startServer();