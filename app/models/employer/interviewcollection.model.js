module.exports = (sequelize, Sequelize) => {
    const InterviewCollection = sequelize.define('interviewcollection', {
      interviewer: {
        type: Sequelize.STRING
      },
      interviewee: {
        type: Sequelize.STRING,
        unique: true
      },
      date_and_time_of_interview: {
        type: Sequelize.DATE,
      },
      interview_round: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.ENUM('f2f', 'smart', 'both'),
      },
      jobid: {
        type: Sequelize.INTEGER,
      },
      recording: {
        type: Sequelize.STRING
      },
      post_interview_feedback: {
        type: Sequelize.TEXT
      },
      feedback_details: {
        type: Sequelize.TEXT
      },
      cancel_reason: {
        type: Sequelize.TEXT
      },
    }, {
      freezeTableName: true
    });
  
    return InterviewCollection;
  }