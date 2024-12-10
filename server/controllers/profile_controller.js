import User from '../db/models/user_model.js'

const profile = async (req, res) => {
  try {
    const { userId } = req.user
    if (!userId) {
      return res.status(400).json({
        message: 'Invalid request: User ID missing',
        success: false,
      })
    }

    const user = await User.findOne({ userId }).select('-password')
    if (!user) {
      return res.status(404).json({
        message: 'User not found',
        success: false,
      })
    }

    return res.status(200).json({
      message: `User profile retrieved successfully`,
      success: true,
      data: {
        id: user._id,
        email: user.email,
        username: user.username,
      },
    })
  } catch (error) {
    console.error('Error fetching profile:', error)
    return res.status(500).json({
      success: false,
      message: 'An unexpected error occurred. Please try again later.',
    })
  }
}

export default profile
