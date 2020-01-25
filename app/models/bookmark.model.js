module.exports = (sequelize, Sequelize) => {
    const Bookmarks = sequelize.define('bookmarks', {
      user_id: {
        type: Sequelize.STRING
      },
      save_id: {
        type: Sequelize.STRING
      },
      role_type: {
        type: Sequelize.STRING
      }
    }, {
      freezeTableName: true,
    });
  
    return Bookmarks;
  }