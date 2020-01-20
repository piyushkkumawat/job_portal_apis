module.exports = (sequelize, Sequelize) => {
    const feedcollection = sequelize.define('feedcollection', {
      user_id: {
        type: Sequelize.STRING
      },
      feed_desc: {
        type: Sequelize.STRING
      },
      feed_image: {
        type: Sequelize.STRING
      },
      feed_video: {
        type: Sequelize.STRING
      },
    }, {
      freezeTableName: true
    });
  
    return feedcollection;
  }