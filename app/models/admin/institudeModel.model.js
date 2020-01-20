module.exports = (sequelize, Sequelize) => {
    const Institution = sequelize.define('institutions', {
       institutionName: {
         type: Sequelize.STRING,
       },
     }, {
       freezeTableName: true,
       timestamps: false,
     });
   
     return Institution;
   
     }