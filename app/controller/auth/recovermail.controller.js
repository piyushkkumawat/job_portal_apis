var db = require('../../../config/db.config');
const Registration = db.registration;

exports.update = (req, res) => {
    if (!req.body.recovery_email) {
          return res.json({
            status:400,
            auth: false,
            message: "Email can not be empty"
        })
    }
    if (!req.body.role_type) {
        return res.json({
          status:400,
          auth: false,
          message: "role type can not be empty"
      })
  }
    // if(req.body.role_type == 1){
        Registration.update({
            recovery_email: req.body.recovery_email,
        },{
            where: {id: req.body.userId}
        }).then(data =>{
            return res.json({
                status:200,
                auth: true,
                message: "Insert successfully recovery email"
            })
        }).catch(err =>{
            return res.json({
                status:500,
                auth: false,
                message: "something went to wrong" +err
            })
        })
    // }

}