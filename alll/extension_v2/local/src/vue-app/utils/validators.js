import {helpers, required, sameAs} from '@vuelidate/validators';

export const required$ = helpers.withMessage('This field is required', required)

export const containsPasswordRequirement = helpers.withMessage(
    () => `The password requires an uppercase, lowercase, number and special character`,
    (value) => /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/.test(value)
)