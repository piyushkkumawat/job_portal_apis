var db = require('../../../config/db.config');

const CompanyInfo = db.companyinfo;
const CompanyType = db.companytype;
let company_logo_path;


exports.create = (req, res) => {
    if (req.file) {
        company_logo_path = req.file.path ? req.file.path : '';
    }
    if (!req.body.user_id) {
        return res.json({
            auth: false,
            message: "User Id can not be empty"
        })
    }
    const newCompanyInfo = new CompanyInfo({
        user_id: req.body.user_id,
        designation: req.body.designation,
        company_type: req.body.company_type,
        company_formed_year: req.body.company_formed_year,
        company_website: req.body.company_website,
        company_location: req.body.company_location,
        company_lat: req.body.company_lat,
        company_lng: req.body.company_lng,
        company_branches: req.body.company_branches,
        company_description: req.body.company_description,
        company_logo: company_logo_path
    });
    newCompanyInfo.save().then(data => {
        return res.json({
            status: 200,
            auth: true,
            data: data,
            message: "Data insert Successfully"
        })
    }).catch(err => {
        return res.json({
            auth: false,
            message: "Something went to wrong " + err
        })
    })
};



exports.updatecompanyinfo = (req, res) => {
    if (!req.body.user_id) {
        res.json({
            success: false,
            message: "User Id can not be empty",
        })
    }
    if (req.file) {
        company_logo_path = req.file.path ? req.file.path : '';
    }
    CompanyInfo.findOne({ where: { user_id: req.body.user_id } }).then(user => {
        if (!user) {
            const newCompanyInfo = new CompanyInfo({
                user_id: req.body.user_id,
                designation: req.body.designation,
                company_type: req.body.company_type,
                company_formed_year: req.body.company_formed_year,
                company_website: req.body.company_website,
                company_location: req.body.company_location,
                company_lat: req.body.company_lat,
                company_lng: req.body.company_lng,
                company_branches: req.body.company_branches,
                company_description: req.body.company_description,
                company_logo: company_logo_path
            });
            newCompanyInfo.save().then(data => {
                return res.json({
                    status: 200,
                    success: true,
                    data: data,
                    message: "update successfully"
                })
            }).catch(err => {
                return res.json({
                    auth: false,
                    message: "Something went to wrong " + err
                })
            })
        }
        if (user) {
            CompanyInfo.update({
                designation: req.body.designation,
                company_type: req.body.company_type,
                company_formed_year: req.body.company_formed_year,
                company_website: req.body.company_website,
                company_location: req.body.company_location,
                company_lat: req.body.company_lat,
                company_lng: req.body.company_lng,
                company_branches: req.body.company_branches,
                company_description: req.body.company_description,
                company_logo: company_logo_path
            }, {
                where: { user_id: req.body.user_id }
            }).then(data => {
                res.json({
                    status: 200,
                    success: true,
                    message: "update successfully"
                })
            }).catch(err => {
                res.json({
                    success: false,
                    message: "Something went to wrong! " + err,
                })
            })
        }
    })
}

// get company type

exports.getCompanyType = (req, res) =>{
    CompanyType.findAll().then(data=>{
            res.json({
                success: true,   
                data:data
            });
        }).catch(err=>{
            res.json("error"+err);
        })
}
