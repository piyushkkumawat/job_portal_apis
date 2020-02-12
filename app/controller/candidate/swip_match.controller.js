var db = require('../../../config/db.config');
const SwipMatch = db.swip_match;
var arrayNew = [];

SwipMatch.belongsTo(db.registration, {foreignKey: 'candidate_id'});
// SwipMatch.belongsTo(db.candidate_bio, {foreignKey: 'user_id'});
// db.candidate_bio.hasMany(db.work, {foreignKey: 'user_id'});
// SwipMatch.belongsTo(db.work,{foreignKey: 'user_id'});

exports.create = (req,res) =>{
    console.log(req.body);
    if(!req.body.role_type){
        res.json({
            success: false,
            message: "Role type can not be empty"
        })
    }
    if(req.body.role_type == 1){
        SwipMatch.findOne({where:{employer_id: req.body.employer_id, candidate_id:req.body.candidate_id, job_id: req.body.job_id}}).then(data =>{
            if(data){
                SwipMatch.update({
                    employer_swip: 1
                },{
                    where:{id:data.id}
                }).then(()=>{
                    res.json({
                        success: true,
                        message: "Update successfully"
                    })
                }).catch(err=>{
                    res.json({
                        success: false,
                        message: "Something went to wrong! "+err
                    })
                })
            }
            if(!data){
                const newSwip = new SwipMatch({
                    employer_id: req.body.employer_id,
                    candidate_id:req.body.candidate_id,
                    job_id: req.body.job_id,
                    employer_swip: 1,
                });

                newSwip.save().then(data=>{
                    res.json({
                        success: true,
                        data: data,
                        message: "Insert successfully"
                    })
                }).catch(err=>{
                    res.json({
                        success: false,
                        message: "Something went to wrong! "+err
                    })
                })
            }
        })
    }
    if(req.body.role_type == 2){
        SwipMatch.findOne({where:{employer_id: req.body.employer_id, candidate_id:req.body.candidate_id, job_id: req.body.job_id}}).then(data =>{
            if(data){
                SwipMatch.update({
                    candidate_swip: 1
                },{
                    where:{id:data.id}
                }).then(()=>{
                    res.json({
                        success: true,
                        message: "Update successfully"
                    })
                }).catch(err=>{
                    res.json({
                        success: false,
                        message: "Something went to wrong! "+err
                    })
                })
            }
            if(!data){
                const newSwip = new SwipMatch({
                    employer_id: req.body.employer_id,
                    candidate_id:req.body.candidate_id,
                    job_id: req.body.job_id,
                    question_ans_json: req.body.question_ans_json,
                    candidate_swip: 1,
                });
                newSwip.save().then(data=>{
                    res.json({
                        success: true,
                        data: data,
                        message: "Insert successfully"
                    })
                }).catch(err=>{
                    res.json({
                        success: false,
                        message: "Something went to wrong! "+err
                    })
                })

            }

        })
    }
   
}

exports.getcandidatesjobs = (req, res) =>{
    if(!req.body.job_id){
        return res.json({
            success: false,
            message: "JOb Id can not be empty"
        })
    }
   
    SwipMatch.findAll(
        {   
            attributes: ['employer_swip','candidate_swip'],
            order: [
                [[db.work],'to_date', 'DESC'],
            ],
            where:{job_id: req.body.job_id},
            include: [
                {  
                    attributes: ['fullName'],
                    model: db.registration,
                    include: [
                        {   
                            attributes:[['id','candidateBioId'],'user_id','profile_pic'],
                            model: db.candidate_bio ,
                            
                        },
                        {
                            attributes: [['id','workId'],'name_of_company','designation', 'to_date'], 
                            model: db.work
                        }
                    ]
                },
            ]
        }).then(data =>{
            return res.json({
                success: true,
                data: data
            })
//          Object.keys(data).forEach(function (key) {
//             console.log("Id===>", data[key].candidate_id);
//             db.registration.findOne({
//                 where: {
//                     id: data[key].candidate_id
//                 }
//             }).then(data2 => {
//                 arrayNew.push(data2);
//             });
//         })
//    (async () => {
//        await res.json({
//             data: arrayNew
//         })
//     })
})
}


