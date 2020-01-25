var db = require('../../../config/db.config');
var fs = require('fs');

exports.create = (req, res) =>{
    if(!req.body.role_type){
       return res.json({
           success: false,
           message: "role type can not be empty"
       }) 
    }
    if(!req.body.user_id){
        return res.json({
            success: false,
            message: "user_id can not be empty"
        }) 
     }
     if(!req.body.save_id){
        return res.json({
            success: false,
            message: "save_id can not be empty"
        }) 
     }
    const newbookmark = new db.bookmarks({
        user_id: req.body.user_id,
        save_id: req.body.save_id,
        role_type: req.body.role_type,
    });
    newbookmark.save().then(data=>{
        return res.json({
            success: true,
            data: data
        })
    }).catch(err=>{
       return res.json({
            success:false,
            message: "somethinf went to wrong! "+err
        })
    })
}