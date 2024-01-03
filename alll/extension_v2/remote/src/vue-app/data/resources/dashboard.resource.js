const DashboardResource = {
    getAdsAccount: () => ({
        path: "https://graph.facebook.com/v15.0/me/adaccounts"
    }),
    getAdsAccountById: (id) => ({
        path: `https://graph.facebook.com/v15.0/${id}`
    }),
    getBMAdsAccount: () => ({
        path: "https://graph.facebook.com/v15.0/me/businesses"
    }),
    changeAdAccountName: (id) => ({
        path: `https://graph.facebook.com/v15.0/${id}`
    }),
    addAdAccount: (mainId) => ({
        path: `https://graph.facebook.com/v15.0/${mainId}/users`
    }),
    removeAdAccount: (mainId, uid) => ({
        path: `https://graph.facebook.com/v15.0/${mainId}/users/${uid}`
    }),
}

export { DashboardResource }