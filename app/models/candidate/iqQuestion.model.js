module.exports = (sequelize, Sequelize) => {
    const Iq_questions = sequelize.define('iq_questions', {
      question: {
        type: Sequelize.TEXT
      },
      questionImage: {
        type: Sequelize.STRING
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
      option_E: {
        type: Sequelize.STRING
      },
      answer: {
          type: Sequelize.STRING
      }
    }, {
        freezeTableName: true,
      });
    
      return Iq_questions;
    }