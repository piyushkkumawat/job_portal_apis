var db = require('../../../config/db.config');
const FeedColletion = db.jobfeedcollection;
const Feedcomments = db.feedcomments;
const FeedLikes = db.feedlikes;
let feedVideoName;
let feedImageName;

exports.create = (req, res) => {

    if (!req.body.user_id) {
        res.json({
            success: false,
            message: "User Id can not be empty"
        })
    }
    if (req.files) {
        Object.keys(req.files).forEach(function (key) {
            filedname = req.files[key].fieldname
            if (filedname == "feedImage") {
                feedImageName = req.files[key].path;
            }
            if (filedname == "feedVideo") {
                feedVideoName = req.files[key].path;
            }
        })

        const newpostfeed = new FeedColletion({
            user_id: req.body.user_id,
            feed_desc: req.body.feed_desc,
            feed_image: feedImageName,
            feed_video: feedVideoName
        })

        newpostfeed.save().then(data => {
            res.json({
                success: true,
                message: "Feed post successfully"
            })
        }).catch(err => {
            res.json({
                success: false,
                message: "Something went to wrong! " + err
            })
        })
    }
}



exports.createfeedcomment = (req, res) => {
    if (!req.body.user_id) {
        return res.json({
            success: false,
            message: "user id must be requtred."
        });
    }
    if (!req.body.feed_id) {
        return res.json({
            success: false,
            message: "feed id must be requtred."
        });
    }

    const newfeedcomment = new Feedcomments({
        user_id: req.body.user_id,
        feed_id: req.body.feed_id,
        comments: req.body.comments,
        commentBy: req.body.commentBy
    });
    newfeedcomment.save()
        .then(data => {
            return res.json({
                success: true,
                message: "Insert Successfully!"
            })
        }).catch(err => {
            return res.json({
                success: false,
                message: err.message || "Some error occurred while creating a User."
            });
        });
}



exports.createfeedLike =(req,res) =>{
    if(!req.body.user_id){
        return res.json({
            success: false,
            message: "user id must be requtred."
         });
    }

    if (!req.body.feed_id) {
        return res.json({
            success: false,
            message: "feed id must be requtred."
        });
    }
    const newfeedlike = new FeedLikes({
        user_id: req.body.user_id,
        feed_id: req.body.feed_id,
        feed_likes: req.body.feed_likes
    });
    newfeedlike.save()
    .then(data => {
       return res.json({
           success: true,
           message: "Insert successfully!"
        });
    }).catch(err => {
       return res.json({
            success: false,
            message: err.message || "Some error occurred while creating a User."
        });
    });
}