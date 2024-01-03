const AuthResource = {
    login: () => ({
        path: "/auth/login",
        // type: RESOURCE_TYPE.PUBLIC_TYPE
    }),
    signUp: () => ({
        path: "/auth/sign-up"
    }),
    verifyEmail: () => ({
        path: "/auth/verify-email"
    }),
    sendVerifyEmail: () => ({
        path: "/auth/send-verify-email"
    }),
    checkAuthentication: () => ({
        path: "/auth/check-authentication"
    }),
    sendFogotPasswordCode: () => ({
        path: "/auth/send-fogot-password-code"
    }),
    verifyFogotPasswordCode: () => ({
        path: "/auth/verify-fogot-password-code"
    }),
}

export { AuthResource }