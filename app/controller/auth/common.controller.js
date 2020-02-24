var db = require('../../../config/db.config');
const Branches = db.branches; 
const CompanyName = db.companyname;
const Sequelize = require('sequelize');
const sequelize = db.sequelize;
var JobAlert = db.jobalert;
const Op = Sequelize.Op;
const geolib = require('geolib');
const finalDataArray = [];
var kilometerRange;


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

exports.getdataByLocation = (req,res)=>{
    if (!req.body.user_id) {
        return res.json({
            success: false,
            message: "User Id can not be empty"
        })
    }
    if (!req.body.role_type) {
        return res.json({
            success: false,
            message: "Role type can not be empty"
        })
    }

    if (!req.body.latitude) {
        return res.json({
            success: false,
            message: "latitude can not be empty"
        })
    }

    if (!req.body.longitude) {
        return res.json({
            success: false,
            message: "longitude can not be empty"
        })
    }
   

    JobAlert.findOne({ where: { user_id: req.body.user_id } }).then(data => {

        let latitude = req.body.latitude;
        let longitude = req.body.longitude;
    
      
        let ts = Date.now();

        let date_ob = new Date(ts);
        let date = date_ob.getDate();
        let month = date_ob.getMonth() + 1;
        let year = date_ob.getFullYear();
        let dateString = year+'-'+month+'-'+date;

        // kilometerRange = req.body.kilometer;
        if(req.body.role_type == 1){
            if(data){
               
                db.registration.findAll({
                    where:{role_type: 2},
                    order:[
                        [db.work,'to_date','DESC'],
                    ],
                    attributes: [
                        ['id','user_id'],
                        'email','fullName','phoneno','role_type','enable_location','profile_visibility','industry','category','recovery_email','lat','lng'],
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
                        let candidate_lat = data[key].lat;
                        let candidate_lng = data[key].lng;
                        let meters = geolib.getDistance(
                            { latitude: latitude, longitude: longitude },
                            { latitude: candidate_lat, longitude: candidate_lng }
                        ) 
                        kilometers = meters * 0.001
                        if(kilometers <= 50){
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
                        'email','fullName','phoneno','role_type','enable_location','profile_visibility','industry','category','recovery_email','lat','lng','city','area'],
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
    
        }


        if(req.body.role_type == 2){

            if(data){
                
                
                    const query = `select
                    user.id,
                    user.email,
                    user.fullName,
                    user.company_name,
                    user.phoneno,
                    user.role_type,
                    user.enable_location,
                    user.profile_visibility,
                    user.industry,
                    user.category,
                    user.profile_pic,
    
                    company_bio.id as companyBioId,
                    company_bio.profile_pic,
                    company_bio.bio_info,
                    company_bio.requirement_video,
    
                    company_info.id as companyInfoId,
                    company_info.designation,
                    company_info.company_type as companyTypeId,
                    company_type.companyType,
                    company_info.company_formed_year,
                    company_info.company_website,
                    company_info.company_location,
                    company_info.company_lat,
                    company_info.company_lng,
                    company_info.company_branches,
                    company_info.company_logo,
                    company_info.company_description,
                    
                    jobpostcollection.id as jobpostId,
                    jobpostcollection.job_title,
                    jobpostcollection.job_description,
                    jobpostcollection.job_type,
                    jobpostcollection.qualification,
                    jobpostcollection.shift as shiftId,
                    shifts.shiftName,
                    jobpostcollection.cabs,
                    jobpostcollection.from_annaul_ctc,
                    jobpostcollection.to_annual_ctc,		  
                    jobpostcollection.company_industry_location,
                    jobpostcollection.company_lat,
                    jobpostcollection.company_lng,
                    jobpostcollection.company_city,
                    jobpostcollection.company_area,
                    jobpostcollection.process,
                    jobpostcollection.job_role,
                    jobpostcollection.notice_period,
                    jobpostcollection.from_age,
                    jobpostcollection.to_age,
                    jobpostcollection.gender,
                    jobpostcollection.no_of_positions,
                    jobpostcollection.allow_disabled,
                    jobpostcollection.interview_panel_ids,
                    jobpostcollection.last_date_to_apply,
                    jobpostcollection.date_of_post,
                    jobpostcollection.special_comments,
                    jobpostcollection.commitments,
                    jobpostcollection.screening_questions,
                    jobpostcollection.mode_of_interview,
    
                    job_alert.typeof_employement,
                    employement_type.employementType
                    
                    from jobpostcollection
                    inner join user ON (user.id = jobpostcollection.user_id)
                    left join company_bio ON (company_bio.user_id =  jobpostcollection.user_id)
                    left join company_info  ON (company_info.user_id =  jobpostcollection.user_id)
                    left join job_alert  ON (job_alert.user_id =  jobpostcollection.user_id)
                    left join company_type  ON (company_type.id =  company_info.company_type)
                    left join employement_type ON(employement_type.id=job_alert.typeof_employement)
                    left join shifts ON(shifts.id = jobpostcollection.shift)
                    where (jobpostcollection.last_date_to_apply >= '`+dateString+`')
                    and user.role_type = 1
                    and (jobpostcollection.company_lat != "0.0" and jobpostcollection.company_lng != "0.0")
                    and
                    (
                           jobpostcollection.job_title like '%`+data.designation + `%'
                        or jobpostcollection.qualification like '%`+data.qualification + `%'
                        or jobpostcollection.shift like '%`+data.shift + `%'
                        or jobpostcollection.to_annual_ctc like '%`+data.to_salary_range + `%'
                        or user.industry like '%`+data.industry_category + `%'
                        or user.category like '%`+data.category + `%'
                        or jobpostcollection.job_type like '%`+data.typeof_employement + `%'
                    )
                    
                    `;
                     sequelize.query(query, { type: sequelize.QueryTypes.SELECT })
                    .then(function (users) {
                        Object.keys(users).forEach(function (key) {
                            let company_lat = users[key].company_lat;
                            let company_lng = users[key].company_lng;
                            
                            let meters = geolib.getDistance(
                                { latitude: latitude, longitude: longitude },
                                { latitude: company_lat, longitude: company_lng }
                            ) 
                           
                            kilometers = meters * 0.001
                            if(kilometers <= 50){
                                finalDataArray.push(users[key]);
                            }
                            })
                        
                            res.json({
                                success: true,
                                data: finalDataArray
                            })
                    }).catch(err=>{
                        res.json({
                            success: false,
                            message: "Something went to wrong! "+err
                        })
                    })
              }
            
              if(!data){
                const query = `select
                    user.id,
                    user.email,
                    user.fullName,
                    user.company_name,
                    user.phoneno,
                    user.role_type,
                    user.enable_location,
                    user.profile_visibility,
                    user.industry,
                    user.category,
                    user.profile_pic,
    
                    company_bio.profile_pic,
                    company_bio.bio_info,
                    company_bio.requirement_video,
    
                    company_info.designation,
                    company_info.company_type as companyTypeId,
                    company_type.companyType,
                    company_info.company_formed_year,
                    company_info.company_website,
                    company_info.company_location,
                    company_info.company_lat,
                    company_info.company_lng,
                    company_info.company_branches,
                    company_info.company_logo,
                    company_info.company_description,
                    
                    jobpostcollection.job_title,
                    jobpostcollection.job_description,
                    jobpostcollection.job_type,
                    jobpostcollection.qualification,
                    jobpostcollection.shift as shiftId,
                    jobpostcollection.cabs,
                    jobpostcollection.from_annaul_ctc,
                    jobpostcollection.to_annual_ctc,		  
                    jobpostcollection.company_industry_location,
                    jobpostcollection.company_lat,
                    jobpostcollection.company_lng,
                    jobpostcollection.process,
                    jobpostcollection.job_role,
                    jobpostcollection.notice_period,
                    jobpostcollection.from_age,
                    jobpostcollection.to_age,
                    jobpostcollection.gender,
                    jobpostcollection.no_of_positions,
                    jobpostcollection.allow_disabled,
                    jobpostcollection.interview_panel_ids,
                    jobpostcollection.last_date_to_apply,
                    jobpostcollection.date_of_post,
                    jobpostcollection.special_comments,
                    jobpostcollection.commitments,
                    jobpostcollection.screening_questions,
                    jobpostcollection.mode_of_interview,
    
                    job_alert.typeof_employement,
                    employement_type.employementType
                    
                    from jobpostcollection
                    inner join user ON (user.id = jobpostcollection.user_id)
                    left join company_bio ON (company_bio.user_id =  jobpostcollection.user_id)
                    left join company_info  ON (company_info.user_id =  jobpostcollection.user_id)
                    left join job_alert  ON (job_alert.user_id =  jobpostcollection.user_id)
                    left join company_type  ON (company_type.id =  company_info.company_type)
                    left join employement_type ON(employement_type.id=job_alert.typeof_employement)
                    where (jobpostcollection.last_date_to_apply >= '`+dateString+`')
                    and (jobpostcollection.company_lat != "0.0" and jobpostcollection.company_lng != "0.0")
                    and user.role_type = 1
                    
                    `;
                     sequelize.query(query, { type: sequelize.QueryTypes.SELECT })
                    .then(function (users) {
                        res.json({
                            success: true,
                            data: users
                        })
                    }).catch(err=>{
                        res.json({
                            success: false,
                            message: "Something went to wrong! "+err
                        })
                    })
              }  
        }
     
    })
}