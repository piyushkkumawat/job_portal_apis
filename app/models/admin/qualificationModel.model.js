module.exports = (sequelize, Sequelize) => {
    const Qualification = sequelize.define('qualification', {
       qualificationName: {
         type: Sequelize.STRING,
       },
     }, {
       freezeTableName: true,
       timestamps: false,
     });
   
     return Qualification;
   
     }