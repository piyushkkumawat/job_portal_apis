module.exports = (sequelize, Sequelize) => {
    const work = sequelize.define('work_details', {
      user_id: {
        type: Sequelize.STRING
      },
      fresher: {
        type: Sequelize.STRING,
      },
      name_of_company: {
        type: Sequelize.STRING
      },
      designation: {
        type: Sequelize.STRING
      },
      total_years_of_experience: {
        type: Sequelize.STRING
      },
      from_date: {
        type: Sequelize.STRING
      },
      to_date: {
        type: Sequelize.STRING
      },
    }, {
      freezeTableName: true
    });
  
    return work;
  }