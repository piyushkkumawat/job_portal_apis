var db = require('../../../config/db.config');
const CompanyBio = db.companybio;
let profile_pic_name;
let videopath;

exports.create = (req, res) => {
    if(!req.body.user_id){
        return res.json({
            success: false,
            message: "User Id can not be empty"
        })
    }
    if (req.files) {
        Object.keys(req.files).forEach(function (key) {
            filedname = req.files[key].fieldname
            if (filedname == "profile_pic") {
                profile_pic_name = req.files[key].path;
            }
            if (filedname == "requirement_video") {
                videopath = req.files[key].path;
            }
        })
    }
    CompanyBio.findOne({ where: { user_id: req.body.user_id } }).then(user => {
        if(user){
            CompanyBio.update({
                profile_pic: profile_pic_name,
                bio_info: req.body.bio_info,
                requirement_video: videopath
            },{
                where: { user_id: req.body.user_id }
            }).then(data=>{
                res.json({
                    status: 200,
                    success: true,
                    message:"update successfully",
                })
            }).catch(err=>{
                res.json({
                    success: false,
                    message:"Something went to wrong! "+err,
                })
            })
        }
        if(!user){
            const newCompanyBio = new CompanyBio({
                user_id: req.body.user_id,
                profile_pic: profile_pic_name,
                bio_info: req.body.bio_info,
                requirement_video: videopath
            });
            newCompanyBio.save().then(data =>{
                return res.json({
                    success:true,
                    data: data,
                    message: "Data insert Successfully"
                })
            }).catch(err =>{
                return res.json({
                    success: false,
                    message: "Something went to wrong "+err
                })
            })
        }
    })
 };


 exports.updatecompanybio =(req,res)=>{
            if(!req.body.user_id){
                res.json({
                    success: false,
                    message:"User Id can not be empty",
                })
            }
            if (req.files) {
                Object.keys(req.files).forEach(function (key) {
                    filedname = req.files[key].fieldname
                    if (filedname == "profile_pic") {
                        profile_pic_name = req.files[key].path;
                    }
                    if (filedname == "requirement_video") {
                        videopath = req.files[key].path;
                    }
                })
            }
            CompanyBio.findOne({ where: { user_id: req.body.user_id } }).then(user => {
                if(!user){
                    
                    const newCompanyBio = new CompanyBio({
                        user_id: req.body.user_id,
                        profile_pic: profile_pic_name,
                        bio_info: req.body.bio_info,
                        requirement_video: videopath
                    });
                    newCompanyBio.save().then(data =>{
                        return res.json({
                            status: 200,
                            success: true,
                            message: "update successfully"
                        })
                    }).catch(err =>{
                        return res.json({
                            success: false,
                            message: "Something went to wrong "+err
                        })
                    })
                }
                if(user){
                    CompanyBio.update({
                        profile_pic: profile_pic_name,
                        bio_info: req.body.bio_info,
                        requirement_video: videopath
                    },{
                        where: { user_id: req.body.user_id }
                    }).then(data=>{
                        res.json({
                            status: 200,
                            success: true,
                            message:"update successfully",
                        })
                    }).catch(err=>{
                        res.json({
                            success: false,
                            message:"Something went to wrong! "+err,
                        })
                    })
                }
            })
         }