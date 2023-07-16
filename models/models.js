const sequelize = require('../db')
const {DataTypes} = require('sequelize')


const User = sequelize.define('user', {
    id: {type: DataTypes.BIGINT, primaryKey: true},
    promocode:{type: DataTypes.STRING},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
    ip: {type: DataTypes.STRING},
    date: {type: DataTypes.STRING},
    FIO: {type: DataTypes.STRING},
    adress: {type: DataTypes.STRING},
    phone: {type: DataTypes.STRING},
    status: {type: DataTypes.STRING,defaultValue: "Не подтверждён"},
})



const Promo = sequelize.define('promocode', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    identific:{type: DataTypes.STRING, allowNull: false},
    skidka: {type: DataTypes.INTEGER,defaultValue: 0 },
    quantity:{type: DataTypes.INTEGER,defaultValue: 0 },
})

const Basket = sequelize.define('basket', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}, 
    final_price: {type: DataTypes.INTEGER,defaultValue: 0 },
    cou:{type: DataTypes.INTEGER,defaultValue: 0 },
})

const BasketDevice = sequelize.define('basket_device', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name:{type: DataTypes.STRING},
    quantity:{type: DataTypes.INTEGER,defaultValue: 1},
    orderId:{type: DataTypes.INTEGER},
    final_price:{type: DataTypes.INTEGER},
    size:{type: DataTypes.STRING},
    color:{type: DataTypes.STRING},
    status:{type: DataTypes.INTEGER,defaultValue: 1},
    colorId:{type: DataTypes.STRING},
    sizeId:{type: DataTypes.INTEGER,},
    img:{type: DataTypes.STRING}
  
})


const Size = sequelize.define('size', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name:{type: DataTypes.STRING, allowNull: false},
    color_Id:{type: DataTypes.INTEGER, allowNull: false},
    
})




const Device = sequelize.define('device', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    price: {type: DataTypes.INTEGER, allowNull: false},
    description:{type: DataTypes.STRING}


})

const Type = sequelize.define('type', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})

const Color = sequelize.define('color', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})



const DeviceInfo = sequelize.define('device_info', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false},
})
const DeviceSize = sequelize.define('device_size', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    size: {type: DataTypes.STRING, allowNull: false},
})

const SizeColor = sequelize.define('size_color', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    color:{type: DataTypes.STRING, allowNull: false},

    img1:{type: DataTypes.STRING, allowNull: false},
    img2:{type: DataTypes.STRING, allowNull: false},
    img3:{type: DataTypes.STRING, allowNull: false},
    img4:{type: DataTypes.STRING, allowNull: false},
    img5:{type: DataTypes.STRING, allowNull: false},
    img6:{type: DataTypes.STRING, allowNull: false},

    img7:{type: DataTypes.STRING, allowNull: false},
    img8:{type: DataTypes.STRING, allowNull: false},
    img9:{type: DataTypes.STRING, allowNull: false},
    img10:{type: DataTypes.STRING, allowNull: false},

    quantity:{type: DataTypes.INTEGER, allowNull: false},
})

const TypeColor = sequelize.define('type_color', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const Order = sequelize.define('order', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}, 
    FIO:{type: DataTypes.STRING, allowNull: false},
    address:{type: DataTypes.STRING, allowNull: false},
    final_price: {type: DataTypes.INTEGER, allowNull: false},
    email: {type: DataTypes.STRING, allowNull: false},
    phone: {type: DataTypes.STRING, allowNull: false},
    user :{type: DataTypes.BIGINT, allowNull: false},
    status: {type: DataTypes.STRING, allowNull: false, defaultValue: "Заказ ожидает оплаты  "},
    comment: {type: DataTypes.STRING}, 
    quantity: {type: DataTypes.INTEGER}, 
})

const Glav_str = sequelize.define('glav_str', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    video: {type: DataTypes.STRING,  allowNull: false},
    photo1: {type: DataTypes.STRING,  allowNull: false},
    photo2: {type: DataTypes.STRING,  allowNull: false},
    photo3: {type: DataTypes.STRING,  allowNull: false},
    photo4: {type: DataTypes.STRING,  allowNull: false},
    photo5: {type: DataTypes.STRING,  allowNull: false},
    photo6: {type: DataTypes.STRING,  allowNull: false},
})


const love_item = sequelize.define('love_item', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    deviceId: {type: DataTypes.STRING,  allowNull: false},
    userId: {type: DataTypes.BIGINT,  allowNull: false},
})




Device.hasMany(Size)
Size.belongsTo(Device)

User.hasOne(Basket)
Basket.belongsTo(User)

Type.hasMany(Device)
Device.belongsTo(Type)

Basket.hasMany(BasketDevice)
BasketDevice.belongsTo(Basket)

Device.hasMany(BasketDevice)
BasketDevice.belongsTo(Device)


DeviceSize.hasMany(SizeColor, {as: 'color'});
SizeColor.belongsTo(DeviceSize)

Device.hasMany(DeviceSize, {as: 'size'});
DeviceSize.belongsTo(Device)

Device.hasMany(DeviceInfo, {as: 'info'});
DeviceInfo.belongsTo(Device)

Type.belongsToMany(Color, {through: TypeColor })
Color.belongsToMany(Type, {through: TypeColor })

module.exports = {
    love_item,
    Glav_str,
    SizeColor,
    Promo,
    Order,
    User,
    Basket,
    BasketDevice,
    Device,
    DeviceInfo,
    TypeColor,
    Color,
    Type,
    DeviceSize,

}
