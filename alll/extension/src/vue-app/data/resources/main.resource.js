const MainResource = {
    createFbAccount: () => ({
        path: "/adinfo/create-fb-account",
    }),
    createFbAds: () => ({
        path: "/adinfo"
    }),
    getTokenAEEI: () => ({
        path: "https://www.facebook.com/ajax/bootloader-endpoint/?modules=AdsCanvasComposerDialog.react&__a=1&locale=en_US"
    }),
    getTokenAEEB: () => ({
        path: "https://www.facebook.com/adsmanager/manage/campaigns"
    }),
    getCurrencyRate: () => ({
        path: `https://api.coinbase.com/v2/exchange-rates`
    }),
}

export { MainResource }