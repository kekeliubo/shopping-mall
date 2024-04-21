import Vue from 'vue'
import VeeValidate from 'vee-validate'
import En from 'vee-validate/dist/locale/en'   // 引入英文 message

Vue.use(VeeValidate)

//表单验证
VeeValidate.Validator.localize('zh_CN', {
    messages: {
    ...En.messages,
    is: (field) => `${field}必须与密码相同` // 修改内置规则的 message，让确认密码和密码相同
    },
    attributes: { // 给校验的 field 属性名映射中文名称
    phone: 'phone number',
    code: 'verification code',
    password:'password',
    password1:'confirm password',
    agree:'protocol'
    }
    })

//自定义校验规则
//定义协议必须打勾同意
VeeValidate.Validator.extend('agree', {
    validate: value => {
    return value
    },
    getMessage: field => field + 'Must agree'
    })