const Router = require('express')
const router = new Router()
const orderController = require('../controllers/orderController.js')
const authMiddleware = require('../middleware/authMiddleware')
const checkMiddleware = require('../middleware/checkMiddleware.js')


router.post('/',  orderController.create)
router.get('/getallItem/:id',authMiddleware,  orderController.getAllItem)
router.get('/', authMiddleware, orderController.getAll)
router.get('/:id', authMiddleware,  orderController.getOne)
router.get('/device/:id',authMiddleware,  orderController.getAllOrderDevice)
router.put('/:id', authMiddleware, orderController.updateOrder)
router.delete('/device/:id', authMiddleware, orderController.deleteBasketDevice)
router.put('/device/:id',authMiddleware,  orderController.Device_Basket_to_Order)

router.put('/status/:id', authMiddleware, orderController.updateOrder_status)

router.put('/device_/:id', authMiddleware, orderController.Device_Order_to_Basket)
router.delete('/:id', authMiddleware, orderController.delOne)


module.exports = router