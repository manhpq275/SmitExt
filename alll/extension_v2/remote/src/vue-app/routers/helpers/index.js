const commonRoutesPath = ["/menu", "/login", "/account", "/register", "/register-confirm-email", "/", "/dashboard", "/super-target"]
const premiumRoutesPath = ["/share-pixel", "/extended-payment", "/super-target", "/del-hidden-admin"]
const proRoutesPath = ["/share-pixel", "/extended-payment", "/super-target", "/del-hidden-admin"]

const guestRoute = [...commonRoutesPath]
const memberRoute = [...commonRoutesPath]
const premiumRoute = [...memberRoute, ...premiumRoutesPath]
const proRoute = [...premiumRoute, ...proRoutesPath]


export function checkPermision(role, path) {
    switch (role) {
        case "member":
            return memberRoute.includes(path)
        case "premium":
            return premiumRoute.includes(path)
        case "pro":
            return proRoute.includes(path)
        default:
            return guestRoute.includes(path);
    }
}