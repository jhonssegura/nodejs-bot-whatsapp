const { Router } = require('express');
const router = Router();
const { postReceiveMessage, postSendMessage, postSendImage, postSendFilePDF, postSendVoice, postSendVideo, postSendLocation, postSendContact, postSendContactList } = require('../controllers/Chat');

router.post('/', postSendMessage);
router.post('/receive-message', postReceiveMessage);
router.post('/image', postSendImage);
router.post('/file', postSendFilePDF);
router.post('/voice', postSendVoice);
router.post('/video', postSendVideo);
router.post('/location', postSendLocation);
router.post('/contact', postSendContact);
router.post('/contact_list', postSendContactList)

module.exports = router;