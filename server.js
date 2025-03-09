import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import connectDB from './src/config/db.js';
import authRoutes from './src/routes/authRoutes.js';
import taskRoutes from './src/routes/taskRoutes.js';
import notificationRoutes from './src/routes/notificationRoutes.js'


dotenv.config();
const PORT = process.env.PORT || 8080;
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per window
    message: "Too many requests from this IP, please try again later."
  });

connectDB();

const app = express();
app.use(express.json());
app.use(helmet());
app.use(limiter);


app.use('/api/users', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/notifications',notificationRoutes)

app.get("/", (req, res) => {
  res.send("Welcome to E-Commerce API");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
