var db = require('../../../config/db.config');
const SwipMatch = db.swip_match;


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