const PaymentResource = {
    getPackage: () => ({
        path: "/payment/get-package",
    }),
    createPayment: () => ({
        path: "/payment/make-payment",
    }),
}

export { PaymentResource }