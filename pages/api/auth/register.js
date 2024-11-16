import jwt from 'jsonwebtoken';

const secretKey = '1234'|| 'your-secret-key'; // Store this in an environment variable

// Dummy users for testing (use a database in a real application)
const users = [
    { email: 'user@example.com', password: 'password', name: 'John Doe' }
];

export default function handler(req, res) {
    if (req.method === 'POST') {
        const { email, password } = req.body;

        // Check if the user already exists
        const existingUser = users.find((user) => user.email === email);

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create new user (in a real application, save to a database)
        const newUser = { email, password, name: 'New User' };
        users.push(newUser);

        // Create JWT token for the new user
        const token = jwt.sign({ email: newUser.email, name: newUser.name }, secretKey, { expiresIn: '1h' });

        // Respond with the token and user data
        res.status(201).json({ token, user: { email: newUser.email, name: newUser.name } });
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
