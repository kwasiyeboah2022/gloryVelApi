// const mongoose = require('mongoose')

// main().catch((err) => console.log(err))
// async function main() {
//   const connectionOptions = {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   }

//   const connectDB = async () => {
//     try {
//       mongoose.set('strictQuery', false)
//       await mongoose.connect(
//         'mongodb+srv://admin-yeboah:Elohim1sgrt@cluster0.xfjyzqe.mongodb.net/gloryVel',
//         connectionOptions
//       )

//       console.log(`Connected to MongoDB`)
//     } catch (err) {
//       console.log(`Couldn't connect: ${err}`)
//     }
//   }
// }

// module.exports = connectDB()

const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    mongoose.set('strictQuery', false)
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log(`MongoDB connected`)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

module.exports = connectDB
