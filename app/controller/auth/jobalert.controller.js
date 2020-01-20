var db = require('../../../config/db.config');

const Jobalert = db.jobalert;

exports.create = (req, res) => {
    if(!req.body.user_id){
        return res.json({
            auth: false,
            success: false,
            message: "User Id can not be empty"
        })
    }
    if(!req.body.role_type){
        return res.json({
            auth: false,
            success: false,
            message: "role type can not be empty"
        })
    }
     const jobalert = new Jobalert({
        user_id: req.body.user_id,
        role_type: req.body.role_type,
        designation: req.body.designation,
        qualification: req.body.qualification,
        shift: req.body.shift,
        candidate_location: req.body.candidate_location,
        candidate_lat: req.body.candidate_lat,
        candidate_lng: req.body.candidate_lng,
        typeof_employement: req.body.typeof_employement,
        employement_category: req.body.employement_category,
        industry_category: req.body.industry_category,
        from_salary_range: req.body.from_salary_range,
        to_salary_range: req.body.to_salary_range
    });
    jobalert.save().then(data =>{
        return res.json({
            status:200,
            auth: true,
            success: true,
            data: data,
            message: "Data insert Successfully"
        })
    }).catch(err =>{
        return res.json({
            auth: false,
            success: false,
            message: "Something went to wrong "+err
        })
    })
 };


 exports.update = (req, res) => {
     let data = req.body;
    if(!req.body.user_id){
       return res.json({
           success: false,
           message: "user id must be requtred."
       });
    }
    Jobalert.findOne({ where: { user_id: req.body.user_id } }).then(user => {
        if (!user) {
            res.json({
                success: false,
                message: "job alert not found",
            })
        }
        if(user){
            Jobalert.update({
                ...data
              },
              {
                  where: { user_id: req.body.user_id }
              }).then(data => {
                  return res.json({
                      success: true,
                      message: "Data update Successfully"
                  })
              }).catch(err =>{
                  return res.json({
                      success: false,
                      message: "Something went to wrong "+err
                  })
              })
        }
    })
 };


 exports.findAll = (req, res) => {
     if(!req.body.user_id){
        return res.json({
            success: false,
            message: "user_id can not be empty"
        })
     }
    Jobalert.findOne({ where: { user_id: req.body.user_id } }).then(user => {
        return res.json({
            success: true,
            message: "data found",
            data: user
        })
    }).catch(err =>{
        return res.json({
            success: false,
            message: "Something went to wrong! "+err,
        })
    })
 }