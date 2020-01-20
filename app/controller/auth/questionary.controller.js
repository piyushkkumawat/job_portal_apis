var db = require('../../../config/db.config');
var fs = require('fs');
const Questions = db.questionary; 



exports.findAll = (req,res)=>{
    Questions.findAll().then(data=>{
        return res.json({
            success: true,
            message: "Data Found",
            data: {'request':data},
        })
    }).catch(err=>{
        return res.json({
            success: false,
            message: "failed"
        })
    })
}