const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const logger = require('morgan');
const cors = require('cors')
const PORT = process.env.PORT || 5000

const authRouter = require('./controllers/auth');
const playerRouter = require('./controllers/players');
const teamRouter = require('./controllers/teams');
const userRouter = require('./controllers/users');
const testJwtRouter = require('./controllers/test-jwt');

app.use(cors({origin:'http://localhost:5173'}));

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

app.use(express.json());
app.use(logger('dev'));

app.use('/auth', authRouter);
app.use('/players', playerRouter);
app.use('/teams', teamRouter);
app.use('/users', userRouter);
app.use('/auth-jwt', testJwtRouter);



app.listen(PORT, () => {
  console.log('The express app is ready!');
});