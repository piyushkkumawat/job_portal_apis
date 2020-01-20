module.exports = (sequelize, Sequelize) => {
    const IqTestSubmit = sequelize.define('iqtestsubmit', {
      user_id: {
        type: Sequelize.STRING
      },
      iqTest_email:{
        type: Sequelize.STRING
      },
      question_id: {
        type: Sequelize.STRING
      },
      answer: {
          type: Sequelize.STRING
      },
      resultIqTest:{
        type: Sequelize.STRING
      }
    }, {
      freezeTableName: true,
    });
  
    return IqTestSubmit;
  }