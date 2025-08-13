const { Router } = require('express');
const sectionController = require('../controllers/sectionController');
const upload = require('../config/multer');
// const { validarMenuItem } = require('../middleware/validarSchema');
const router = Router();

router.post('/', upload.single('photo'), sectionController.createSection);
router.get('/', sectionController.getSections);
// router.get('/:id', sectionController.getMenuItem);
// router.put('/:id', sectionController.updateMenuItem);
// router.delete('/:id', sectionController.deleteMenuItem);

module.exports = router;