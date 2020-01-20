module.exports = (sequelize, Sequelize) => {
    const Companyinfo = sequelize.define('company_info', {
      user_id: {
        type: Sequelize.STRING,
      },
      designation:{
        type: Sequelize.STRING,
      },
      company_type: {
        type: Sequelize.STRING
      },
      company_formed_year: {
        type: Sequelize.STRING
      },
      company_website: {
        type: Sequelize.STRING
      },
      company_location: {
        type: Sequelize.STRING
      },
      company_lat: {
        type: Sequelize.STRING
      },
      company_lng: {
        type: Sequelize.STRING
      },
      company_branches: {
        type: Sequelize.STRING
      },
      company_description: {
        type: Sequelize.STRING
      },
      company_logo: {
        type: Sequelize.STRING
      },
    }, {
      freezeTableName: true
    });
  
    return Companyinfo;
  }