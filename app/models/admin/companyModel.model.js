module.exports = (sequelize, Sequelize) => {
 const Company = sequelize.define('company', {
    compayName: {
      type: Sequelize.STRING,
       // unique: true
    },
    
    email: {
      type: Sequelize.STRING,
     
    },
    phoneNo: {
      type: Sequelize.INTEGER,
    },
    landLineNo: {
      type: Sequelize.INTEGER,
    },
    aadharNoPanNo: {
      type: Sequelize.STRING
    },
     industryType: {
      type: Sequelize.INTEGER
    },
    subIndustryType: {
      type: Sequelize.INTEGER
    },
     contactPersonName: {
      type: Sequelize.STRING
    },
     contactPersonDesigination: {
      type: Sequelize.STRING,
      comment: "Candidate, Technical head etc."
    },
     officeAddress: {
      type: Sequelize.STRING
    },
     location: {
      type: Sequelize.STRING
    },
     passsword: {
      type: Sequelize.STRING
    },
     confirmPassword: {
      type: Sequelize.STRING
    },
     status: {
      type: Sequelize.INTEGER
    },
    
    
  }, {
    freezeTableName: true
  });

  return Company;

  }

