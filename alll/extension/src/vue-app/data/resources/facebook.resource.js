const FacebookResource = {
    getAdsAccountById: (id) => ({
        path: `https://graph.facebook.com/v15.0/${id}`
    }),
    getAdsAccountBubble: (id) => ({
        path: `https://adsmanager-graph.facebook.com/v15.0/${id}`
    }),
}

export { FacebookResource }