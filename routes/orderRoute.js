const Router = require('express')
const router = new Router()
const orderController = require('../controllers/orderController.js')
const authMiddleware = require('../middleware/authMiddleware')


router.post('/',  orderController.create)
router.get('/getallItem/:id',  orderController.getAllItem)
router.get('/',  orderController.getAll)
router.get('/:id',  orderController.getOne)
router.get('/device/:id',  orderController.getAllOrderDevice)
router.put('/:id',  orderController.updateOrder)
router.delete('/device/:id',  orderController.deleteBasketDevice)
router.put('/device/:id',  orderController.Device_Basket_to_Order)

router.put('/status/:id',  orderController.updateOrder_status)

router.put('/device_/:id',  orderController.Device_Order_to_Basket)
router.delete('/:id',  orderController.delOne)


module.exports = router