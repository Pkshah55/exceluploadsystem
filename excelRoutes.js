const express = require('express');
const router = express.Router();
const excelController = require('../controllers/excelController');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single('file'), excelController.uploadExcel);
router.get('/data', excelController.getData);
router.get('/data/:id', excelController.getOne);
router.put('/data/:id', excelController.updateData);
router.delete('/data/:id', excelController.deleteData);

module.exports = router;