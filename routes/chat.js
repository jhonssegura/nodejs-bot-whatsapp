const { Router } = require('express');
const router = Router();
const { 
  postReceiveMessage, 
  postSendMessage,
  postSendText, 
  postSendImage, 
  postSendFile, 
  postSendVoice, 
  postSendVideo, 
  postSendLocation, 
  postSendContact, 
  postSendContactList,
  getPublicFile,
  getQrFile} = require('../controllers/Chat');

router.post('/', postSendMessage);
router.post('/receive-message', postReceiveMessage);
router.post('/text', postSendText);
router.post('/image', postSendImage);
router.post('/file', postSendFile);
router.post('/voice', postSendVoice);
router.post('/video', postSendVideo);
router.post('/location', postSendLocation);
router.post('/contact', postSendContact);
router.post('/contact_list', postSendContactList);
router.get('/get-file/:document', getPublicFile);
router.get('/get-qr', getQrFile)

module.exports = router;