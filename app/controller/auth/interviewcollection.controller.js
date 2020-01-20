var db = require('../../../config/db.config');
const InterviewCollection = db.interviewcollection;


exports.create = (req, res) => {

    const newInteriewCollection = new InterviewCollection({
        interviewer: req.body.interviewer,
        interviewee: req.body.interviewee,
        date_and_time_of_interview: req.body.date_and_time_of_interview,
        interview_round: req.body.interview_round,
        status: req.body.status,
        type: req.body.type,
        recording: req.body.recording,
        post_interview_feedback: req.body.post_interview_feedback,
        feedback_details: req.body.feedback_details,
        cancel_reason: req.body.cancel_reason,
    });
    newInteriewCollection.save()
    .then(data => {
       return res.json(data);
    }).catch(err => {
       return res.json({
            message: err.message || "Some error occurred while creating a User."
        });
    });
}