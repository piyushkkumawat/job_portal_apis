module.exports = (sequelize, Sequelize) => {
    const Verifyemail = sequelize.define('verifyemail', {
      email: {
        type: Sequelize.STRING
      },
      otp: {
        type: Sequelize.STRING
      }
    }, {
      freezeTableName: true,
    });
  
    return Verifyemail;
  }