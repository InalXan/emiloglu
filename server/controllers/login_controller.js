import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import User from '../db/models/user_model.js'

const SECRET =
  'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTczMjAxMzI2MCwiaWF0IjoxNzMyMDEzMjYwfQ.bCCEKeBb5Qo5kLUTQaPfioLsZHdTZkk-OWBpxzOOx04'

const login = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username })
    if (!user) {
      return res.status(404).json({ error: "User doesn't exist" })
    }

    const result = await bcrypt.compare(req.body.password, user.password)
    if (!result) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    const token = jwt.sign({ username: user.username }, SECRET, { expiresIn: '1h' })
    res.json({ token })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'An unexpected error occurred.' })
  }
}

export default login
