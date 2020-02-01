var db = require('../../../config/db.config');



db.bookmarks.belongsTo(db.jobpostcollection,{foreignKey: 'job_id'});
db.jobpostcollection.belongsTo(db.registration,{foreignKey: 'user_id'});
db.jobpostcollection.belongsTo(db.companybio,{foreignKey: 'user_id'});
 

db.bookmarks.belongsTo(db.registration,{foreignKey: 'save_id'});
db.bookmarks.belongsTo(db.candidate_bio,{foreignKey: 'user_id'});
db.bookmarks.belongsTo(db.work,{foreignKey: 'user_id'});

exports.create = (req, res) =>{
    if(!req.body.role_type){
       return res.json({
           success: false,
           message: "role type can not be empty"
       }) 
    }
    if(!req.body.user_id){
        return res.json({
            success: false,
            message: "user_id can not be empty"
        }) 
     }
     if(!req.body.save_id){
        return res.json({
            success: false,
            message: "save_id can not be empty"
        }) 
     }
     if(!req.body.job_id){
        return res.json({
            success: false,
            message: "job_id can not be empty"
        }) 
     }
     db.bookmarks.findOne({where:{save_id: req.body.save_id}}).then(data =>{
         if(data){
            db.bookmarks.update({
                user_id: req.body.user_id,
                job_id: req.body.job_id,
                role_type: req.body.role_type,
            },{
                where:{save_id: data.save_id}
            }).then(()=>{
                return res.json({
                    success: true,
                    message: "Update successfully"
                })
            }).catch(err=>{
                return res.json({
                    success: false,
                    message: "Something went to wrong! "+err
                })
            })
         }
         if(!data){
            const newbookmark = new db.bookmarks({
                user_id: req.body.user_id,
                save_id: req.body.save_id,
                job_id: req.body.job_id,
                role_type: req.body.role_type,
            });
            newbookmark.save().then(data=>{
                return res.json({
                    success: true,
                    data: data
                })
            }).catch(err=>{
               return res.json({
                    success:false,
                    message: "something went to wrong! "+err
                })
            })
         }
     })
    
}


// get saved jobs


exports.getsavedjobs = (req,res) =>{
    if(!req.body.role_type){
        return res.json({
            success: false,
            message: "role type can not be empty"
        }) 
     } 
     if(!req.body.user_id){
        return res.json({
            success: false,
            message: "user id can not be empty"
        }) 
     } 
    if(req.body.role_type == 2){
        db.bookmarks.findAll({
            attributes:['id','save_id','role_type'],
            where:{user_id: req.body.user_id},
            include: [
                {   
                    attributes:[['id','jobPostId'],'user_id','job_title','company_industry_location','company_lat','company_lng','last_date_to_apply'],
                    model: db.jobpostcollection,
                    include: [
                        {   
                            attributes:[['id','companyId'],'company_name'],
                            model: db.registration,
                            include: [
                                {
                                    attributes:['profile_pic'], 
                                    model: db.companybio
                                }
                            ]
                        }
                        
                  ]
                }
               
        ]
        }).then(data=>{
           return res.json({
                success:true,
                data:data
            })
        }).catch(err=>{
            res.json({
                success: false,
                message: "Something wentto wrong! "+err
            })
        })  
    }

    if(req.body.role_type == 1){
        console.log("ASdad");
        db.bookmarks.findAll({
            attributes:[['id','bookmarkId'],'save_id','role_type'],
            where:{user_id: req.body.user_id},
            include: [
                {   
                  attributes:['id','fullName'],
                  model: db.registration,
                  include: [
                      {
                          attributes:[['id','candidateBioId'],'user_id','profile_pic'],
                          model: db.candidate_bio
                      },
                      {
                        attributes: [['id','workId'],'name_of_company','designation', 'to_date'],  
                        order: [
                            ['to_date', 'DESC'],
                        ],
                        limit:1,
                        model: db.work
                     }
                  ]
                }
                
            ]
        }).then(data=>{
           return res.json({
                success:true,
                data:data
            })
        }).catch(err=>{
            res.json({
                success: false,
                message: "Something wentto wrong! "+err
            })
        }) 
    }
        
       
}