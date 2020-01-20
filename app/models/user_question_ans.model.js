module.exports = (sequelize, Sequelize) => {
    const UserQuestionAns = sequelize.define('user_question_ans', {
      user_id: {
        type: Sequelize.STRING,
      },
      question_id:{
        type: Sequelize.STRING,
      },
      answer: {
        type: Sequelize.STRING
      },
    }, {
      freezeTableName: true
    });
  
    return UserQuestionAns;
  }