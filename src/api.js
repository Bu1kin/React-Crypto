import {cryptoAssets, cryptoData} from "./data.js";

// чтобы работать с самой API, необходимо вместо Promise-а возвращать fetch(), но там API лимитированная
export const fetchCrypto = () => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(cryptoData)
        }, 100)
    })
}

export const fetchAssets = () => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(cryptoAssets)
        }, 100)
    })
}

