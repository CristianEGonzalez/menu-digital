const { Router } = require('express');
const menuItemController = require('../controllers/menuItemController');
const upload = require('../config/multer');
const validateRequest = require('../middlewares/validateRequest');
const { menuItemSchema } = require('../validators/menuItemValidator');
const router = Router();

router.post('/', upload.single('image'), validateRequest(menuItemSchema), menuItemController.createMenuItem);
router.get('/', menuItemController.getMenuItemList);
router.get('/:id', menuItemController.getMenuItem);
router.put('/:id', upload.single('image'), validateRequest(menuItemSchema), menuItemController.updateMenuItem);
router.delete('/:id', menuItemController.deleteMenuItem);
router.patch('/:id/restore', menuItemController.restoreMenuItem);

module.exports = router;