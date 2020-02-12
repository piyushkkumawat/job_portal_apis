module.exports = (sequelize, Sequelize) => {
    const Branches = sequelize.define('branches', {
      name: {
        type: Sequelize.STRING
      },
    }, {
      freezeTableName: true,
      timestamps: false
    });
  
    return Branches;
  }