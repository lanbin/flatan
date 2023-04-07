import BigNumber from 'bignumber.js';

export interface iCallback {
  (error?: Error): void;
}

export type iRuleValue = string | number;

export const PhoneRegExp = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
export const validatePhone = (rule: any, value: string, callback: iCallback) => {
  const reg = PhoneRegExp;
  if (reg.test(value) || value.length == 0) {
    callback();
  } else {
    callback(new Error('请输入正确的手机号'));
  }
};

export const EmailRegExp = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
export const validateEmail = (rule: any, value: string, callback: iCallback) => {
  const reg = EmailRegExp;
  if (reg.test(value)) {
    callback();
  } else {
    callback(new Error('请输入正确的邮箱'));
  }
};

export const IdentifyRegExp =
  /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$|^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/;
export const validateIdentityCard = (rule: any, value: iRuleValue, callback: iCallback) => {
  const reg = IdentifyRegExp;
  if (reg.test(value.toString())) {
    callback();
  } else {
    callback(new Error('请输入正确的身份证号'));
  }
};

// 数字 非必填
export const validateNumber = (rule: any, value: iRuleValue, callback: iCallback) => {
  if (value && isNaN(Number(value))) {
    callback(new Error('该项需填入数字'));
  } else {
    callback();
  }
};

// 数字 范围范围
export const intRange = ({ min = 0, max = 100, message = '' }) => {
  function checkInt(rule: any, value: iRuleValue, callback: iCallback) {
    // 不填就不填吧,填了的需要校验,必填字段需配合COMMON_RULE
    if ((!value && value !== 0) || typeof value == 'undefined') {
      callback();
    }
    if (value && isNaN(Number(value))) {
      callback(new Error('该项需填写数字'));
    } else if (
      new BigNumber(value).isGreaterThanOrEqualTo(min) &&
      new BigNumber(value).isLessThanOrEqualTo(max)
    ) {
      callback();
    } else {
      callback(new Error(message || `该项需填写${min}~${max}的数字`));
    }
  }
  return [{ validator: checkInt, trigger: 'change,blur' }];
};

// Password Length Range
export const PASSWORD_LEN_RANGE = {
  MIN: 6,
  MAX: 16,
};

// Normal Password
export const validatePassword = (rule: any, value: iRuleValue, callback: iCallback) => {
  const reg = new RegExp(`^[\\d\\w]{${PASSWORD_LEN_RANGE.MIN},${PASSWORD_LEN_RANGE.MAX}}$`);
  if (value && reg.test(value.toString())) {
    callback();
  } else {
    callback(new Error(`密码长度${PASSWORD_LEN_RANGE.MIN}-${PASSWORD_LEN_RANGE.MAX}位`));
  }
};

// Password
export const ComplicatedPasswordRegExp =
  /^(?![\d]+$)(?![a-zA-Z]+$)(?![!@#$%^&*()]+$)[\da-zA-Z!@#$%^&*()]{6,16}$/;
export const password = (rule: any, value: string, callback: iCallback) => {
  // Letters(Case Sensitivity) + NumSers + Special Characters
  const reg = ComplicatedPasswordRegExp;

  if (value && reg.test(value)) {
    callback();
  } else {
    callback(
      new Error(
        `密码长度${PASSWORD_LEN_RANGE.MIN}-${PASSWORD_LEN_RANGE.MAX}位，由字母、数字、符号，至少两种组合而成`,
      ),
    );
  }
};

export const strictValidatePassword = (rule: any, value: iRuleValue, callback: iCallback) => {
  // old version
  // const reg = /^(?![A-z]+$)(?![0-9]+$)(?![!@#$%^&*]+$)[A-z0-9!@#$%^&*]{8,20}$/;

  // 这个正则
  // 基本操作说明:
  // ?!exp 表示从当前锚点开始匹配不能是exp
  // ^ 通用的开头,表示从第一个字符开始就进行 exp 匹配
  //
  // 具体组成说明: 三个条件的两两组合,一共六种情况要排除, 剩下的就是至少是三个以上的条件组合
  // (?![A-z]+$) 表示整个字符串不能只有大小写字母
  // (?![A-Z0-9]+$) 表示整个字符串不能只有大写字母和数字
  // (?![A-Z\W_]+$) 表示整个字符串不能只有大写字母和特殊符号

  // (?![a-z0-9]+$) 表示整个字符串不能只有小写字母和数字
  // (?![a-z\W_]+$) 表示整个字符串不能只有小写字母和特殊符号

  // (?![0-9\W_]+$) 表示整个字符串不能只有数字和特殊符号
  //
  // 上面把不允许的条件都列好了,然后再给定字符串的范围
  // [a-zA-Z0-9\W]{8,20} 允许从这些字符里面选择字符组成长度为8到20的字符串

  const reg = new RegExp(
    `^(?![A-z]+$)(?![A-Z0-9]+$)(?![A-Z\\W_]+$)(?![a-z0-9]+$)(?![a-z\\W_]+$)(?![0-9\\W_]+$)[a-zA-Z0-9\\W_]{${PASSWORD_LEN_RANGE.MIN},${PASSWORD_LEN_RANGE.MAX}}$`,
  );

  if (value && reg.test(value.toString())) {
    callback();
  } else {
    callback(
      new Error(
        `密码长度${PASSWORD_LEN_RANGE.MIN}-${PASSWORD_LEN_RANGE.MAX}位，且需包含数字、大写字母、小写字母以及特殊字符中的三种`,
      ),
    );
  }
};

/**
 * 端口输入
 */
export const validatePort = (rule: any, value: string, callback: iCallback) => {
  const portList = value.split(',');
  let result = true;
  portList.forEach((p) => {
    if (!(/^\d+$/.test(p) && 1 <= Number(p) && Number(p) <= 65535)) {
      result = false;
    }
  });

  if (result) {
    callback();
  } else {
    callback(new Error('端口格式不对'));
  }
};

// First Letter Uppercase
export const FirstLetterUppercaseRegExp = /^[A-Z]{1}$/;
export const validateJhiInitial = (rule: any, value: string, callback: iCallback) => {
  if (FirstLetterUppercaseRegExp.test(value)) {
    callback();
  } else {
    callback(new Error('首字母必须为大写且长度为1位!'));
  }
};

/**
 * IP校验
 */
export const IPRegExp =
  /^((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})(\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3}$/;
export const validateIP = (rule: any, value: string, callback: iCallback) => {
  if (IPRegExp.test(value)) {
    callback();
  } else {
    callback(new Error('IP格式不正确!'));
  }
};

/**
 * N位小数验证
 *
 * _ 小数位
 */
export const floatPosition = (_: number) => {
  let decimal = _;
  if (isNaN(decimal)) {
    decimal = 2;
  }

  const reg = new RegExp(
    `^(([1-9][0-9]*)|(([0]\\.\\d{1,${decimal}}|[1-9][0-9]*\\.\\d{1,${decimal}})))$`,
  );

  function validate(rule: any, value: iRuleValue, callback: iCallback) {
    if (!value || reg.test(value.toString())) {
      callback();
    } else {
      callback(new Error(`最多精确到${decimal}位小数`));
    }
  }

  return [{ validator: validate, trigger: 'change,blur' }];
};

export const LetterNumberRegExp = /^[a-zA-Z0-9]+$/g;
export const letterNumber = (rule: any, value: string, callback: iCallback) => {
  if (!value || LetterNumberRegExp.test(value)) {
    callback();
  } else {
    callback(new Error('只能填写英文和数字'));
  }
};

export const lessThanOne = (rule: any, value: iRuleValue, callback: iCallback) => {
  if (
    new BigNumber(value).isGreaterThanOrEqualTo(0) &&
    new BigNumber(value).isLessThanOrEqualTo(1)
  ) {
    callback();
  } else {
    callback(new Error('只能填写0~1的数值'));
  }
};

export const totpCode = (rule: any, value: string, callback: iCallback) => {
  if (value && !isNaN(Number(value)) && value.toString().length == 6) {
    callback();
  } else {
    callback(new Error('口令码为 6 位数字'));
  }
};

/**
 * 通用的触发事件
 */
const RULE_TRIGGER = ['blur', 'change'];

export default {
  // 通用验证条件
  COMMON_RULE: (opt?: {}): Array<any> => {
    return [
      {
        message: '该项为必填项',
        type: 'string',
        required: true,
        trigger: RULE_TRIGGER,
        ...opt,
      },
    ];
  },

  // 深度验证
  DEEP_RULE: (opt?: {}) => {
    return { type: 'object', fields: {}, required: true, ...opt };
  },

  // Blur 验证
  BLUR_RULE: (opt?: {}) => {
    return [
      {
        message: '该项为必填项',
        type: 'string',
        required: true,
        trigger: 'blur',
        ...opt,
      },
    ];
  },

  // 长度限制
  LENGTH_RULE: (min: number, max: number = 20, message?: string) => [
    {
      min,
      max,
      message: message || `输入长度限制在${min == max ? min : [min, max].join('至')}个字符`,
      trigger: 'blur',
    },
  ],

  LETTER_NUM_RULE: [{ validator: letterNumber, trigger: 'blur' }],

  LESS_THAN_ONE: [{ validator: lessThanOne, trigger: 'blur' }],

  // 小数验证
  FLOAT_NUMBER_RULE: floatPosition,
  // 数字范围限制
  INT_RANGE: intRange,
  // 数组验证
  ARRAY_RULE: [
    {
      type: 'array',
      message: '该项是多项选择',
      trigger: RULE_TRIGGER,
    },
  ],
  // 数字验证
  NUMBER_RULE: [{ validator: validateNumber, trigger: RULE_TRIGGER }],
  // 端口验证
  PORT_RULE: [{ validator: validatePort, trigger: 'blur' }],
  // 邮箱
  EMAIL_RULE: [{ validator: validateEmail, trigger: 'blur' }],
  // IP
  IP_RULE: [{ validator: validateIP, trigger: 'blur' }],
  // 密码验证
  PASSWORD_RULE: [
    {
      validator: validatePassword,
      trigger: 'blur',
    },
  ],
  STRICT_PASSWORD_RULE: [
    {
      validator: strictValidatePassword,
      trigger: 'blur',
    },
  ],
  // 只有一个大写字母
  ONE_CAPITAL_RULE: [{ validator: validateJhiInitial, trigger: RULE_TRIGGER }],
  // 内容格式校验
  PHONE_RULE: [{ validator: validatePhone, trigger: RULE_TRIGGER }],
  IDCARD_RULE: [{ validator: validateIdentityCard, trigger: RULE_TRIGGER }],
  TOTP_RULE: [{ validator: totpCode, trigger: 'blur' }],
};

