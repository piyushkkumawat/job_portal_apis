module.exports = (sequelize, Sequelize) => {
  const adminRegistration = sequelize.define('admin', {
    name: {
      type: Sequelize.STRING
    },
    
    phoneno: {
      type: Sequelize.INTEGER,
    },
    email: {
      type: Sequelize.STRING,
      unique: true
    },
    password: {
      type: Sequelize.STRING
    },
     remberme: {
      type: Sequelize.INTEGER
    },
    status: {
      type: Sequelize.INTEGER
    },
    
    
  }, {
    freezeTableName: true
  });

  return adminRegistration;


}

// module.exports = (sequelize, Sequelize) => {
//  const Company = sequelize.define('company', {
//     compayName: {
//       type: Sequelize.STRING,
//        // unique: true
//     },
    
//     email: {
//       type: Sequelize.STRING,
     
//     },
//     phoneNo: {
//       type: Sequelize.INTEGER,
//     },
//     landLineNo: {
//       type: Sequelize.INTEGER,
//     },
//     aadharNoPanNo: {
//       type: Sequelize.STRING
//     },
//      industryType: {
//       type: Sequelize.INTEGER
//     },
//     subIndustryType: {
//       type: Sequelize.INTEGER
//     },
//      contactPersonName: {
//       type: Sequelize.STRING
//     },
//      contactPersonDesigination: {
//       type: Sequelize.STRING,
//       comment: "Candidate, Technical head etc."
//     },
//      officeAddress: {
//       type: Sequelize.STRING
//     },
//      location: {
//       type: Sequelize.STRING
//     },
//      passsword: {
//       type: Sequelize.STRING
//     },
//      confirmPassword: {
//       type: Sequelize.STRING
//     },
//      status: {
//       type: Sequelize.INTEGER
//     },
    
    
//   }, {
//     freezeTableName: true
//   });

//   return Company;

//   }

//   module.exports = (sequelize, Sequelize) => {
//  const Candidate = sequelize.define('candidate', {
//     candidateName: {
//       type: Sequelize.STRING,
       
//     },
    
//     email: {
//       type: Sequelize.STRING,
    
//     },
//     phoneNo: {
//       type: Sequelize.INTEGER,
//     },
//     address: {
//       type: Sequelize.STRING,
//     },
//     aadharNoPanNo: {
//       type: Sequelize.STRING
//     },
     
//      location: {
//       type: Sequelize.STRING
//     },
//      passsword: {
//       type: Sequelize.STRING
//     },
//      confirmPassword: {
//       type: Sequelize.STRING
//     },
//      status: {
//       type: Sequelize.INTEGER,
//       defaultValue: 1
//     },
    
    
//   }, {
//     freezeTableName: true
//   });

//   return Candidate;

//   }



  // module.exports = (sequelize, Sequelize) => {
  //   const jobPost = sequelize.define('jobpost', {

  //     companyName: {
  //       type: Sequelize.STRING
  //     },
  //     jobTitle: {
  //       type: Sequelize.STRING
  //     },
  //     jobDescription: {
  //       type: Sequelize.STRING,
  //     },
  //     keySkills: {
  //       type: Sequelize.STRING
  //     },
  //     fromAnnualCtc: {
  //       type: Sequelize.INTEGER
  //     },
  //     toAnnualCtc: {
  //       type: Sequelize.INTEGER
  //     },
  //     noOfVacancies: {
  //       type: Sequelize.INTEGER
  //     },
  //     typeOfEmployment: {
  //       type: Sequelize.STRING
  //     },
      
  //     candidateQualification: {
  //       type: Sequelize.STRING
  //     },
  //     stream: {
  //       type: Sequelize.STRING
  //     },
  //     passedOutYear: {
  //       type: Sequelize.INTEGER
  //     },
  //     enterQuestions: {
  //       type: Sequelize.STRING
  //     },
  //     noticePeriod: {
  //       type: Sequelize.STRING
  //     },
  //      jobLocation: {
  //       type: Sequelize.STRING
  //     },
  //     interviewType: {
  //       type: Sequelize.STRING
  //     },
  //     interviewLocation: {
  //       type: Sequelize.STRING
  //     },
  //     lastDateToApply: {
  //       type: Sequelize.STRING
  //     },
  //     fromInterviewDate: {
  //       type: Sequelize.STRING
  //     },
  //     toInterviewDate: {
  //       type: Sequelize.STRING
  //     },
  //     interViewerName: {
  //       type: Sequelize.STRING
  //     },
  //     memberLevel: {
  //       type: Sequelize.STRING
  //     },
  //     industry: {
  //       type: Sequelize.STRING
  //     },
  //     subIndustry: {
  //       type: Sequelize.STRING
  //     },
  //     category: {
  //       type: Sequelize.STRING
  //     },
  //     physicallyHealth: {
  //       type: Sequelize.STRING
  //     },
  //      medication: {
  //       type: Sequelize.STRING
  //     },
  //     gender: {
  //       type: Sequelize.ENUM('male', 'female'),
  //       defaultValue: 'male'
  //     },
  //     status: {
  //         type: Sequelize.INTEGER,
  //         defaultValue: 1
  //     },
      
  //   }, {
  //     freezeTableName: true
  //   });
  
  //   return jobPost;
  // }