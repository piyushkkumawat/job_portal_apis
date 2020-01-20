var db = require('../../../config/db.config');
const Jobpostcollection = db.jobpostcollection;
const InterviewPanel = db.interviewpanel;


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
        last_date_of_post: req.body.last_date_of_post,
        special_comments: req.body.special_comments,
        commitments: req.body.commitments,
        screening_questions: req.body.screening_questions,
        mode_of_interview: req.body.mode_of_interview,
    });
    // console.log(newjobpost);
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
    console.log(req.body.status);
    let dataArray = [];
    let date_ob = new Date();
    Jobpostcollection.findAll({
        where:{user_id: req.body.user_id}
    }).then(data =>{
          // status == 0 ,expired jobs 
        if(req.body.status == 0){
            Object.keys(data).forEach(function (key) {
                if(data[key].last_date_of_post < date_ob){
                    dataArray.push(data[key]);
                }
            })
            res.json({
                success: true,
                data: dataArray
            })
        }
        // status == 1 ,active jobs 
        if(req.body.status == 1){
            Object.keys(data).forEach(function (key) {
                if(data[key].last_date_of_post >= date_ob){
                    dataArray.push(data[key]);
                }
            })
            res.json({
                success: true,
                data: dataArray
            })
        }
//    status == 2 , all expired and active jobs 
        if(req.body.status == 2){
            res.json({
                success: true,
                data: data
            })
        }
    }).catch(err =>{
        res.json({
            success: false,
            error: err
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
        last_date_of_post: req.body.last_date_of_post,
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