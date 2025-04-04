const { body, validationResult } = require("express-validator");

const userValidationRules = () => {
    return[
        body("name").notEmpty().withMessage("اسم المستخدم مطلوب"),
        body("email").notEmpty().withMessage("البريد الالكتروني مطلوب"),
        body("password").notEmpty().withMessage("كلمة المرور مطلوبة"),
        body("password").isLength({min:5}).withMessage("يجب الا تقل كلمة المرور عن 5 محارف"),
        body("confPassword").notEmpty().withMessage("كلمة المرور مطلوبة"),

    ]
}

const updateUserValidationRules = () => {
    return[
        body("email").notEmpty().withMessage("البريد الالكتروني مطلوب"),
        body("password").notEmpty().withMessage("كلمة المرور مطلوبة"),
        body("password").isLength({min:5}).withMessage("يجب الا تقل كلمة المرور عن 5 محارف")

    ]
}

const eventValidationRules = () => {
    return[
        body("title").notEmpty().withMessage("ادخل عنوان"),
        body("description").notEmpty().withMessage("ادخل الوصف"),
        body("price").notEmpty().withMessage("حقل السعر فارغ"),
    ]
}

const validate = (req,res,next) => {

    const errors = validationResult(req)
    
    if (errors.isEmpty()) {
        return next()
    }
    return res.status(400).json({errors:errors.array() })
}
module.exports = {
    userValidationRules,
    updateUserValidationRules,
    eventValidationRules,
    validate
}