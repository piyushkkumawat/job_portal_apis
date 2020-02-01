const env = require('./env');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(env.database, env.username, env.password, {
    host: env.host,
    dialect: env.dialect,
    operatorsAliases: false,
   
    pool: {
      max: env.max,
      min: env.min,
      acquire: env.acquire,
      idle: env.idle
    }
  });
 const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

/*========
 Common config model
=========*/ 
db.registration= require('../app/models/registration.model')(sequelize,Sequelize);
db.industrytype= require('../app/models/industrytype.model')(sequelize,Sequelize);
db.categorytype= require('../app/models/categorytype.model')(sequelize,Sequelize);
db.verifyemail = require('../app/models/emailmatchotp.model')(sequelize,Sequelize);
db.userquestionans= require('../app/models/user_question_ans.model')(sequelize,Sequelize);

db.jobalert = require('../app/models/jobalert.model')(sequelize,Sequelize);
db.questionary= require('../app/models/questionary.model')(sequelize,Sequelize);
db.feedlikes= require('../app/models/feed_likes.model')(sequelize,Sequelize);
db.bookmarks= require('../app/models/bookmark.model')(sequelize,Sequelize);

//Admin Routes
db.Admin= require('../app/models/admin/adminModel.model')(sequelize,Sequelize);
db.Languages= require('../app/models/admin/languagesModel.model')(sequelize,Sequelize);
db.Company = require('../app/models/admin/companyModel.model')(sequelize,Sequelize);
db.jobPost = require('../app/models/admin/jobpostModel.model')(sequelize,Sequelize);
db.Complaint = require('../app/models/admin/complaintModel.model')(sequelize,Sequelize);
db.FAQ = require('../app/models/admin/faqModel.model')(sequelize,Sequelize);
db.Shift = require('../app/models/admin/shiftModel.model')(sequelize,Sequelize);
db.Qualification = require('../app/models/admin/qualificationModel.model')(sequelize,Sequelize);
db.Institutions = require('../app/models/admin/institudeModel.model')(sequelize,Sequelize);
db.EmployementType = require('../app/models/admin/employementTypeModel.model')(sequelize,Sequelize);
db.Designation = require('../app/models/admin/designationModel.model')(sequelize,Sequelize);
/*========
 Employer config model
=========*/ 



db.interviewcollection= require('../app/models/employer/interviewcollection.model')(sequelize,Sequelize);
db.jobfeedcollection= require('../app/models/employer/feedcollection.model')(sequelize,Sequelize);
db.feedcomments= require('../app/models/employer/feed_comments.model')(sequelize,Sequelize);
db.jobpostcollection= require('../app/models/employer/jobpostcollection.model')(sequelize,Sequelize);
db.companyinfo = require('../app/models/employer/company_info.model')(sequelize,Sequelize);
db.memberinfo = require('../app/models/employer/company_members.model')(sequelize,Sequelize);
db.interviewpanel = require('../app/models/employer/interview_panel.model')(sequelize,Sequelize);
db.companytype = require('../app/models/employer/company_type.model')(sequelize,Sequelize);
db.companybio= require('../app/models/employer/company_bio.model')(sequelize,Sequelize);

/*======
 Candidate model config
==========*/
db.candidatemodel= require('../app/models/candidate/candidate_basic_info.model')(sequelize,Sequelize);
db.education= require('../app/models/candidate/education_details.model')(sequelize,Sequelize);
db.work= require('../app/models/candidate/work_details.model')(sequelize,Sequelize);
db.candidate_questions= require('../app/models/candidate/candidate_questions.model')(sequelize,Sequelize);
db.candidate_bio= require('../app/models/candidate/candidate_bio.model')(sequelize,Sequelize);
db.iq_questions= require('../app/models/candidate/iqQuestion.model')(sequelize,Sequelize);
db.iqtestsubmit= require('../app/models/candidate/candidateIqTestSubmit.model')(sequelize,Sequelize);
db.swip_match = require('../app/models/candidate/swip_match.model')(sequelize,Sequelize);


db.registration.hasOne(db.candidate_bio,{foreignKey: 'user_id'});
db.registration.hasOne(db.candidatemodel,{foreignKey: 'user_id'});
db.registration.hasOne(db.jobalert, {foreignKey: 'user_id'});

// company profile join

db.registration.hasOne(db.companyinfo, {foreignKey: 'user_id'});
db.registration.hasOne(db.companybio, {foreignKey: 'user_id'});
db.companyinfo.hasMany(db.memberinfo, {foreignKey: 'company_id'});


// candidate profile join

// db.registration.hasOne(db.candidatemodel,{foreignKey: 'user_id'});
// db.candidatemodel.belongsTo(db.work, {foreignKey: 'user_id'});
// db.registration.hasMany(db.education, {foreignKey: 'user_id'});
// db.registration.hasOne(db.iqtestsubmit,  {foreignKey: 'user_id'});


// db.candidatemodel.belongsTo(db.iqtestsubmit,  {foreignKey: 'user_id'});


module.exports = db;