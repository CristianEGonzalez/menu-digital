const { Router } = require('express');
const menuItemController = require('../controllers/menuItemController');
// const { validarMenuItem } = require('../middleware/validarSchema');
const router = Router();

router.post('/', menuItemController.createMenuItem);
// router.get('/', menuItemController.getMenuItemList);
// router.get('/:id', menuItemController.getMenuItem);
// router.put('/:id', menuItemController.updateMenuItem);
// router.delete('/:id', menuItemController.deleteMenuItem);

module.exports = router;