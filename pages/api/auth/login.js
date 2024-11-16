import jwt from 'jsonwebtoken';


const secretKey = '1234'|| 'your-secret-key'; 

// Dummy users for testing (use a database in a real application)
const users = [
    { email: 'user@example.com', password: 'password', name: 'John Doe' }
];

export default function handler(req, res) {
    if (req.method === 'POST') {
        const { email, password } = req?.body;

        // Find the user in the mock database
        const user = users.find((user) => user?.email === email && user?.password === password);

        console.log(user);
        

        if (user) {
            // Create JWT token
            const token = jwt.sign({ email: user?.email, name: user.name }, secretKey, { expiresIn: '1h' });

            // Respond with the token and user data
            res.status(200).json({ token, user: { email: user?.email, name: user?.name } });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
