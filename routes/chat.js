const { Router } = require('express');
const router = Router();
const { postReceiveMessage, postSendMessage, postSendImage, postSendFilePDF, postSendVoice, postSendVideo } = require('../controllers/Chat');

router.post('/', postSendMessage);
router.post('/receive-message', postReceiveMessage);
router.post('/image', postSendImage);
router.post('/file', postSendFilePDF);
router.post('/voice', postSendVoice);
router.post('/video', postSendVideo)

module.exports = router;