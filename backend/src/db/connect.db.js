const mongoose = require('mongoose');


  const initializeDatabase = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGODB,{dbName:'Todo_backend'});
        if(connect){
            console.log(`📈 Successfully connected to database!`)
        }
    } catch (error) {
        console.error('🚨 Database connection failed: ',error)
        process.exit(1)
    }
}

module.exports = initializeDatabase