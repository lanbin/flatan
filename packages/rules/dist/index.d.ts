export interface iCallback {
    (error?: Error): void;
}
export type iRuleValue = string | number;
export declare const PhoneRegExp: RegExp;
export declare const validatePhone: (rule: any, value: string, callback: iCallback) => void;
export declare const EmailRegExp: RegExp;
export declare const validateEmail: (rule: any, value: string, callback: iCallback) => void;
export declare const IdentifyRegExp: RegExp;
export declare const validateIdentityCard: (rule: any, value: iRuleValue, callback: iCallback) => void;
export declare const validateNumber: (rule: any, value: iRuleValue, callback: iCallback) => void;
export declare const intRange: ({ min, max, message }: {
    min?: number | undefined;
    max?: number | undefined;
    message?: string | undefined;
}) => {
    validator: (rule: any, value: iRuleValue, callback: iCallback) => void;
    trigger: string;
}[];
export declare const PASSWORD_LEN_RANGE: {
    MIN: number;
    MAX: number;
};
export declare const validatePassword: (rule: any, value: iRuleValue, callback: iCallback) => void;
export declare const ComplicatedPasswordRegExp: RegExp;
export declare const password: (rule: any, value: string, callback: iCallback) => void;
export declare const strictValidatePassword: (rule: any, value: iRuleValue, callback: iCallback) => void;
/**
 * 端口输入
 */
export declare const validatePort: (rule: any, value: string, callback: iCallback) => void;
export declare const FirstLetterUppercaseRegExp: RegExp;
export declare const validateJhiInitial: (rule: any, value: string, callback: iCallback) => void;
/**
 * IP校验
 */
export declare const IPRegExp: RegExp;
export declare const validateIP: (rule: any, value: string, callback: iCallback) => void;
/**
 * N位小数验证
 *
 * _ 小数位
 */
export declare const floatPosition: (_: number) => {
    validator: (rule: any, value: iRuleValue, callback: iCallback) => void;
    trigger: string;
}[];
export declare const LetterNumberRegExp: RegExp;
export declare const letterNumber: (rule: any, value: string, callback: iCallback) => void;
export declare const lessThanOne: (rule: any, value: iRuleValue, callback: iCallback) => void;
export declare const totpCode: (rule: any, value: string, callback: iCallback) => void;
declare const _default: {
    COMMON_RULE: (opt?: {}) => Array<any>;
    DEEP_RULE: (opt?: {}) => {
        type: string;
        fields: {};
        required: boolean;
    };
    BLUR_RULE: (opt?: {}) => {
        message: string;
        type: string;
        required: boolean;
        trigger: string;
    }[];
    LENGTH_RULE: (min: number, max?: number, message?: string) => {
        min: number;
        max: number;
        message: string;
        trigger: string;
    }[];
    LETTER_NUM_RULE: {
        validator: (rule: any, value: string, callback: iCallback) => void;
        trigger: string;
    }[];
    LESS_THAN_ONE: {
        validator: (rule: any, value: iRuleValue, callback: iCallback) => void;
        trigger: string;
    }[];
    FLOAT_NUMBER_RULE: (_: number) => {
        validator: (rule: any, value: iRuleValue, callback: iCallback) => void;
        trigger: string;
    }[];
    INT_RANGE: ({ min, max, message }: {
        min?: number | undefined;
        max?: number | undefined;
        message?: string | undefined;
    }) => {
        validator: (rule: any, value: iRuleValue, callback: iCallback) => void;
        trigger: string;
    }[];
    ARRAY_RULE: {
        type: string;
        message: string;
        trigger: string[];
    }[];
    NUMBER_RULE: {
        validator: (rule: any, value: iRuleValue, callback: iCallback) => void;
        trigger: string[];
    }[];
    PORT_RULE: {
        validator: (rule: any, value: string, callback: iCallback) => void;
        trigger: string;
    }[];
    EMAIL_RULE: {
        validator: (rule: any, value: string, callback: iCallback) => void;
        trigger: string;
    }[];
    IP_RULE: {
        validator: (rule: any, value: string, callback: iCallback) => void;
        trigger: string;
    }[];
    PASSWORD_RULE: {
        validator: (rule: any, value: iRuleValue, callback: iCallback) => void;
        trigger: string;
    }[];
    STRICT_PASSWORD_RULE: {
        validator: (rule: any, value: iRuleValue, callback: iCallback) => void;
        trigger: string;
    }[];
    ONE_CAPITAL_RULE: {
        validator: (rule: any, value: string, callback: iCallback) => void;
        trigger: string[];
    }[];
    PHONE_RULE: {
        validator: (rule: any, value: string, callback: iCallback) => void;
        trigger: string[];
    }[];
    IDCARD_RULE: {
        validator: (rule: any, value: iRuleValue, callback: iCallback) => void;
        trigger: string[];
    }[];
    TOTP_RULE: {
        validator: (rule: any, value: string, callback: iCallback) => void;
        trigger: string;
    }[];
};
export default _default;
