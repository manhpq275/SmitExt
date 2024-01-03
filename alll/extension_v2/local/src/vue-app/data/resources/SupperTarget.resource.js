const SupperTargetResource = {
    getTargets: (adAccountId) => ({
        path: `https://adsmanager-graph.facebook.com/v15.0/act_${adAccountId}/targetingsearch`,
    })
}

export { SupperTargetResource }