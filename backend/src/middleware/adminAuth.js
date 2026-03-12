const adminAuth = (req, res, next) => {
  const adminKey = process.env.ADMIN_API_KEY;

  if (!adminKey) {
    return res.status(500).json({
      success: false,
      message: 'Server misconfiguration: admin key not set'
    });
  }

  const provided = req.headers['x-admin-key'];

  if (!provided || provided !== adminKey) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized'
    });
  }

  next();
};

export default adminAuth;
