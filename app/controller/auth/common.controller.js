var db = require('../../../config/db.config');
const Branches = db.branches; 
const CompanyName = db.companyname;



exports.getbranches = (req,res)=>{
    Branches.findAll().then(data=>{
        res.json({
            success: true,
            message:"data found",
            data:data
        });
    }).catch(err=>{
        res.json({
            success: false,
            message: "Something went to wrong! "+err
        });
    })
}

exports.getcompanyname = (req,res)=>{
    CompanyName.findAll().then(data=>{
        res.json({
            success: true,
            message:"data found",
            data:data
        });
    }).catch(err=>{
        res.json({
            success: false,
            message: "Something went to wrong! "+err
        });
    })
}