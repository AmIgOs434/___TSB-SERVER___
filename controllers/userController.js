
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User, Basket,BasketDevice, Promo, love_item} = require('../models/models')
const ApiError = require('../error/ApiError');
const nodemailer = require('nodemailer');
const e = require('express');

let transporter = nodemailer.createTransport({
     
  host: 'smtp.mail.ru',
  port:465,
  secure : true,
  auth: {
      user: 'the_same_baze@mail.ru',
      pass: 'CKeS7rA7DFD0ahsTFTdZ'
  }
});

const sendSMS = async(email,tema,kod) => {
  await transporter.sendMail({
    from: 'the_same_baze@mail.ru',
    to: email,
    subject : tema,
    text: "Ваш код подтверждения: " + kod,
  })
}

const generateJwt = (id, email, role) => {
    return jwt.sign(
        {id, email, role},
        process.env.SECRET_KEY,
        {expiresIn: "24h"}
    )
}

const generateJwt_0 = (id,ip,date) => {
    return jwt.sign(
        {id,ip, date},
        process.env.SECRET_KEY,
        {expiresIn: "24h"}
    )
}
const randomNumberInRange = (min, max) => {
    return Math.floor(Math.random() 
            * (max - min + 1)) + min;
};
class userController {
    async registration(req, res, next) {
        const {email, password, role , ip, date} = req.body
        
        const id = randomNumberInRange(10000000000, 99999999999)

        if(date){
            const user = await User.create({id,ip, date})
            const basket = await Basket.create({userId: id})
            const token = generateJwt_0(id,user.ip, user.date)
            return res.json({token})
        }else{
            if (!email || !password) {
                return next(ApiError.badRequest('Некорректный email или password'))
            }
            const candidate = await User.findOne({where: {email}})
            if (candidate) {
                return next(ApiError.badRequest('Пользователь с таким email уже существует'))
            }
            const hashPassword = await bcrypt.hash(password, 5)
            
            const user = await User.create({id,email, role, password: hashPassword})
            const basket = await Basket.create({userId: id})
            const token = generateJwt(id, user.email, user.role)
            return res.json({token})
        }

        
    }



    async registration_0(req, res, next) {
        
        const {ip, date} = req.body
        const user_0 = await User.create({ip, date})
        const basket = await Basket.create({userId: user_0.id})
        const token = generateJwt_0(user_0.ip, user_0.date)
        return res.json({token})
    }



    async login(req, res, next) {
        const {email, password} = req.body
        const user = await User.findOne({where: {email}})
        if (!user) {
            return next(ApiError.internal('Пользователь не найден'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return next(ApiError.internal('Указан неверный пароль'))
        }
        const token = generateJwt(user.id, user.email, user.role)
        return res.json({token})
    }

    async login_0(req, res, next) {
        const {email,date } = req.body
        const user = await User.findOne({where: {email}})
        if(user===null){
            return res.json({user})
        }else{
        const token = generateJwt(user.id, user.email, date)
        return res.json({token})
        }   
      
    }

    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.email, req.user.role)
        return res.json({token})
    }
    async check1() {
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjkwNTk4MjY2NDMwIiwiZW1haWwiOiJhbWlnb3NAZ21haWwucnUiLCJyb2xlIjoiVVNFUiIsImlhdCI6MTY4OTQ4NTYzOCwiZXhwIjoxNjg5NTcyMDM4fQ.Zp4b-wwSHCauJ_vpv4YvjB9ElXfFUo9wNWKYlPxXyXc'
        const token1 = jwt.verify(token, process.env.SECRET_KEY)
        return (token1)
    }
        async check_admin(req, res, next) {
        const token = generateJwt(req.user.id, req.user.email, req.user.role)
        return res.json({token})
    }

    async getAll(req, res) {
        const users = await User.findAll()
        return res.json(users)
    }
    
    

    async create_love_item(req, res) {
        const { deviceId, userId } = req.body
        const user = await love_item.create(
            {
                 deviceId, userId
            }
        )
        return res.json(user)
    }
    async get_love_item(req, res) {
        const promo = await love_item.findAll(
            {
                where:
                {
                    userId:req.query.userId ,
                },
            },
        )
        return res.json(promo)
    }

    

    async del_love_item_one(req, res) {
        const promo = await love_item.destroy(
            {
                where:
                {
                    deviceId:req.query.deviceId  ,
                    userId:req.query.userId ,
                },
            },
        )
        return res.json(promo)
    }

    async get_love_item_one(req, res) {
        const promo = await love_item.findOne(
            {
                where:
                {
                    deviceId:req.query.deviceId  ,
                    userId:req.query.userId ,
                },
            },
        )
        return res.json(promo)
    }





    async create_promo(req, res) {
        const {quantity, skidka, identific } = req.body
        const user = await Promo.create(
            {
                quantity, skidka, identific
            }
        )
        return res.json(user)
    }

    async get_promo(req, res) {
        const promo = await Promo.findAll()
        return res.json(promo)
    }

    async get_promo_3(req, res) {
        const promo = await Promo.findOne({
            where:{
                identific:req.query.identific
            }
        })
        return res.json(promo)
    }
    
    async get_promo_2(req, res) {
     
        const promo = await Promo.findOne({
            where:{
                identific:req.query.identific
            }
        })

        if(promo!==null){
            if(promo.quantity!==0){
                let user = await User.update(
                    {
                        promocode:promo.identific,
                    },
                
                    
                    {
                        where: {id:req.query.id} 
                    }
                    
                    )
                    let pro = await Promo.update(
                        {
                            quantity:promo.quantity-1,
                        },
                    
                        
                        {
                            where: {id:promo.id} 
                        }
                        
                        )
    
    
                return res.json(promo)
            }else{
                return res.json('Превышено количество активаций промокода')
            }
            
        }
        
        return res.json(promo)
    }


    async del_promo(req, res) {
        const {id} = req.params
        const promo = await Promo.destroy(
            {
                where:{id:id},
            },
        )
        return res.json(promo)
    }
    

    async getOne(req, res) {
        const {id} = req.params
        const user = await User.findOne(
            {
                where: {id},
            },
        )
        return res.json(user)
    }
    
    async getOneUserByEmail(req, res) {
     
        const user = await User.findOne(
            {
                where: {email:req.query.email},
            },
        )
        return res.json(user)
    }
    

    async postMessage(req, res) {
        const {email,tema,kod} = req.body
       const sms = await sendSMS(email,tema,kod)
        return res.json(sms)
    }



    async getBasket(req, res) {
        const {id} = req.params
        const user = await Basket.findOne(
            {
                where: {id},
            },
        )
        return res.json(user)
    }

    async delOne (req, res) {
        try {
          const { id } = req.params;
          const deletedProduct1 = await Basket.destroy({
            where: { userId: id },
          });
          const deletedProduct = await User.destroy({
            where: { id: id },
          });
      
          if (deletedProduct,deletedProduct1) {
            return res.status(204).send('Product deleted successfully ');
          }
      
          throw new Error('Product not found');
        } catch (error) {
          return res.status(500).send(error.message);
        }
      };

      async createBasketDevice(req, res) {
        
        let {count} = req.body
        const basketDevice = await BasketDevice.create({count})

        return res.json(basketDevice)
    }


    async updateUserEmail (req, res) {
        const {id} = req.params
        const {email} = req.body

        const user =  await User.update(
        {
            email:email ,
        
    
        },
    
        
        {
            where: {id} 
        }
        
        )
    
        if (user) {
            return res.status(206).send('Product updated successfully ');
          }throw new Error('Product not found');
        } catch (error) {
          return res.status(500).send(error.message);
    }
        
    

    
    async updateUserFIO (req, res) {
        const {id} = req.params
        const user =  await User.update(
        {

         
            FIO: req.body.FIO,

    
    
        },
    
        
        {
            where: {id} 
        }
        
        )
    
        if (user) {
            return res.status(206).send('Product updated successfully ');
          }throw new Error('Product not found');
        } catch (error) {
          return res.status(500).send(error.message);
    }
        

    
    async updateUserPhone (req, res) {
        const {id} = req.params
        const user =  await User.update(
        {

           
            phone: req.body.phone,

    
    
        },
    
        
        {
            where: {id} 
        }
        
        )
    
        if (user) {
            return res.status(206).send('Product updated successfully ');
          }throw new Error('Product not found');
        } catch (error) {
          return res.status(500).send(error.message);
    }
        
    async updateUserStatus(req, res) {
        const {id} = req.params
        const user =  await User.update(
        {
            status: 'confirmed',
        },
    
        
        {
            where: {id} 
        }
        
        )
    
        if (user) {
            return res.status(206).send('Product updated successfully ');
          }throw new Error('Product not found');
        } catch (error) {
          return res.status(500).send(error.message);
    }
}

module.exports = new userController()