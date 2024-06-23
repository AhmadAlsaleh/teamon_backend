require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const workSessionsRouter = require('./routes/workSessionRoutes');
const workStepRouter = require('./routes/workStepRoutes');

const sequelize = require('./database/connection');
const fcmTokenRoutes = require('./routes/fcmToken');
const notificationsRoutes = require('./routes/notifications');

const { authenticateToken } = require('./middlewares/authMiddleware');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Routes
app.get('/', (req, res) => {
    res.send("HELLO");
});
app.use('/api/auth', authRouter);
app.use('/api/users', authenticateToken, usersRouter);
app.use('/api/fcm', fcmTokenRoutes);
app.use('/api/workSessions', authenticateToken, workSessionsRouter);
app.use('/api/workSteps', authenticateToken, workStepRouter);
app.use('/api/notifications', authenticateToken, notificationsRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});

sequelize.sync() // Sync models with database
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(err => console.error('Database sync error:', err));


