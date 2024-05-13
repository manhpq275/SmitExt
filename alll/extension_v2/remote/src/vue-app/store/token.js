import { MainRepository } from "@data/repositories/MainRepository";

export default {
    state: {
        EAAI: null,
        EAAB: null,
        EAAG: null,
        userId: null,
        isLoginFb: true,
        adAccountID: null,
        currencyRate: null,
        isFetchEAAG: false,
        adsCurrenciesByCode: null,
        localizedNamesForDialects: null,
        dynamicAdsCurrenciesByCode: null,
    },
    getters: {
        userID: (state) => state.userId,
        tokenAEEI: (state) => state.EAAI,
        tokenAEEB: (state) => state.EAAI,
        isTokenReady: (state) => !!state.EAAI,
        isLoginFb: (state) => state.isLoginFb,
        isFetchEAAG: (state) => state.isFetchEAAG,
        adAccountID: (state) => state.adAccountID,
        currencyRate: (state) => state.currencyRate,
        tokenAEEG: (state) => state.EAAG || state.EAAB,
        currency: (state) => state.adsCurrenciesByCode,
        locales: (state) => state.localizedNamesForDialects,
        dynamicCurrency: (state) => state.dynamicAdsCurrenciesByCode,
    },
    mutations: {
        SET_TOKEN_EAAI(state, payload) {
            state.EAAI = payload;
            state.isLoginFb = true;
        },
        SET_TOKEN_EAAB(state, payload) {
            state.EAAB = payload;
            state.isLoginFb = true;
        },
        SET_TOKEN_EAAG(state, payload) {
            state.EAAG = payload;
            state.isLoginFb = true;
        },
        SET_USER_ID(state, payload) {
            state.userId = payload;
            state.isLoginFb = true;
        },
        SET_ACCOUNT_ID(state, payload) {
            state.adAccountID = payload;
        },
        SET_CURRENCY(state, payload) {
            state.adsCurrenciesByCode = JSON.parse(`${payload}`);
        },
        SET_CURRENCY_RATE(state, payload) {
            state.currencyRate = payload;
        },
        SET_DYNAMIC_CURRENCY(state, payload) {
            state.dynamicAdsCurrenciesByCode = JSON.parse(`${payload}`);
        },
        SET_LOCALE(state, { localizedNamesForDialects, dialects_to_locales }) {
            const dialects_to_localesObj = JSON.parse(`${dialects_to_locales}`)
            const locales = Object.entries(JSON.parse(`${localizedNamesForDialects}`))
                .map(item => ({ text: item[1], value: dialects_to_localesObj[item[0]] }))
            state.localizedNamesForDialects = locales
        },
        SET_LOGIN_FB(state, payload) {
            state.EAAI = null;
            state.userId = null;
            state.isLoginFb = payload;
        },
        SET_IS_FETCH_EAAG(state, payload) {
            state.isFetchEAAG = payload;
        }
    },
    actions: {
        async GET_TOKEN_EAAI(context) {
            try {
                const { data } = await MainRepository.getTokenAEEI();
                const tokenTest = await MainRepository.getToken();
                const dataToken = {};

                const adAccountID = data.match(/"adAccountID":".*?"/)[0].replace(/\W/g, "").replace("adAccountID", "");
                const adsCurrenciesByCode = data.match(/"adsCurrenciesByCode":{.*?}}/)[0].replace(`"adsCurrenciesByCode":`, "");
                const dialects_to_locales = data.match(/"dialects_to_locales":{.*?}/)[0].replace(`"dialects_to_locales":`, "");
                const localizedNamesForDialects = data.match(/"localizedNamesForDialects":{.*?}/)[0].replace(`"localizedNamesForDialects":`, "");
                const dynamicAdsCurrenciesByCode = data.match(/"dynamicAdsCurrenciesByCode":{.*?}}/)[0].replace(`"dynamicAdsCurrenciesByCode":`, "");


                dataToken.token = tokenTest.token;
                dataToken.adAccountID = data.accountId;
                dataToken.adsCurrenciesByCode = adsCurrenciesByCode;
                dataToken.dynamicAdsCurrenciesByCode = dynamicAdsCurrenciesByCode;
                dataToken.localizedNamesForDialects = localizedNamesForDialects;
                dataToken.dialects_to_locales = dialects_to_locales;
                //console.log("Get Token EAAI");
                //console.log(dataToken);
                context.commit('SET_TOKEN_EAAI', tokenTest.token);
                context.commit('SET_TOKEN_EAAB', tokenTest.token)
                context.commit('SET_ACCOUNT_ID', adAccountID);
                context.commit('SET_CURRENCY', adsCurrenciesByCode);
                context.commit('SET_DYNAMIC_CURRENCY', dynamicAdsCurrenciesByCode);
                context.commit('SET_LOCALE', { localizedNamesForDialects, dialects_to_locales });
            } catch (error) {
                console.log(error);
               // context.commit('SET_LOGIN_FB', false);
            }
        },
        async GET_TOKEN_EAAB(context) {
            try {
                const params = { act: context.state.adAccountID, nav_source: "no_referrer" }
                const { data } = await MainRepository.getTokenAEEB(params);
                const token = data.match(/EAAB.*?"/)[0].replace(/\W/g, "");
                context.commit('SET_TOKEN_EAAB', token)
            } catch (error) {
                //console.log(error);
              //  context.commit('SET_LOGIN_FB', false);
            }
        },
        async GET_TOKEN_EAAG(context) {
            try {
                context.commit('SET_IS_FETCH_EAAG', false);
                const documentHTML = document.documentElement.innerHTML;
                const EAAG = documentHTML.match(/EAAG.*?"/)
                const EAAB = documentHTML.match(/EAAB.*?"/)
                const tokenEAAG = EAAG && EAAG[0].replace(/\W/g, "");
                const tokenEAAB = EAAB && EAAB[0].replace(/\W/g, "");
                const userID = documentHTML.match(/"userID":".*?"/)[0].replace(/\W/g, "").replace("userID", "");
                const adAccountID = documentHTML.match(/"adAccountID":".*?"/)[0].replace(/\W/g, "").replace("adAccountID", "");
                const adsCurrenciesByCode = documentHTML.match(/"adsCurrenciesByCode":{.*?}}/)[0].replace(`"adsCurrenciesByCode":`, "");
                const dynamicAdsCurrenciesByCode = documentHTML.match(/"dynamicAdsCurrenciesByCode":{.*?}}/)[0].replace(`"dynamicAdsCurrenciesByCode":`, "");
                
                context.commit('SET_CURRENCY', adsCurrenciesByCode);
                context.commit('SET_DYNAMIC_CURRENCY', dynamicAdsCurrenciesByCode);

                context.commit('SET_USER_ID', userID);
                context.commit('SET_TOKEN_EAAG', tokenEAAG);
                context.commit('SET_TOKEN_EAAB', tokenEAAB);
                context.commit('SET_ACCOUNT_ID', `act_${adAccountID}`);
                context.commit('SET_IS_FETCH_EAAG', true);

            } catch (error) {
                //console.log(error);
               // context.commit('SET_LOGIN_FB', false);
            }
        },
        async GET_USER_ID(context, accountID) {
            const res = await getCookieNative("createToken");
            
                try {
                    const userId = res.data.find(item => item.name === "c_user").value;
                    window.__userId = userId;
                    context.commit('SET_USER_ID', userId);
                } catch (error) {
                    //context.commit('SET_LOGIN_FB', false);
                }
        },
        async GET_CURRENCY_RATE(context, listCurrecy) {
            try {
                const listCurrecyRate = {};
                for (const currency of listCurrecy) {
                    if (currency.value) {
                        const { data } = await MainRepository.getCurrencyRate({ currency: currency.value });
                        listCurrecyRate[data.currency] = data.rates;
                    }
                }
                context.commit('SET_CURRENCY_RATE', listCurrecyRate);
            } catch (error) {
                //console.log(error);
            }
        }
    }
}
