const uuid = require('uuid')
const path = require('path');
const {Device,DeviceInfo,DeviceSize,BasketDevice, Basket,User, SizeColor, Order, Glav_str} = require('../models/models')
const ApiError = require('../error/ApiError');

class deviceController {
    async create(req, res, next) {
        try {
            let {name, price, typeId, info,description} = req.body


            const device = await Device.create({name,price ,typeId,description});

    
            if (info) {
                info = JSON.parse(info)
                info.forEach(i =>
                    DeviceInfo.create({
                        title: i.title,
                        description: i.description,
                        deviceId: device.id
                    })
                )
            }
            return res.json(device)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }


    async create_Size_Color(req, res, next) {
        try {
            let {size,deviceId,color} = req.body
            

            const device_size = await DeviceSize.create({size,deviceId});

    
            if (color) {
                color = JSON.parse(color)
                color.forEach(i =>
                    SizeColor.create({
                        color: i.color,

                        img1: i.img1,
                        img2: i.img2,
                        img3: i.img3,
                        img4: i.img4,
                        img5: i.img5,
                        img6: i.img6,

                        img7: i.img7,
                        img8: i.img8,
                        img9: i.img9,
                        img10: i.img10,

                        quantity: i.quantity,
                        deviceSizeId: device_size.id
                    })
                )
            }
            return res.json(device_size)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }





    async getAll(req, res) {
        let {colorId, typeId, limit, page} = req.query
        page = page || 210
        limit = limit || 30
        let offset = page * limit - limit
        let devices; 
        if (!colorId && !typeId) {
            devices = await Device.findAndCountAll({limit, offset})
        }
        if (colorId && !typeId) {
            devices = await Device.findAndCountAll({where:{colorId}, limit, offset})
        }
        if (!colorId && typeId) {
            devices = await Device.findAndCountAll({where:{typeId}, limit, offset})
        }
        if (colorId && typeId) {
            devices = await Device.findAndCountAll({where:{typeId, colorId}, limit, offset})
        }

        if (0  && 0) {
            devices = await Device.findAndCountAll({ limit, offset})
        }
        return res.json(devices)
    }

    async getOneSize(req, res) {
      
   
   
        const deviceSize = await DeviceSize.findOne(
            {
                where: {   
                    size:req.query.size,
                    deviceId:req.query.deviceId,
                },
            },
        )
        return res.json(deviceSize)
    }

    async getSizeColor(req, res) {
      
        const {id} = req.params
        const colors = await SizeColor.findAll(
          
            {
                where: {deviceSizeId:id}
            }
        )
        return res.json(colors)
    }





    async getOne(req, res) {
        const {id} = req.params
        const device = await Device.findOne(
            {
                where: {id},
                include: [{model: DeviceInfo, as: 'info'},{model: DeviceSize, as: 'size'}],
                
            }
        )
        return res.json(device)
    }

    

    async getDeviceInfo(req, res) {
        const {id} = req.params
        const device = await DeviceSize.findAll(
            {
                where: {deviceId:id},
            },
        )
        return res.json(device)
    }
    async getOneDeviceInfo(req, res) {
        const {id} = req.params
        const device = await DeviceSize.findOne(
            {
                where: {deviceId:id},
            },
        )
        return res.json(device)
    }

    async getAll_(req, res) {
        const {id} = req.params
        const device = await Device.findAll(
            {
                where: {id},
                include: [{model: DeviceInfo, as: 'info'},{model: DeviceSize, as: 'size'}],
              
            },
        )
        return res.json(device)
    }
    
    async getAll1(req, res) {
        const device = await Device.findAll()
        return res.json(device)
    }


async updateOneBasket (req, res) {
    const {id} = req.params
    const basket =  await Basket.update(
    {
        final_price: req.body.final_price,
        cou:req.body.cou,
    },
    {
        where: {id} 
    }
    
    )

    if (basket) {
        return res.status(206).send('Basket updated successfully ');
      }throw new Error('Product not found');
    } catch (error) {
      return res.status(500).send(error.message);
}



async updateOne (req, res) {
    const {id} = req.params
    const device =  await Device.update(
    {
        name: req.body.name,
        quantity:req.body.quantity,
        price: req.body.price,

        typeId: req.body.typeId,


    },

    
    {
        where: {id} 
    }
    
    )

    if (device) {
        return res.status(206).send('Product updated successfully ');
      }throw new Error('Product not found');
    } catch (error) {
      return res.status(500).send(error.message);
}


async updateOneColor (req, res) {
    const {id} = req.params
    const device =  await SizeColor.update(
    {
        color: req.body.color,
        quantity:req.body.quantity,


    },

    
    {
        where: {id} 
    }
    
    )

    if (device) {
        return res.status(206).send('Product updated successfully ');
      }throw new Error('Product not found');
    } catch (error) {
      return res.status(500).send(error.message);
}

async getoneColor(req, res) {
      
    const {id} = req.params
    const colors = await SizeColor.findOne(
      
        {
            where: {id}
        }
    )
    return res.json(colors)
}


async updateQuantity (req, res) {
    const {id} = req.params
    const quantity =  req.body.quantity

    const device1 = await SizeColor.findOne(
        {
            where: {id},
        }
    )
    const quant = device1.quantity
    const device =  await SizeColor.update(
    {
        quantity: quant-quantity
    },

    
    {
        where: {id} 
    }
    
    )

    if (device) {
        return res.status(206).send('Product updated successfully ');
      }throw new Error('Product not found');
    } catch (error) {
      return res.status(500).send(error.message);
}


async createBasketDevice(req, res) {
        
    const {basketId,deviceId,quantity,final_price,color,colorId,size,sizeId,status,name,img} = req.body
    const basketDevice = await BasketDevice.create({basketId,deviceId,quantity,color,sizeId,colorId,final_price,size,status,name,img})

    return res.json(basketDevice)
}



async createGlavStr(req, res) {
        
    const {video,photo1,photo2,photo3,photo4,photo5,photo6} = req.body
    const basketDevice = await Glav_str.create({video,photo1,photo2,photo3,photo4,photo5,photo6})

    return res.json(basketDevice)
}



async putGlavStr (req, res) {
    const {id} = req.params

    const basket =  await Glav_str.update(
    {
        video: req.body.video,
        photo1:req.body.photo1,
        photo2:req.body.photo2,
        photo3:req.body.photo3,
        photo4:req.body.photo4,
        photo5:req.body.photo5,
        photo6:req.body.photo6,
    },
    {
        where :{ 
                id
               }
    }
    
    )

    if (basket) {
        return res.status(206).send('Basket updated successfully ');
      }throw new Error('Product not found');
    } catch (error) {
      return res.status(500).send(error.message);
}


async getGlavStr(req, res) {
    const {id} = req.params
    const basketDevice = await Glav_str.findOne(
        {
            where : {id}
        }
    )

    return res.json(basketDevice)
}


async deleteBasketDevice (req, res) {
    try {
      const { id } = req.params;
      const deletedProduct1 = await BasketDevice.destroy({
        where: { id: id },
      });

  
      if (deletedProduct1) {
        return res.status(204).send('Product deleted successfully ');
      }
  
      throw new Error('Product not found');
    } catch (error) {
      return res.status(500).send(error.message);
    }
  };
async getAllBasketDevice(req, res) {
    const {id} = req.params
    const basketDevice = await BasketDevice.findAll(
        {
            where : {basketId : id}
        }
    )

    return res.json(basketDevice)
}


async getAllBasketDevice_order(req, res) {
    const {id} = req.params
    const basketDevice = await BasketDevice.findAll(
        {
            where : {orderId : id}
        }
    )

    return res.json(basketDevice)
}

async getAllBasketDevice_(req, res) {
    const basketDevice = await BasketDevice.findAll()
    return res.json(basketDevice)
}

async getOneBasketDevice(req, res) {
    const {id} = req.params
    const basketDevice = await BasketDevice.findOne(
        {
            where : {id:id},
            
        }
    )
    return res.json(basketDevice)
}

async getOneBasketDeviceID(req, res) {
    const {id} = req.params
    const basketDevice = await BasketDevice.findOne(
        {
            where : {
                deviceId:id,
                status:1,
              
            }
        }
    )
    return res.json(basketDevice)
}

async getOneBasketDeviceID_2(req, res) {
    const {id} = req.params
    const basketDevice = await BasketDevice.findOne(
        {
            where : {
                basketId:req.query.basketId ,
                deviceId:id,
                status:1,
                sizeId:req.query.sizeId 
            }
        }
    )
    return res.json(basketDevice)
}
async getOneBasketDeviceID_3(req, res) {
    const {id} = req.params
    const basketDevice = await BasketDevice.findOne(
        {
            where : {   
                basketId:req.query.basketId ,
                deviceId:id,
                status:1,
                color:req.query.color,
                sizeId:req.query.sizeId
            }
        }
    )
    return res.json(basketDevice)
}


async updateOneBasketDevice (req, res) {
    const {id} = req.params
    const basket =  await BasketDevice.update(
    {
        quantity: req.body.quantity,
        final_price:req.body.final_price
    },
    {
        where :{ 
                  deviceId: id,
                  sizeId:req.body.sizeId,
                  color:req.body.color
               }
    }
    
    )

    if (basket) {
        return res.status(206).send('Basket updated successfully ');
      }throw new Error('Product not found');
    } catch (error) {
      return res.status(500).send(error.message);
}

async getOneBasket(req, res) {
    const {id} = req.params
    const basket = await Basket.findOne(
        {
            where :{ userId: id }
        }   
    )
    
    return res.json(basket)
}



async deleteOneBasketDevice (req, res) {
    try {
      const { id } = req.params;
      const deletedProduct = await BasketDevice.destroy({
        where :{ colorId: id }    
      });
  
      if (deletedProduct) {
        return res.status(204).send('Product deleted successfully ');
      }
  
      throw new Error('Product not found');
    } catch (error) {
      return res.status(500).send(error.message);
    }
  };


 async delOne (req, res) {
    try {
      const { id } = req.params;
  
      const deletedProduct = await Device.destroy({
        where: { id: id },
      });
  
      if (deletedProduct) {
        return res.status(204).send('Product deleted successfully ');
      }
  
      throw new Error('Product not found');
    } catch (error) {
      return res.status(500).send(error.message);
    }
  };
    
}

module.exports = new deviceController()