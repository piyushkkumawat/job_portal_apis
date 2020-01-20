var db = require('../../../config/db.config');
let iqimagepath;
let questionIdArray = [];
let answerIdArray = [];
var objarray;

exports.create = (req, res) => {
    if (req.file) {
        iqimagepath =  req.file.path ? req.file.path : '';
    }
    const newIqQuestion = new db.iq_questions({
        question: req.body.question,
        questionImage: iqimagepath,
        option_A: req.body.option_A,
        option_B: req.body.option_B,
        option_C: req.body.option_C,
        option_D: req.body.option_D,
        option_E: req.body.option_E,
        answer: req.body.answer
    });
    newIqQuestion.save().then(data=>{
        res.json({
            success:true,
            message: "data insert successfully"
        });
    }).catch(err=>{
        res.json({
            success:false,
            message: "something went to wrong! "+err
        });
    })
}


exports.findAll = (req,res)=>{
    data = {
        attributes: ['id','question','questionImage','option_A','option_B','option_C','option_D','option_E','answer']
    }
    db.iq_questions.findAll(data).then(result=>{
        return res.json({
            success: true,
            message: "Data Found",
            data: result,
        })
    }).catch(err=>{
        return res.json({
            success: false,
            message: "something went to wrong! "+err
        })
    })
}

// Iq Question submit

exports.testsubmit = (req,res)=>{
    let tempRes = 0;
    let percentage = 0;
    let finalResult = 0.0;
    let questionId = req.body.question_id;
    let answerId = req.body.answer;
    if(!req.body.user_id) {
        return res.json({
            success: false,
            message: "User id must be require"
        })
    }
    data = {
        attributes: ['id','answer']
    }
    questionIdArray =questionId.split(',');
    answerIdArray = answerId.split(',');

    db.iq_questions.findAll(data).then(data=>{
        Object.keys(data).forEach(function (i) {
            const temp_id = data[i].id;
            const temp_answer = data[i].answer;
            Object.keys(questionIdArray).forEach(function (key) {
                const my_temp_id = questionIdArray[key];
                const my_temp_answer = answerIdArray[key];

                if(temp_id == my_temp_id){
                    console.log("id match: "+ my_temp_id);
                    if(temp_answer == my_temp_answer){
                        console.log("Ans match: "+ my_temp_answer);
                        tempRes = tempRes +1;
                    }

                }
            })
        })
        finalResult =( (100*tempRes)/6)/10;
        percentage = finalResult.toFixed(1);
        const newiqtestsubmit = new db.iqtestsubmit({
            user_id : req.body.user_id,
            iqTest_email: req.body.iqTest_email,
            question_id : questionId,
            answer : answerId,
            resultIqTest: percentage
        });
        newiqtestsubmit.save()
        .then(data => {
         
            console.log("aaaaaaaaa=>",tempRes);
            return res.json({
               success: true,
               message: "Answer submit successfull",
               data: data
          })
           
        }).catch(err=>{
            return res.json({
                success: false,
                message: "failed "+err
            })
        })
    })
}


// Iq Question submit

exports.findIqResult = (req,res)=>{
    let tempRes = 0;
    let newRes;
    db.iqtestsubmit.findOne({where:{user_id: req.body.user_id}}).then(result=>{
       
        data = {
            attributes: ['id','answer']
        }
        questionIdArray = result.question_id.split(',');
        answerIdArray = result.answer.split(',');
        
        db.iq_questions.findAll(data).then(data=>{
             Object.keys(data).forEach(function (i) {
                const temp_id = data[i].id;
                const temp_answer = data[i].answer;

                Object.keys(questionIdArray).forEach(function (key) {
                    const my_temp_id = questionIdArray[key];
                    const my_temp_answer = answerIdArray[key];

                    if(temp_id == my_temp_id){
                        console.log("id match: "+ my_temp_id);
                        if(temp_answer == my_temp_answer){
                            console.log("Ans match: "+ my_temp_answer);
                            tempRes = tempRes +1;
                        }

                    }
                   
                })
            })
             newRes = {
                "id":result["id"],
                "user_id":result["user_id"],
                "question_id":result["question_id"],
                "answer":result["answer"],
                "result": tempRes,
            }; 
            res.json({
                data:  newRes
    
            })
        })
    })

}