module.exports = (sequelize, Sequelize) => {
    const jobpostcollection = sequelize.define('jobpostcollection', {
      user_id: {
        type: Sequelize.STRING
      },
      company_id: {
        type: Sequelize.STRING
      },
      job_title: {
        type: Sequelize.STRING
      },
      job_description: {
        type: Sequelize.STRING
      },
      job_type: {
        type: Sequelize.STRING,
      },
      qualification: {
        type: Sequelize.STRING
      },
      shift: {
        type: Sequelize.STRING
      },
      cabs: {
        type: Sequelize.ENUM('yes', 'no'),
        defaultValue: 'yes'
      },
      from_annaul_ctc: {
        type: Sequelize.STRING
      },
      to_annual_ctc: {
        type: Sequelize.STRING
      },
      company_industry_location: {
        type: Sequelize.STRING
      },
      company_lat: {
        type: Sequelize.STRING
      },
      company_lng: {
        type: Sequelize.STRING
      },
      process: {
        type: Sequelize.STRING
      },
      job_role: {
        type: Sequelize.STRING
      },
      notice_period: {
        type: Sequelize.STRING
      },
      from_age: {
        type: Sequelize.INTEGER
      },
      to_age: {
        type: Sequelize.INTEGER
      },
      gender: {
        type: Sequelize.ENUM('male', 'female','other'),
        defaultValue: 'male'
      },
      no_of_positions: {
          type: Sequelize.STRING
      },
      allow_disabled: {
          type: Sequelize.BOOLEAN
      },
      interview_panel_ids: {
        type: Sequelize.STRING
      },
      last_date_to_apply: {
          type: Sequelize.DATE
      },
      last_date_of_post: {
          type: Sequelize.DATE
      },
      special_comments: {
          type: Sequelize.STRING
      },
      commitments: {
        type: Sequelize.TEXT
      },
      screening_questions: {
          type: Sequelize.TEXT
      },
      mode_of_interview: {
        type: Sequelize.STRING
     },
    }, {
      freezeTableName: true
    });
  
    return jobpostcollection;
  }