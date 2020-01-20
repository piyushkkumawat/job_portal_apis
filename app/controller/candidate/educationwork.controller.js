const bcrypt = require('bcryptjs');
var db = require('../../../config/db.config');
var fs = require('fs');
const Education = db.education; 
const Work = db.work; 


// Create and Save a education details
exports.create_education = (req, res) => {
    if(!req.body.user_id){
        res.json({
            success:false,
            message: "User Id can not be empty"
        });
    }
    // Create a User
    const education = new Education({
        user_id: req.body.user_id,
        highest_qualification: req.body.highest_qualification,
        name_institution: req.body.name_institution,
        year_of_passing:  req.body.year_of_passing,
    });

    // Save User in the database

    education.save()
        .then(data => {
            res.json({
                success:true,
                message: "data insert successfully"
            });
        }).catch(err => {
            res.json({
                success:false,
                message: "Something went to wrong "+err
            });
        });
};

// Create and Save a work details

exports.create_work = (req, res) => {
    if(!req.body.user_id){
        res.json({
            success:false,
            message: "User Id can not be empty"
        });
    }
    // Create a User
    const work = new Work({
        user_id: req.body.user_id,
        fresher: req.body.fresher,
        name_of_company: req.body.name_of_company,
        designation: req.body.designation,
        total_years_of_experience: req.body.total_years_of_experience,
        from_date: req.body.from_date,
        to_date: req.body.to_date,
    });

    // Save User in the database

    work.save()
        .then(data => {
            res.json({
                success:true,
                message: "data insert successfully"
            });
        }).catch(err => {
            res.json({
                success:false,
                message: "Something went to wrong "+err
            });
        });

};
/*=============
 Eduaction and work details Get By Id
  =============*/

exports.findeducation = (req, res) =>{
    if (!req.body.user_id) {
        res.json({
            success: false,
            message: "User id can not be null"
        })
    }
    Education.findOne({where:{user_id:req.body.user_id}})
        .then(data => {
            if(!data){
                return res.json({
                    success: false,
                    message: "User not found with id " + req.body.user_id
                });
            }
            res.json({
                message: "Data found",
                success: true,
                data: data
            });
        }).catch(err => {
                return res.json({
                    success: false,
                    message: "Something went to wrong  "+err
                });
        })
};

/*===============
 Update Education record
 ================*/

 exports.update_education=(req,res)=>{
    if (!req.body.id) {
        res.json({
            success: false,
            message: "id can not be null"
        })
    }
    var education =req.body;
    // Education.findOne({ where: { user_id: req.body.user_id } }).then(user => {
    //     if(!user){
    //         const neweducation = new Education({
    //            ...education
    //         });
        
    //         // Save User in the database
    //         neweducation.save()
    //             .then(data => {
    //                 res.json({
    //                     success:true,
    //                     message: "Update successfully"
    //                 });
    //             }).catch(err => {
    //                 res.json({
    //                     success:false,
    //                     message: "Something went to wrong "+err
    //                 });
    //             });
    //     }else{
            Education.update({
                ...education
             },{
                 where:{id:req.body.id}
               }
             ).then(()=>{
                 res.json({
                     message: "Update successfully",
                     success: true
                 });
             }).catch(err=>{
                 res.json({
                     message: "Something went to wrong!",
                     success: false
                 });
             })
        // }
    // })
   
}

/*===============
 Delete Education record
 ================*/

exports.delete_education = (req,res)=>{
    Education.destroy({
        where: {
            id: req.body.id
        }
    }).then(() =>{
            res.json({
                status:200,
                success:true,
                message:"Deleted successfully"});          
    }).catch(err =>{
        res.json({
            status:404,
            success:false,
            message:"Something went to wrong! " +err})
    })
}





/*=============
 work details Get By Id
  =============*/

  exports.findwork = (req, res) =>{
    if (!req.body.user_id) {
        res.json({
            success: false,
            message: "User id can not be null"
        })
    }
    Work.findOne({where:{user_id:req.body.user_id}})
        .then(data => {
            if(!data){
                return res.json({
                    success: false,
                    message: "User not found with id " + req.body.user_id
                });
            }
            res.json({
                message: "Data found",
                success: true,
                data: data
            });
        }).catch(err => {
                return res.json({
                    success: false,
                    message: "Something went to wrong  "+err
                });
        })
};

/*===============
 Update Work record
 ================*/

 exports.update_work=(req,res)=>{
    if (!req.body.id) {
        res.json({
            success: false,
            message: "id can not be null"
        })
    }
    var work =req.body;
    // Work.findOne({ where: { user_id: req.body.user_id } }).then(user => {
    //     if(!user){
    //         const work = new Work({
    //            ...work
    //         });
        
    //         // Save User in the database
        
    //         work.save()
    //             .then(data => {
    //                 res.json({
    //                     success:true,
    //                     message: "data insert successfully"
    //                 });
    //             }).catch(err => {
    //                 res.json({
    //                     success:false,
    //                     message: "Something went to wrong "+err
    //                 });
    //             });
    //     }else{
            Work.update({
                ...work
             },{
                 where:{id:req.body.id}
               }
             ).then(()=>{
                 res.json({
                     message: "Update successfully",
                     success: true
                 });
             }).catch(err=>{
                 res.json({
                     message: "Something went to wrong!",
                     success: false
                 });
             })
        // }

    // })
  
}

/*===============
 Delete Work record
 ================*/

 exports.delete_work = (req,res)=>{
    Work.destroy({
        where: {
            id: req.body.id
        }
    }).then(() =>{
            res.json({
                status:200,
                success:true,
                message:"Deleted successfully"});          
    }).catch(err =>{
        res.json({
            status:404,
            success:false,
            message:"Something went to wrong! " +err})
    })
}