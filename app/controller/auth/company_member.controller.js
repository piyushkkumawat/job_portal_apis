var db = require('../../../config/db.config');

const Companymember = db.memberinfo;



exports.create = (req, res) => {
     const newCompanyMember = new Companymember({
        company_id: req.body.company_id,
        member_email_id: req.body.member_email_id,
        member_phoneno: req.body.member_phoneno,
        member_name: req.body.member_name,
        member_designation: req.body.member_designation,
        member_specialization: req.body.member_specialization,
    });
    newCompanyMember.save().then(data =>{
        return res.json({
            status:200,
            data: data,
            message: "Data insert Successfully"
        })
    }).catch(err =>{
        return res.json({
            message: "Something went to wrong "+err
        })
    })
 };


 exports.findById = (req,res)=>{
     if(req.body.id == '' ||  req.body.id == undefined){
        return res.json({
            status: 200,
            message: "Id can not be empty"
        })
     }
    Companymember.findAll({where:{company_id: req.body.id}}).then(data=>{
        return res.json({
            status: 200,
            auth: true,
            data: data
        })
    }).catch(err=>{
        res.json("error"+err);
    })
}


exports.deleteById = (req,res)=>{
    Companymember.destroy({
        where: {
            id: req.body.id
        }
    }).then(() =>{
            res.json({
                status:200,
                message:"Deleted successfully"});          
    }).catch(err =>{
        res.json({
            status:404,
            message:"record not found " +err})
    })
}


exports.update = (req, res) => {
    if(!req.body.memberId){
        res.json({
            status:200,
            message: "member Id can not be empty"
        })
    }
    let data = req.body;
    Companymember.update({
        ...data
    }, {
        where: { id: req.body.memberId }
    }).then(data => {
        res.json({
            status:200,
            message: "Record update successfully"
        })
    }).catch(err => {
        res.json({
            status:200,
            message: "something went to wrong "+err
        })
    })

};