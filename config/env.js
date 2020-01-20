const env = {
    database: 'cambio_db',
    username: 'cambio',
    password: '8XFjfXDJjSpKTKnX',
    host: '142.93.220.160',
    //  database: 'cambio',
    // username: 'root',
    // password: '',
    // host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    EMAILFROM_NAME:'Dollop',
    EMAILFROM_EMAIL:'suraj.kharsodiya@gmail.com',
  };
   
  module.exports = env;