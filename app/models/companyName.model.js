module.exports = (sequelize, Sequelize) => {
    const CompanyName = sequelize.define('companyName', {
      name: {
        type: Sequelize.STRING
      },
    }, {
      freezeTableName: true,
      timestamps: false
    });
  
    return CompanyName;
  }