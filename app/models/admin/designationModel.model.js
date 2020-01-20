module.exports = (sequelize, Sequelize) => {
    const Designation = sequelize.define('designation', {
       designationType: {
         type: Sequelize.STRING,
       },
     }, {
       freezeTableName: true,
       timestamps: false,
     });
   
     return Designation;
   
     }