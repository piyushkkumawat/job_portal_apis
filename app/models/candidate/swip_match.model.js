module.exports = (sequelize, Sequelize) => {
    const Swip_match = sequelize.define('swip_match', {
      candidate_id: {
        type: Sequelize.STRING
      },
      employer_id:{
        type: Sequelize.STRING
      },
      job_id: {
        type: Sequelize.STRING
      },
      employer_swip: {
          type: Sequelize.STRING
      },
      candidate_swip: {
        type: Sequelize.STRING
      },
      question_ans_json: {
        type: Sequelize.TEXT
      }
    }, {
      freezeTableName: true,
    });
  
    return Swip_match;
  }