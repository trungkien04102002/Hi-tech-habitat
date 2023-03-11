const userRouter = require('./userRoutes');


function routes(app){
    app.use('/api/user', userRouter);


}

module.exports = routes;
