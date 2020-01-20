module.exports = (sequelize, Sequelize) => {
    const InterviewPanel = sequelize.define('interview_panel', {
      jobpost_id: {
        type: Sequelize.STRING
      },
      member_id: {
        type: Sequelize.STRING
      },
      interviewer_name: {
        type: Sequelize.STRING
      },
      interview_round: {
        type: Sequelize.STRING
      },
    }, {
      freezeTableName: true
    });
  
    return InterviewPanel;
  }