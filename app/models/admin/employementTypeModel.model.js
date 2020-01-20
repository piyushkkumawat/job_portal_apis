module.exports = (sequelize, Sequelize) => {
    const EmployementType = sequelize.define('employement_type', {
       employementType: {
         type: Sequelize.STRING,
       },
     }, {
       freezeTableName: true,
       timestamps: false,
     });
   
     return EmployementType;
   
     }