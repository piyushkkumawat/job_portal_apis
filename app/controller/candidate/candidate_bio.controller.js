var db = require('../../../config/db.config');

const Candidatebio = db.candidate_bio;

let profile_pic_name;
let videopath;
let idcard;
let resume;
let otherimg1;
let otherimg2;
let fieldname;

exports.create = (req, res) => {
    if (!req.body.user_id) {
        res.json({
            success: false,
            message: "User id can not be null"
        })
    }
    // console.log(req.files[0].fieldname);
    if (req.files) {
       
        req.files.forEach(ele => {
            // fieldname = ele.fieldname
            if (ele.fieldname == "profile_pic") {
                profile_pic_name = ele.path;
            }
            if (ele.fieldname == "resumevideo") {
                videopath = ele.path;
            }
            if (ele.fieldname == "idcard") {
                idcard = ele.path;
            }
            if (ele.fieldname == "resume") {
                resume = ele.path;
            }
            if (ele.fieldname == "otherimg1") {
                otherimg1 = ele.path;
            }
            if (ele.fieldname == "otherimg2") {
                otherimg2 = ele.path;
            }
            // let obj = {filedname:req.files[key].path}
            // fileArray.push(obj);
        })
        console.log("profile",profile_pic_name);
        console.log("video",videopath);
        console.log("otherimg1",otherimg1);
        console.log("otherimg2",otherimg2);
        Candidatebio.findOne({ where: { user_id: req.body.user_id } }).then(user => {
            if(!user){
                const newCandidateBio = new Candidatebio({
                    user_id: req.body.user_id,
                    profile_pic: profile_pic_name,
                    other_img1: otherimg1,
                    other_img2: otherimg2,
                    candidate_idcard: idcard,
                    candidate_info: req.body.candidate_info,
                    special_telent: req.body.special_telent,
                    social_responsiblity: req.body.social_responsiblity,
                    sports: req.body.sports,
                    candidate_resume_video: videopath,
                    candidate_resume: resume
                });
                newCandidateBio.save().then(data => {
                    return res.json({
                        success: true,
                        message: "Update successfully",
                    })
                }).then(err => {
                   return res.json({
                        success: false,
                        message: "Something went to wrong " + err
                    })
                });
            }else{
                Candidatebio.update({
                    profile_pic: profile_pic_name,
                    other_img1: otherimg1,
                    other_img2: otherimg2,
                    candidate_idcard: idcard,
                    candidate_info: req.body.candidate_info,
                    special_telent: req.body.special_telent,
                    social_responsiblity: req.body.social_responsiblity,
                    sports: req.body.sports,
                    candidate_resume_video: videopath,
                    candidate_resume: resume
                },{
                    where:{user_id: req.body.user_id}
                }).then(data=>{
                    res.json({
                        message: "Update successfully",
                        success: true,
                    });
                }).catch(err=>{
                    return res.json({
                            success: false,
                            message: "Something went to wrong " + err
                        })
                })
            }

        })
        // console.log(profile_pic_name);

    }


}

exports.update = (req, res) => {
    let data = req.body;
    if (!req.body.user_id) {
        res.json({
            success: false,
            message: "User id can not be null"
        })
    }
    if (req.files) {
        Object.keys(req.files).forEach(function (key) {
            filedname = req.files[key].fieldname
            if (filedname == "profile_pic") {
                profile_pic_name = req.files[key].path;
            }
            if (filedname == "resumevideo") {
                videopath = req.files[key].path;
            }
            if (filedname == "idcard") {
                idcard = req.files[key].path;
            }
            if (filedname == "resume") {
                resume = req.files[key].path;
            }
            if (filedname == "otherimg1") {
                otherimg1 = req.files[key].path;
            }
            if (filedname == "otherimg2") {
                otherimg2 = req.files[key].path;
            }
            // let obj = {filedname:req.files[key].path}
            // fileArray.push(obj);
        })
        console.log("profile",profile_pic_name);
        console.log("video",videopath);
        console.log("otherimg1",otherimg1);
        console.log("otherimg2",otherimg2);
        Candidatebio.findOne({ where: { user_id: req.body.user_id } }).then(user => {
            if(!user){
                const newCandidateBio = new Candidatebio({
                    user_id: req.body.user_id,
                    profile_pic: profile_pic_name,
                    other_img1: otherimg1,
                    other_img2: otherimg2,
                    candidate_idcard: idcard,
                    candidate_info: req.body.candidate_info,
                    special_telent: req.body.special_telent,
                    social_responsiblity: req.body.social_responsiblity,
                    sports: req.body.sports,
                    candidate_resume_video: videopath,
                    candidate_resume: resume
                });
                newCandidateBio.save().then(data => {
                    return res.json({
                        success: true,
                        message: "Update successfully",
                    })
                }).then(err => {
                   return res.json({
                        success: false,
                        message: "Something went to wrong " + err
                    })
                });
            }else{
                Candidatebio.update({
                    profile_pic: profile_pic_name,
                    other_img1: otherimg1,
                    other_img2: otherimg2,
                    candidate_idcard: idcard,
                    candidate_info: req.body.candidate_info,
                    special_telent: req.body.special_telent,
                    social_responsiblity: req.body.social_responsiblity,
                    sports: req.body.sports,
                    candidate_resume_video: videopath,
                    candidate_resume: resume
                },{
                    where:{user_id: req.body.user_id}
                }).then(data=>{
                    res.json({
                        message: "Update successfully",
                        success: true,
                    });
                }).catch(err=>{
                    return res.json({
                            success: false,
                            message: "Something went to wrong " + err
                        })
                })
            }

        })
        
    }
}

/*=============
 Candidate Bio Get By Id
  =============*/

  exports.findOne = (req, res) =>{
    if (!req.body.user_id) {
        res.json({
            success: false,
            message: "User id can not be null"
        })
    }
    Candidatebio.findByPk(req.body.user_id)
        .then(data => {
            if(!data){
                return res.json({
                    success: false,
                    message: "User not found with id " + req.body.user_id
                });
            }
            res.json({
                message: "Data found",
                success: true,
                data: data
            });
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.json({
                    success: false,
                    message: "User not found with id " + req.body.user_idd
                });
            }
            return res.json({
                success: false,
                message: "Error retrieving user with id " + req.body.user_id
            });
        })
};
