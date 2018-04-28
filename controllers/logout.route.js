const express = require('express');
const router = express.Router();

router.get('/', global.secure(), function(request, response) {
    request.logout();
    request.session.destroy();
    response.redirect('/');
});

module.exports = router;