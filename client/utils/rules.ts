import isEmailValidator from 'validator/lib/isEmail'
import isLowercaseValidator from 'validator/lib/isLowercase'

interface BaseRuleOption {
  message?: string
}

export function isRequired(options: BaseRuleOption = {}) {
  return value => Boolean(value) || options.message || '请输入内容'
}

export function isEmail(options: BaseRuleOption = {}) {
  return value => isEmailValidator(value) || options.message || '邮箱格式错误'
}

export function isLowercase(options: BaseRuleOption = {}) {
  return value => isLowercaseValidator(value) || options.message || '必须为小写字母'
}
