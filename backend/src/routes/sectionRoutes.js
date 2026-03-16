const { Router } = require('express');
const sectionController = require('../controllers/sectionController');
const upload = require('../config/multer');
// const { validarMenuItem } = require('../middleware/validarSchema');
const router = Router();

router.post('/', upload.single('image'), sectionController.createSection);
router.get('/', sectionController.getSections);
router.put('/:id', upload.single('image'), sectionController.updateSection);
router.delete('/:id', sectionController.deleteSection);
router.patch('/:id/restore', sectionController.restoreSection);
// router.get('/:id', sectionController.getMenuItem);

module.exports = router;