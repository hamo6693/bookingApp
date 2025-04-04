const models = require("../models")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

exports.register = async(req,res) => {
    const {name,email,password,confPassword } = req.body
    try{
        const hashPassword = await bcrypt.hash(password,10)
        const findEmail = await models.User.findOne({where:{email}})
        if(findEmail === null && password === confPassword) {
            //انشاء مستخدم
        const user = await models.User.create({
            name,
            email,
            password:hashPassword,
            confPassword: hashPassword,
        })
        res.status(200).json({message:"تم انشاء الحساب بنجاح"})
    }else{
        res.status(401).json({message:"خطا في البريد الالكتروني او كلمة المرور"})
    }
    }catch(e){
        res.status(500).json(e.message)
    } 
}


exports.login = async(req,res) => {
    const {email,password} = req.body    
    try{
        user = await models.User.findOne({where:{email}})
        if(user === null) {
            res.status(401).json({message:"خطا في المعلومات المدخلة"})
        } else {
            const pass = await bcrypt.compare(password,user.password)
            if(pass) {
                const token = jwt.sign({id:user.id,email:user.email},process.env.JWT)
                res.status(200).json({accessToken:token})
            } else{
                res.status(401).json({message:"خطا في المعلومات المدخلة"})
            }
        }
    }catch(e){
        res.status(500)
    }
}

exports.getName = async(req,res) => {
    try{
        const getName = await models.User.findOne(
            {where:{id:req.currentUser.id},
            attributes:{exclude:["id","password","confPassword"]}

        })
        res.status(200).json(getName)
    }catch{
        res.status(500).json(e.message)

    }
}

exports.updateProfile = async (req,res) => {
    const {name,password} = req.body
    try{
        const hashPassword = await bcrypt.hash(password,10)
        const update = await models.User.update({
            name,
            password:hashPassword
        },
        {
            where:{id:req.currentUser.id}
        }
        );
        res.status(200).json({message:"تم تعديل البيانات"})
    }catch(e){
        res.status(500).json(e)
    }
}


exports.uploadUserPhoto = async(req,res) => {
    const url = req.protocol + "://" + req.get("host")
    try{
        const uploadPhoto = await models.User.update(
            //req file
            //الوصول الى الملفات داخل الطلب
            {
                img_uri:url + "/public/images/" + req.file.filename
            },

            {where:{id:req.currentUser.id}}
        );
        res.status(200).json({message:"تم اضافة الصورة بنجاح"})
    }catch(e){
        res.status(500).json(e)
    }
}