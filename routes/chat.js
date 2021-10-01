const { Router } = require('express');
const router = Router();
const { postSendMessage, postReceiveMessage } = require('../controllers/Chat');

router.post('/', postSendMessage);
router.post('/receive-message', postReceiveMessage);

module.exports = router;