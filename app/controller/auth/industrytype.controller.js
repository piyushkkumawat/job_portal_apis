var db = require('../../../config/db.config');
var fs = require('fs');
const Industry = db.industrytype; 



exports.findAll = (req,res)=>{
    Industry.findAll().then(data=>{
        res.json(data);
    }).catch(err=>{
        res.json("error"+err);
    })
}