module.exports = (sequelize, Sequelize) => {
    const education = sequelize.define('education_details', {
      user_id: {
        type: Sequelize.STRING
      },
      highest_qualification: {
        type: Sequelize.STRING
      },
      name_institution: {
        type: Sequelize.STRING
      },
      year_of_passing: {
        type: Sequelize.STRING
      },
    }, {
      freezeTableName: true
    });
  
    return education;
  }