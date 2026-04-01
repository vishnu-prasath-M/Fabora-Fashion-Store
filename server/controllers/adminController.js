const jwt = require('jsonwebtoken');

// Hardcoded admin credentials
const ADMIN_EMAIL = 'Admin@gmail.com';
const ADMIN_PASSWORD = 'Admin1234';

// Admin login
const adminLogin = async (req, res) => {
    const { email, password } = req.body;

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        const token = jwt.sign(
            { id: 'admin', email: ADMIN_EMAIL, isAdmin: true },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.json({
            _id: 'admin',
            name: 'Administrator',
            email: ADMIN_EMAIL,
            isAdmin: true,
            token: token,
        });
    } else {
        res.status(401).json({ message: 'Invalid admin credentials' });
    }
};

// Protect admin routes
const protectAdmin = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            token = req.headers.authorization.split(' ')[1];

            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            if (!decoded.isAdmin) {
                return res.status(403).json({ message: 'Not authorized as admin' });
            }

            req.user = decoded;
            next();
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

module.exports = { adminLogin, protectAdmin };
