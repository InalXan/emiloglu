import mongoose from 'mongoose'

const URI =
  'mongodb+srv://admin:3y3vaye1@emiloglu.s8xyxux.mongodb.net/?retryWrites=true&w=majority&appName=emiloglu'

const connection = async () => {
  mongoose
    .connect(URI)
    .then(() => console.log(`Database Connection Succesfully`))
    .catch((err) => console.error(err))
}

export default connection
