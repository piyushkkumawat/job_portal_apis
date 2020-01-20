module.exports = (sequelize, Sequelize) => {
 const FAQ = sequelize.define('faq', {
    title: {
      type: Sequelize.STRING,
    },
    category: {
      type: Sequelize.STRING,
    }, category: {
      type: Sequelize.STRING,
    },
     question: {
      type: Sequelize.STRING,
    },
     description: {
      type: Sequelize.INTEGER,
      defaultValue: 1
    },
  }, {
    freezeTableName: true
  });

  return FAQ;

  }