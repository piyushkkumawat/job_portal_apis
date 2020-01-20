module.exports = (sequelize, Sequelize) => {
    const CandidateBio = sequelize.define('candidate_bio', {
      user_id: {
        type: Sequelize.STRING
      },
      profile_pic: {
        type: Sequelize.STRING
      },
      other_img1: {
        type: Sequelize.STRING
      },
      other_img2: {
        type: Sequelize.STRING
      },
      candidate_idcard:{
        type: Sequelize.STRING
      },
      candidate_info:{
        type: Sequelize.TEXT
      },
      special_telent:{
        type: Sequelize.STRING
      },
      social_responsiblity:{
        type: Sequelize.STRING
      },
      sports:{
        type: Sequelize.STRING
      },
      candidate_resume_video: {
          type: Sequelize.STRING
      },
      candidate_resume:{
        type: Sequelize.STRING
      }
    }, {
      freezeTableName: true,
    });
  
    return CandidateBio;
  }