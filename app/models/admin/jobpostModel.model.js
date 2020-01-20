  module.exports = (sequelize, Sequelize) => {
    const jobPost = sequelize.define('jobpost', {

      companyName: {
        type: Sequelize.STRING
      },
      jobTitle: {
        type: Sequelize.STRING
      },
      jobDescription: {
        type: Sequelize.STRING,
      },
      keySkills: {
        type: Sequelize.STRING
      },
      fromAnnualCtc: {
        type: Sequelize.INTEGER
      },
      toAnnualCtc: {
        type: Sequelize.INTEGER
      },
      noOfVacancies: {
        type: Sequelize.INTEGER
      },
      typeOfEmployment: {
        type: Sequelize.STRING
      },
      
      candidateQualification: {
        type: Sequelize.STRING
      },
      stream: {
        type: Sequelize.STRING
      },
      passedOutYear: {
        type: Sequelize.INTEGER
      },
      enterQuestions: {
        type: Sequelize.STRING
      },
      noticePeriod: {
        type: Sequelize.STRING
      },
       jobLocation: {
        type: Sequelize.STRING
      },
      interviewType: {
        type: Sequelize.STRING
      },
      interviewLocation: {
        type: Sequelize.STRING
      },
      lastDateToApply: {
        type: Sequelize.STRING
      },
      fromInterviewDate: {
        type: Sequelize.STRING
      },
      toInterviewDate: {
        type: Sequelize.STRING
      },
      interViewerName: {
        type: Sequelize.STRING
      },
      memberLevel: {
        type: Sequelize.STRING
      },
      industry: {
        type: Sequelize.STRING
      },
      subIndustry: {
        type: Sequelize.STRING
      },
      category: {
        type: Sequelize.STRING
      },
      physicallyHealth: {
        type: Sequelize.STRING
      },
       medication: {
        type: Sequelize.STRING
      },
      gender: {
        type: Sequelize.ENUM('male', 'female'),
        defaultValue: 'male'
      },
      status: {
          type: Sequelize.INTEGER,
          defaultValue: 1
      },
      
    }, {
      freezeTableName: true
    });
  
    return jobPost;
  }