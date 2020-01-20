module.exports = (sequelize, Sequelize) => {
 const Complaint = sequelize.define('complaint', {
    serviceCategory: {
      type: Sequelize.STRING,
    },
    complaintTitle: {
      type: Sequelize.STRING,
    },
     status: {
      type: Sequelize.INTEGER,
      defaultValue: 1
    },
  }, {
    freezeTableName: true
  });

  return Complaint;

  }