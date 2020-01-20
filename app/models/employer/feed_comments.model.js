module.exports = (sequelize, Sequelize) => {
    const feedcomments = sequelize.define('feedcomments', {
      user_id: {
        type: Sequelize.STRING
      },
      feed_id: {
        type: Sequelize.STRING
      },
      comments: {
        type: Sequelize.STRING
      },
      commentBy: {
        type: Sequelize.STRING
      }
    }, {
      freezeTableName: true
    });
  
    return feedcomments;
  }