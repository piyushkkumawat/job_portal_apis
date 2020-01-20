module.exports = (sequelize, Sequelize) => {
    const Languages = sequelize.define('languagesKnows', {
       languageName: {
         type: Sequelize.STRING,
       },
     }, {
       freezeTableName: true,
       timestamps: false,
     });
   
     return Languages;
   
     }