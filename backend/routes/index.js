const userRouter = require('./userRoutes');
const roomRouter = require('./roomRoutes');
const deviceRouter = require('./deviceRoutes');
const sensorRouter = require('./sensorRoutes');
const statisticRouter = require('./statisticRoutes');


function routes(app){
    app.use('/api/user', userRouter);
    app.use('/api/room', roomRouter);
    app.use('/api/device', deviceRouter);
    app.use('/api/sensor', sensorRouter);
    app.use('/api/statistic', statisticRouter);


}

module.exports = routes;
