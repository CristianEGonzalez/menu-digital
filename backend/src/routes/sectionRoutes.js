const { Router } = require('express');
const sectionController = require('../controllers/sectionController');
const upload = require('../config/multer');
const validateRequest = require('../middlewares/validateRequest');
const { sectionSchema } = require('../validators/sectionValidator');
const router = Router();

router.post('/', upload.single('image'), validateRequest(sectionSchema), sectionController.createSection);
router.get('/', sectionController.getSections);
router.put('/:id', upload.single('image'), validateRequest(sectionSchema), sectionController.updateSection);
router.delete('/:id', sectionController.deleteSection);
router.patch('/:id/restore', sectionController.restoreSection);

module.exports = router;