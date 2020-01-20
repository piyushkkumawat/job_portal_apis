module.exports = (sequelize, Sequelize) => {
    const Questions = sequelize.define('candidate_questions', {
      question: {
        type: Sequelize.TEXT
      },
      option_A: {
        type: Sequelize.STRING
      },
      option_B: {
        type: Sequelize.STRING
      },
      option_C: {
        type: Sequelize.STRING
      },
      option_D: {
        type: Sequelize.STRING
      },
      answer: {
          type: Sequelize.STRING
      }
    }, {
      freezeTableName: true,
    });
  
    return Questions;
  }