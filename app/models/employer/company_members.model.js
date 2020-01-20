module.exports = (sequelize, Sequelize) => {
    const Companyinfo = sequelize.define('company_member', {
      company_id: {
        type: Sequelize.STRING,
      },
      member_email_id:{
        type: Sequelize.STRING,
      },
      member_phoneno: {
        type: Sequelize.STRING
      },
      member_name: {
        type: Sequelize.STRING
      },
      member_designation: {
        type: Sequelize.STRING
      },
      member_specialization: {
        type: Sequelize.STRING
      },
    }, {
      freezeTableName: true
    });
  
    return Companyinfo;
  }