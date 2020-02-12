var db = require('../../../config/db.config');
const Jobpostcollection = db.jobpostcollection;
const InterviewPanel = db.interviewpanel;
const sequelize = db.sequelize;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

db.swip_match.belongsTo(db.work, {foreignKey: 'job_id'});

exports.create = (req, res) => {
    if(!req.body.user_id){
        return res.json({
            success: false,
            message: "User Id can not be empty",
        });
    }
    const newjobpost = new Jobpostcollection({
        user_id: req.body.user_id,
        company_id: req.body.company_id,
        job_title: req.body.job_title,
        job_description: req.body.job_description,
        job_type: req.body.job_type,
        qualification: req.body.qualification,
        shift: req.body.shift,
        cabs: req.body.cabs,
        from_annaul_ctc: req.body.from_annaul_ctc,
        to_annual_ctc: req.body.to_annual_ctc,
        company_industry_location: req.body.company_industry_location,
        company_lat: req.body.company_lat,
        company_lng: req.body.company_lng,
        process: req.body.process,
        job_role: req.body.job_role,
        notice_period: req.body.notice_period,
        from_age: req.body.from_age,
        to_age: req.body.to_age,
        gender: req.body.gender,
        no_of_positions: req.body.no_of_positions,
        allow_disabled: req.body.allow_disabled,
        last_date_to_apply: req.body.last_date_to_apply,
        date_of_post: req.body.last_date_of_post,
        special_comments: req.body.special_comments,
        commitments: req.body.commitments,
        screening_questions: req.body.screening_questions,
        mode_of_interview: req.body.mode_of_interview,
    });
    newjobpost.save()
        .then(data => {
            let temp;
            temp = JSON.parse(req.body.interview_panel_details);
            Object.keys(temp).forEach(function (key) {
                const newPanelCreate = new InterviewPanel({
                    jobpost_id: data.id,
                    member_id: temp[key].id,
                    interviewer_name: temp[key].interviewer_name,
                    interview_round: temp[key].interview_round
                });
                newPanelCreate.save().then(data =>{
                    return res.json({
                        success: true,
                        message: "Job post create successfully",
                    });
                })
            })
        }).catch(err => {
            return res.status(500).send({
                message: err.message || "Some error occurred while creating a User."
            });
        });
}

// Get jobs by id

exports.getJobPost = (req, res) =>{
    let query;
    console.log(req.body.status);
    if(!req.body.user_id){
        res.json({
            success: false,
            message: "user id can not be empty"
        })
    }
    if(!req.body.status){
        res.json({
            success: false,
            message: "status can not be empty"
        })
    }
       let ts = Date.now();

        let date_ob = new Date(ts);
        let date = date_ob.getDate();
        let month = date_ob.getMonth() + 1;
        let year = date_ob.getFullYear();
        let dateString = year+'-'+month+'-'+date;
        if(req.body.status == 0){
            query = `select 
            * ,
            (SELECT count(*) FROM swip_match where swip_match.job_id = jobpostcollection.id AND swip_match.candidate_swip=1) as total_candidate_swip
            from jobpostcollection
            where (user_id = '`+req.body.user_id+`')
            and  (date_of_post < '`+dateString+`')
             `;
        }
        if(req.body.status == 1){
            query = `select 
            *,
            (SELECT count(*) FROM swip_match where swip_match.job_id = jobpostcollection.id AND swip_match.candidate_swip=1) as total_candidate_swip
             from jobpostcollection
            where (user_id = '`+req.body.user_id+`')
            and  (date_of_post >= '`+dateString+`')
             `;
        }
        if(req.body.status == 2){
            query = `
            select 
            * ,
            (SELECT count(*) FROM swip_match where swip_match.job_id = jobpostcollection.id AND swip_match.candidate_swip=1) as total_candidate_swip
            from jobpostcollection
            where (jobpostcollection.user_id = '`+req.body.user_id+`')
             `;
        }
    
    sequelize.query(query, { type: sequelize.QueryTypes.SELECT })
    .then(function (users) {
       if(users.length == 0){
        res.json({
            success: false,
            message: "Data not found"
        })
       }else{
            res.json({
                success: true,
                message: "Data found",
                data: users
            })
       }
       
    }).catch(err=>{
        res.json({
            success: false,
            message: "Something went to wrong! "+err
        })
    })
    
}

exports.update = (req, res) => {
    //  update it with the request body    
    User.update({
        job_title: req.body.job_title,
        job_type: req.body.job_type,
        qualification: req.body.qualification,
        shift: req.body.shift,
        cabs: req.body.cabs,
        from_annaul_ctc: req.body.from_annaul_ctc,
        to_annual_ctc: req.body.to_annual_ctc,
        process: req.body.process,
        role: req.body.role,
        notice_period: req.body.notice_period,
        from_age: req.body.from_age,
        to_age: req.body.to_age,
        gender: req.body.gender,
        no_of_positions: req.body.no_of_positions,
        allow_disabled: req.body.allow_disabled,
        interview_details: req.body.interview_details,
        interviewerid: req.body.interviewerid,
        interview_round: req.body.interview_round,
        last_date_to_apply: req.body.last_date_to_apply,
        date_of_post: req.body.last_date_of_post,
        special_comments: req.body.special_comments,
        mode_of_interview: req.body.mode_of_interview,
        screening_questions: req.body.screening_questions,
        interested_in_parttime: req.body.interested_in_parttime,
        weekends_availibility: req.body.weekends_availibility,
        flexible_shift: req.body.flexible_shift,
        sign_contract: req.body.sign_contract,
        travel: req.body.travel,
        sales_assignments: req.body.sales_assignments,
        applicants_list: req.body.applicants_list,
        status: req.body.status,
    }, {
        where: { id: req.params.userId }
    }).then(data => {
        res.json(data);
    }).catch(err => {
        res.json(err);
    })
};

exports.viewapplicants = (req, res) =>{
    query = `
    select 
    swip_match.candidate_id,
    swip_match.job_id,
    swip_match.employer_swip,
    swip_match.candidate_swip,
    swip_match.question_ans_json,

    user.fname,
    user.lname,

    candidate_bio.profile_pic
    
    from swip_match
    left join user ON (user.id =  swip_match.candidate_id)
    left join candidate_bio ON (candidate_bio.user_id =  swip_match.candidate_id)
    where (swip_match.job_id = '`+req.body.job_id+`')
     `;
     sequelize.query(query, { type: sequelize.QueryTypes.SELECT })
        .then(function (users) {
            res.json({
                success: true,
                message: "Data found",
                data: users
            })
        
        }).catch(err=>{
            res.json({
                success: false,
                message: "Something went to wrong! "+err
            })
        })
}