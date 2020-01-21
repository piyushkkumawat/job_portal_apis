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
    JobAlert.findOne({ where: { user_id: req.body.user_id } }).then(data => {
           
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
    })
}
