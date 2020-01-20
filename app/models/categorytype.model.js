module.exports = (sequelize, Sequelize) => {
    const Category = sequelize.define('categorytype', {
      name: {
        type: Sequelize.STRING
      },
      categoryimg: {
        type: Sequelize.STRING
      }
    }, {
      freezeTableName: true,
      timestamps: false
    });
  
    return Category;
  }