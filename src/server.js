import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js'


dotenv.config();
const PORT = process.env.PORT || 8080;

connectDB();

const app = express();
app.use(express.json());

app.use('/api/users', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/notifications',notificationRoutes)


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
