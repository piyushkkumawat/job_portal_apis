module.exports = (sequelize, Sequelize) => {
    const Shifts = sequelize.define('shifts', {
       shiftName: {
         type: Sequelize.STRING,
       },
     }, {
       freezeTableName: true,
       timestamps: false,
     });
   
     return Shifts;
   
     }