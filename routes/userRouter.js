const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController.js')
const authMiddleware = require('../middleware/authMiddleware')
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware.js')
const checkMiddleware = require('../middleware/checkMiddleware.js')




router.post('/registration', userController.registration)
router.post('/promocode',authMiddleware, userController.create_promo)
router.post('/login', userController.login)
router.post('/login_0', userController.login_0)

router.get('/check',checkMiddleware, userController.check1)
router.get('/auth',authMiddleware, userController.check)
router.get('/admin',checkRoleMiddleware('ADMIN'), userController.check_admin)

router.get('/user_info', authMiddleware,userController.getAll)
router.delete('/:id',authMiddleware, userController.delOne)
router.get('/:id',authMiddleware, userController.getOne)
router.post('/message',authMiddleware, userController.postMessage)
router.get('/get_by_email/:id',authMiddleware, userController.getOneUserByEmail)

router.get('/get_promo/1',authMiddleware, userController.get_promo)
router.get('/get_promo/2',authMiddleware, userController.get_promo_2)
router.get('/get_promo/3',authMiddleware, userController.get_promo_3)
router.delete('/delpromo/:id',authMiddleware,userController.del_promo)



router.post('/create_love',authMiddleware, userController.create_love_item)
router.get('/get_love/2',authMiddleware, userController.get_love_item)
router.get('/get_loveone/1',authMiddleware, userController.get_love_item_one)
router.delete('/del_loveone/1', authMiddleware,userController.del_love_item_one)


router.put('/email/:id',authMiddleware, userController.updateUserEmail)
router.put('/FIO/:id', authMiddleware,userController.updateUserFIO)
router.put('/Phone/:id', authMiddleware,userController.updateUserPhone)
router.put('/status/:id',authMiddleware, userController.updateUserStatus)

module.exports = router 