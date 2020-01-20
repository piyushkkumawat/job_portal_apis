module.exports = (sequelize, Sequelize) => {
    const Jobalert = sequelize.define('job_alert', {
      user_id: {
        type: Sequelize.STRING,
      },
      role_type: {
        type: Sequelize.STRING,
      },
      designation:{
        type: Sequelize.STRING,
      },
      qualification: {
        type: Sequelize.STRING
      },
      shift: {
        type: Sequelize.STRING
      },
      candidate_location: {
        type: Sequelize.STRING
      },
      candidate_lat: {
        type: Sequelize.STRING
      },
      candidate_lng: {
        type: Sequelize.STRING
      },
      typeof_employement: {
        type: Sequelize.STRING
      },
      employement_category: {
        type: Sequelize.STRING
      },
      industry_category: {
        type: Sequelize.STRING
      },
      from_salary_range: {
        type: Sequelize.STRING
      },
      to_salary_range: {
        type: Sequelize.STRING
      },
      // salary_range: {
      //   type: Sequelize.STRING
      // },
    }, {
      freezeTableName: true
    });
  
    return Jobalert;
  }