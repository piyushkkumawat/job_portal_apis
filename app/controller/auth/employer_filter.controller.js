var db = require('../../../config/db.config');
var JobAlert = db.jobalert;
const sequelize = db.sequelize;
var async = require("async");

exports.filter =async (req, res) => {
    if (!req.body.user_id) {
        return res.json({
            success: false,
            message: "User Id can not be empty"
        })
    }
    
    JobAlert.findOne({ where: { user_id: req.body.user_id } }).then(data => {
        
        if(!data){
            const sql = `select 
            user.id,
            user.email,
            user.fullName,
            user.phoneno,
            user.role_type,
            user.enable_location,
            user.profile_visibility,
            user.industry,
            user.category,
            user.profile_pic,

            candidate_basic_info.date_of_birth,
            candidate_basic_info.gender,
            candidate_basic_info.language_knows,
            candidate_basic_info.marital_status,
            candidate_basic_info.height,
            candidate_basic_info.weight,
            candidate_basic_info.differently_abled,
            candidate_basic_info.differently_abled_details,
            candidate_basic_info.age,

            candidate_bio.profile_pic,
            candidate_bio.other_img1,
            candidate_bio.other_img2,
            candidate_bio.candidate_idcard,
            candidate_bio.candidate_info,
            candidate_bio.special_telent,
            candidate_bio.social_responsiblity,
            candidate_bio.sports,
            candidate_bio.candidate_resume_video,
            candidate_bio.candidate_resume
           
            
            from job_alert
            inner join user ON (user.id = job_alert.user_id)
            left join candidate_basic_info ON (candidate_basic_info.user_id = job_alert.user_id)
            left join candidate_bio ON (candidate_bio.user_id = job_alert.user_id)
            where 
            user.role_type=2 
            `;
            let dataArray = [];
            let educationArray = [];

            sequelize.query(sql, { type: sequelize.QueryTypes.SELECT })
                .then(function (users) {
                    async function fun1() {
                        return  Object.keys(users).forEach(function (key) {
                                const userId = users[key].id;
                                //console.log(userId);
                                db.education.findAll({ where: { user_id: userId} }).then(data => {
                                    dataArray.push(data); 
                                    //console.log(key);
                                    
                                })
                            });
                      }

                      fun1().then(()=>{
                          console.log("Asdasdasd");
                      });
                    
                    // Object.keys(users).forEach(function (key) {
                    //     const userId = users[key].id;
                    //     //console.log(userId);
                    //     db.education.findAll({ where: { user_id: userId} }).then(data => {
                    //         dataArray.push(data); 
                    //         //console.log(key);
                            
                    //     })
                    // });
                    //sleep(60);

                    // res.json({
                    //     success: true,
                    //     data: dataArray
                    // });
                    
                    
            }).catch(err=>{
                res.json({
                    success: false,
                    message: "Something went to wrong! "+err 
                })
            })
            
        }
           

    })
}
