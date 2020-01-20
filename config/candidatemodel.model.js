module.exports = (sequelize, Sequelize) => {
  const Candidate = sequelize.define('candidate', {
    name: {
      type: Sequelize.STRING
    },
    fullName: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
      unique: true
    },
    password: {
      type: Sequelize.STRING
    },
    
    phoneno: {
      type: Sequelize.STRING
    },
    status: {
      type: Sequelize.BOOLEAN
    },
    
 
    freezeTableName: true
  });

  return Candidate;
}