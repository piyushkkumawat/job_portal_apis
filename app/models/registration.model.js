module.exports = (sequelize, Sequelize) => {
  const Registration = sequelize.define('user', {
     email: {
      type: Sequelize.STRING,
      unique: true
    },
    fullName: {
      type: Sequelize.STRING
    },
    company_name: {
      type: Sequelize.STRING
    },
    isSocialLogin: {
      type: Sequelize.INTEGER
    },
    authKey: {
      type: Sequelize.STRING,
    },
     fname: {
      type: Sequelize.STRING
    },
    lname: {
      type: Sequelize.STRING,
    },
    phoneno: {
      type:Sequelize.STRING,
    },
    password :{
      type:Sequelize.STRING,
    },
    role_type: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
    enable_location: {
      type: Sequelize.BOOLEAN,
      defaultValue: true
    },
    location: {
      type: Sequelize.STRING
    },
    lat: {
      type: Sequelize.STRING
    },
    lng: {
      type: Sequelize.STRING
    },
    city: {
      type: Sequelize.STRING
    },
    area: {
      type: Sequelize.STRING
    },
    profile_visibility: {
      type: Sequelize.STRING,
    },
    industry: {
      type: Sequelize.STRING
    },
    category: {
      type: Sequelize.STRING
    },
    recovery_email: {
      type: Sequelize.STRING
    },
    otp: {
      type: Sequelize.INTEGER
    },
    profile_pic: {
      type: Sequelize.STRING
    },
    status : {
      type: Sequelize.INTEGER,
      defaultValue: 0
    }
  }, {
    freezeTableName: true
  });
  
  return Registration;
}