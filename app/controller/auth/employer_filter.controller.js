var db = require('../../../config/db.config');
var JobAlert = db.jobalert;
const sequelize = db.sequelize;

exports.filter = (req, res) => {
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
    JobAlert.findOne({ where: { user_id: req.body.user_id } }).then(data => {
            
        if (data.role_type == 2) {
            const sql = `select 
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

            candidate_bio.profile_pic as candidate_bio_profile_pic,
            candidate_bio.other_img1,
            candidate_bio.other_img2,
            candidate_bio.candidate_idcard,
            candidate_bio.candidate_info,
            candidate_bio.special_telent,
            candidate_bio.social_responsiblity,
            candidate_bio.sports,
            candidate_bio.candidate_resume_video,
            candidate_bio.candidate_resume,

            education_details.highest_qualification,
            education_details.name_institution,
            education_details.year_of_passing,

            work_details.fresher,
            work_details.name_of_company,
            work_details.designation,
            work_details.total_years_of_experience,
            work_details.from_date,
            work_details.to_date,

            job_alert.user_id,
            job_alert.from_salary_range,
            job_alert.to_salary_range
            
            from job_alert
            inner join user ON (user.id = job_alert.user_id)
            left join candidate_bio ON (candidate_bio.user_id = job_alert.user_id)
            left join work_details ON (work_details.user_id = job_alert.user_id)
            left join education_details ON (education_details.user_id = job_alert.user_id)
            where 
            job_alert.role_type=1 and
            
            (qualification like '%`+ data.qualification + `%' 
            or job_alert.designation like '%`+ data.designation + `%' 
            or shift like '%`+ data.shift + `%'
            or candidate_location like '%`+ data.candidate_location + `%'
            or typeof_employement like '%`+ data.typeof_employement + `%'
            or employement_category like '%`+ data.employement_category + `%'
            or industry_category like '%`+ data.industry_category + `%'
            or (job_alert.from_salary_range >= `+ data.from_salary_range + ` 
                and job_alert.from_salary_range <= `+ data.to_salary_range + `) 
            or    
                (job_alert.to_salary_range >= `+ data.from_salary_range + ` 
            and  job_alert.to_salary_range <= `+ data.to_salary_range +`)
            )
            `;
            sequelize.query(sql, { type: sequelize.QueryTypes.SELECT })
                .then(function (users) {
                    res.json({
                        success: true,
                        data: users
                    })
                })

        }
        if (data.role_type == 1) {
            const sql = `select 
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

            company_info.designation,
            company_info.company_type,
            company_info.company_formed_year,
            company_info.company_website,
            company_info.company_location,
            company_info.company_lat,
            company_info.company_lng,
            company_info.company_branches,
            company_info.company_logo,

            company_bio.profile_pic,
            company_bio.bio_info,
            company_bio.requirement_video,
            
            job_alert.user_id,
            job_alert.from_salary_range,
            job_alert.to_salary_range
            from job_alert
            inner join user ON (user.id = job_alert.user_id)
            left join company_bio ON (company_bio.user_id = job_alert.user_id)
            left join company_info ON (company_info.user_id = job_alert.user_id)
            where 
            job_alert.role_type=2 and
            
            (qualification like '%`+ data.qualification + `%' 
            or job_alert.designation like '%`+ data.designation + `%' 
            or shift like '%`+ data.shift + `%'
            or candidate_location like '%`+ data.candidate_location + `%'
            or typeof_employement like '%`+ data.typeof_employement + `%'
            or employement_category like '%`+ data.employement_category + `%'
            or industry_category like '%`+ data.industry_category + `%'
            or (job_alert.from_salary_range >= `+ data.from_salary_range + ` 
                and job_alert.from_salary_range <= `+ data.to_salary_range + `) 

            or
                (job_alert.to_salary_range >= `+ data.from_salary_range + ` 
                and job_alert.to_salary_range <= `+ data.to_salary_range +`)
            )
            `;
            sequelize.query(sql, { type: sequelize.QueryTypes.SELECT })
                .then(function (users) {
                    res.json({
                        success: true,
                        data: users
                    })
                })
        }

    })
}
