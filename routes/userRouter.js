const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController.js')
const authMiddleware = require('../middleware/authMiddleware')
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware.js')




router.post('/registration', userController.registration)
router.post('/promocode', userController.create_promo)
router.post('/login', userController.login)
router.post('/login_0', userController.login_0)


router.get('/auth',authMiddleware, userController.check)
router.get('/auth',checkRoleMiddleware, userController.check_admin)

router.get('/user_info', userController.getAll)
router.delete('/:id', userController.delOne)
router.get('/:id', userController.getOne)
router.post('/message', userController.postMessage)
router.get('/get_by_email/:id', userController.getOneUserByEmail)

router.get('/get_promo/1', userController.get_promo)
router.get('/get_promo/2', userController.get_promo_2)
router.get('/get_promo/3', userController.get_promo_3)
router.delete('/delpromo/:id', userController.del_promo)


router.post('/create_love', userController.create_love_item)
router.get('/get_love/2', userController.get_love_item)
router.get('/get_loveone/1', userController.get_love_item_one)
router.delete('/del_loveone/1', userController.del_love_item_one)


router.put('/email/:id', userController.updateUserEmail)
router.put('/FIO/:id', userController.updateUserFIO)
router.put('/Phone/:id', userController.updateUserPhone)
router.put('/status/:id', userController.updateUserStatus)

module.exports = router 