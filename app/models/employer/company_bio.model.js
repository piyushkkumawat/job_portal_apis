module.exports = (sequelize, Sequelize) => {
    const Companybio = sequelize.define('company_bio', {
      user_id: {
        type: Sequelize.STRING,
      },
      profile_pic: {
        type: Sequelize.STRING
      },
      bio_info: {
        type: Sequelize.STRING
      },
      requirement_video: {
        type: Sequelize.STRING
      },
    }, {
      freezeTableName: true
    });
  
    return Companybio;
  }