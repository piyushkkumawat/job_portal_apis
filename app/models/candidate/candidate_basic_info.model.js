module.exports = (sequelize, Sequelize) => {
  const Candidate = sequelize.define('candidate_basic_info', {
    user_id: {
      type: Sequelize.STRING
    },
    date_of_birth: {
      type: Sequelize.STRING,
    },
    gender: {
      type: Sequelize.STRING,
    },
    language_knows: {
      type: Sequelize.STRING
    },
    marital_status: {
      type: Sequelize.STRING
    },
    height: {
      type: Sequelize.STRING
    },
    weight: {
      type: Sequelize.STRING
    },
    differently_abled: {
      type: Sequelize.STRING,
    },
    differently_abled_details: {
      type: Sequelize.TEXT
    },
    age: {
      type: Sequelize.STRING
    },
  }, {
    freezeTableName: true
  });

  return Candidate;
}