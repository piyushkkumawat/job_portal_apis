var db = require('../../../config/db.config');
const Sequelize = require('sequelize');
var JobAlert = db.jobalert;
const Op = Sequelize.Op;
const geolib = require('geolib');
const finalDataArray = [];


exports.filter =async (req, res) => {
    if (!req.body.user_id) {
        return res.json({
            success: false,
            message: "User Id can not be empty"
        })
    }
    
    JobAlert.findOne({ where: { user_id: req.body.user_id } }).then(data => {
      
        if(data){
            var emp_lat = data.candidate_lat;
            var emp_long = data.candidate_lng;
            db.registration.findAll({
                where:{role_type: 2},
                order:[
                    [db.work,'to_date','DESC'],
                ],
                attributes: [
                    ['id','user_id'],
                    'email','fullName','phoneno','role_type','enable_location','profile_visibility','industry','category','recovery_email'],
                include: [
                    {   
                        model: db.candidate_bio,
                        attributes: [['id','candidateBioId'],
                        'profile_pic', 'other_img1', 'other_img2', 'candidate_idcard', 'candidate_info', 'special_telent', 'social_responsiblity', 'sports', 'candidate_resume_video', 'candidate_resume']
                    },
                    {
                        attributes: [['id','workId'],
                        'fresher','name_of_company','designation','total_years_of_experience','from_date','to_date'],
                        model: db.work
                   },
                   {
                    model: db.education,
                    attributes: [['id','educationId'],
                    'highest_qualification','name_institution','year_of_passing',]
                   },
                   {
                    model: db.candidatemodel,
                    attributes: [['id','candidateBasicInfoId'],
                    'date_of_birth','gender','language_knows','marital_status','height','weight','differently_abled','differently_abled_details','age']
                   },
                  {
                    model: db.iqtestsubmit,
                    attributes: ['resultIqTest'],
                   },
                   {
                    model: db.jobalert,
                    attributes: [['id','jobalertId'],['designation','jobalert_designation'],
                    'qualification','shift','candidate_location', 'candidate_lat', 'candidate_lng', 'typeof_employement','employement_category','industry_category','from_salary_range','to_salary_range'],
                    where:
                      {
                        [Op.or]: [
                            {
                                qualification: 
                                {
                                    [Op.like]: ['%'+data.qualification+'%']
                                }
                            }, 
                            {
                                shift: 
                                {
                                    [Op.like]: ['%'+data.shift+'%']
                                }
                            }, 
                            {
                                typeof_employement: 
                                {
                                    [Op.like]: ['%'+data.typeof_employement+'%']
                                }
                            },
                            {
                                employement_category: 
                                {
                                    [Op.like]: ['%'+data.employement_category+'%']
                                }
                            },
                            {
                                industry_category: 
                                {
                                    [Op.like]: ['%'+data.industry_category+'%']
                                }
                            },
                            {
                                from_salary_range: 
                                {
                                    [Op.gte]: data.from_salary_range
                                },
                                to_salary_range: 
                                {
                                    [Op.lte]: data.to_salary_range
                                }
                            },
                        ]
                      }
                  },
                 ],
               }).then(data =>{
                   
                Object.keys(data).forEach(function (key) {
                    let candidate_lat = data[key]["job_alert"].candidate_lat;
                    let candidate_lng = data[key]["job_alert"].candidate_lng;
                    
                    let meters = geolib.getDistance(
                        { latitude: emp_lat, longitude: emp_long },
                        { latitude: candidate_lat, longitude: candidate_lng }
                    ) 
                    kilometers = meters * 0.001
                    if(kilometers <= 150){
                        finalDataArray.push(data[key]);
                    }
                    })
                    res.json({
                        success:true,
                        data:finalDataArray
                    })
            }).catch(err=>{
                res.json({
                    success:false,
                    message:"Something went to wrong! "+err
                })
            }) 
        }
        
        if(!data){
            db.registration.findAll({
                where:{role_type: 2},
                order:[
                    [db.work,'to_date','DESC']
                ],
                attributes: [
                    ['id','user_id'],
                    'email','fullName','phoneno','role_type','enable_location','profile_visibility','industry','category','recovery_email'],
                include: [
                    {   
                        model: db.candidate_bio,
                        attributes: [['id','candidateBioId'],
                        'profile_pic', 'other_img1', 'other_img2', 'candidate_idcard', 'candidate_info', 'special_telent', 'social_responsiblity', 'sports', 'candidate_resume_video', 'candidate_resume']
                    },
                    {
                        model: db.work,
                        attributes: [['id','workId'],
                        'fresher','name_of_company','designation','total_years_of_experience','from_date','to_date']
                   },
                   {
                    model: db.education,
                    attributes: [['id','educationId'],
                    'highest_qualification','name_institution','year_of_passing',]
                   },
                   {
                    model: db.candidatemodel,
                    attributes: [['id','candidateBasicInfoId'],
                    'date_of_birth','gender','language_knows','marital_status','height','weight','differently_abled','differently_abled_details','age']
                   },
                  {
                    model: db.iqtestsubmit,
                    attributes: ['resultIqTest'],
                   },
                   {
                    model: db.jobalert,
                    attributes: [['id','jobalertId'],['designation','jobalert_designation'],
                    'qualification','shift','candidate_location', 'candidate_lat', 'candidate_lng', 'typeof_employement','employement_category','industry_category','from_salary_range','to_salary_range']
                  },
                 ],
               }).then(data =>{
                    res.json({
                        success:true,
                        data:data
                    })
            }).catch(err=>{
                res.json({
                    success:false,
                    messsage:"something went to wrong! "+err
                })
            })   
        }
           

    })
}

