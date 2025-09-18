import jwt from 'jsonwebtoken';

const generateToken = (userId, res = null) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '30d' });

  // Optionally set cookie if res is provided
  if (res) {
    res.cookie('jwt', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });
  }

  return token; 
};

export default generateToken;
