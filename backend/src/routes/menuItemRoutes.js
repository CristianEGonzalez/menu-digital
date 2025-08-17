const { Router } = require('express');
const menuItemController = require('../controllers/menuItemController');
const upload = require('../config/multer');
// const { validarMenuItem } = require('../middleware/validarSchema');
const router = Router();

router.post('/', upload.single('photo'), menuItemController.createMenuItem);
router.get('/', menuItemController.getMenuItemList);
router.get('/:id', menuItemController.getMenuItem);
router.delete('/:id', menuItemController.deleteMenuItem);
// router.put('/:id', menuItemController.updateMenuItem);

module.exports = router;