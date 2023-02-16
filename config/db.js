const mongoose = require('mongoose')

module.exports = async () => {
  mongoose.set('strictQuery', false)
  return new Promise(async (resolve, reject) => {
    let url
    if (process.env.NODE_ENV === 'development') {
      url = process.env.MONGODB_DEV_URL
    } else {
      url = process.env.MONGODB_URL
    }

    try {
      const connectDB = mongoose.connect(url)

      if (!connectDB) {
        throw new Error('Not connected')
      } else {
        console.log('Connected to DB')
      }

      resolve(true)
    } catch (error) {
      reject(error)
    }
  })
}
