var router = require("express").Router();

router.get('/chat',function(req,res,next) {
    res.render('../view/chat.ejs');
});

module.exports = router;