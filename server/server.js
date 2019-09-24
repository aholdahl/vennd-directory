
const express = require('express');
require('dotenv').config();

const app = express();
const bodyParser = require('body-parser');
const sessionMiddleware = require('./modules/session-middleware');

const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const adminRouter = require('./routes/admin.router');
const businessRouter = require('./routes/business.router');
const categoryRouter = require('./routes/category.router');
const demographicRouter = require('./routes/demographic.router');
const detailRouter = require('./routes/detail.router');
const favoriteRouter = require('./routes/favorite.router');
const ratingRouter = require('./routes/rating.router');
const searchRouter = require('./routes/search.router');
const statRouter = require('./routes/stat.router');
const voteRouter = require('./routes/vote.router');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/admin', adminRouter);
app.use('/api/businesses', businessRouter);
app.use('/api/categories', categoryRouter);
app.use('/api/demographics', demographicRouter);
app.use('/api/details', detailRouter);
app.use('/api/favorites', favoriteRouter);
app.use('/api/ratings', ratingRouter);
app.use('/api/search', searchRouter);
app.use('/api/stats', statRouter);
app.use('/api/votes', voteRouter);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});

module.exports = app;