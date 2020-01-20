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




exports.findProfile = (req, res) => {
    console.log(req.body);
    db.registration.findOne({
        where:{id: req.body.user_id},
        include: [
            {   
              
                model: db.companyinfo,
                include:[
                    {
                        model: db.memberinfo
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
            message: "error " +err
        })
    })
  
};