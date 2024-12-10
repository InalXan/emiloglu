import bcrypt from 'bcrypt'
import User from '../db/models/user_model.js'

const register = async (req, res) => {
  try {

    const { username, password } = req.body
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required.' })
    }

    const existingUser = await User.findOne({ username })
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists.' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await User.create({ ...req.body, password: hashedPassword })


    res.status(201).json({
      message: 'User created successfully.',
      user: { id: user._id, username: user.username },
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'An unexpected error occurred.' })
  }
}

export default register
