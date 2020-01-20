module.exports = (sequelize, Sequelize) => {
    const CompanyType = sequelize.define('company_type', {
      companyType: {
        type: Sequelize.STRING
      },
    }, {
      freezeTableName: true,
      timestamps: false
    });
  
    return CompanyType;
  }