module.exports = (sequelize, Sequelize) => {
    const feedlikes = sequelize.define('feedlikes', {
      user_id: {
        type: Sequelize.STRING
      },
      feed_id: {
        type: Sequelize.STRING
      },
      feed_likes: {
        type: Sequelize.STRING
      },
    }, {
      freezeTableName: true
    });
  
    return feedlikes;
  }