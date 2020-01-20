var db = require('../../../config/db.config');


exports.findAll = (req, res) => {
    console.log(req.body);
    db.registration.findOne({
       
        include: [
            {   
                where:{user_id: req.body.user_id},
                model: db.candidate_bio,
            },
            {
                model: db.candidatemodel
           },
           {
            model: db.jobalert
            }
         ],
         
       }).then(data =>{
        res.json({
            success:true,
            data:data
        })
    }).catch(err =>{
        res.json({
            message: "error " +err
        })
    })
  
};




exports.findProfileSetting = (req, res) => {
    console.log(req.body);
    if(!req.body.user_id){
        res.json({
            success:false,
            message:"User Id can not be empty"
        })
    }
    if(!req.body.role_type){
        res.json({
            success:false,
            message:"Role type can not be empty"
        })  
    }
    if(req.body.role_type == 1){
        db.registration.findOne({
            
            where:{id: req.body.user_id},
            attributes: [
                ['id','user_id'],
                ['profile_pic','company_idcard'],
                'email','fullName','company_name','phoneno','role_type','enable_location','profile_visibility','industry','category','recovery_email'],
            include: [
                {
                    model: db.companybio,
                    attributes: [['id','companyBioId'],'profile_pic','bio_info','requirement_video']
                },
                {
                    model: db.jobalert,
                    attributes: [['id','jobalertId'],['designation','jobalert_designation'],
                    'qualification','shift','candidate_location', 'candidate_lat', 'candidate_lng', 'typeof_employement','employement_category','industry_category','from_salary_range','to_salary_range']
                },
                {   
                    model: db.companyinfo,
                    attributes: [['id','companyId'],'designation','company_type','company_formed_year','company_website','company_location','company_lat','company_lng','company_branches','company_description','company_logo'],
                    include:[
                        {
                            model: db.memberinfo,
                            attributes: [['id','memberId'],
                            'member_email_id','member_phoneno','member_name','member_designation','member_specialization']
                        }
                    ]
                },
             ],
           }).then(data =>{
            res.json({
                success:true,
                data:data
            })
        }).catch(err =>{
            res.json({
                success: false,
                message: "error " +err
            })
        })
    }

    if(req.body.role_type == 2){
        db.registration.findOne({
            attributes: [
                ['id','user_id'],
                'email','fullName','phoneno','role_type','enable_location','profile_visibility','industry','category','recovery_email'],
            include: [
                {   
                    where:{user_id: req.body.user_id},
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
                model: db.jobalert,
                attributes: [['id','jobalertId'],['designation','jobalert_designation'],
                'qualification','shift','candidate_location', 'candidate_lat', 'candidate_lng', 'typeof_employement','employement_category','industry_category','from_salary_range','to_salary_range']
              },
              {
                model: db.iqtestsubmit,
                attributes: ['resultIqTest'],
               },
             ],
           }).then(data =>{
            res.json({
                success:true,
                data:data
            })
        }).catch(err =>{
            res.json({
                success: false,
                message: "error " +err
            })
        })
    }

  
};