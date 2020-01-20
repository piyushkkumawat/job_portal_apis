module.exports = (sequelize, Sequelize) => {
    const Industry = sequelize.define('industrytype', {
      name: {
        type: Sequelize.STRING
      },
      industryimg: {
        type: Sequelize.STRING
      }
    }, {
      freezeTableName: true,
      timestamps: false
    });
  
    return Industry;
  }