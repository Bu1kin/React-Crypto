import {createContext, useContext, useEffect, useState} from "react";
import {fetchAssets, fetchCrypto} from "../api.js";
import {percentDifference} from "../utils.js";

const CryptoContext = createContext({
    assets: [],
    crypto: [],
    loading: false,
})

// в провайдере мы изолируем логику программы: работу со всеми Стейтами, работу с данными
// тут будет только логика, а в компонентах будет только отображение компонентов и логики
export function CryptoContextProvider({children}) {
    const [loading, setLoading] = useState(false)
    const [crypto, setCrypto] = useState([])
    const [assets, setAssets] = useState([])

    function mapAssets(assets, result) {
        return assets.map(asset => {
            const coin = result.find((c) => c.id === asset.id)
            return {
                grow: asset.price < coin.price,
                growPercent: percentDifference(asset.price, coin.price),
                totalAmount: asset.amount * coin.price,
                totalProfit: asset.amount * coin.price - asset.amount * asset.price,
                name: coin.name,
                ...asset,
            }
        })
    }

    useEffect(() => {
        async function preload() {
            setLoading(true)

            const {result} = await fetchCrypto()
            const assets = await fetchAssets()

            setCrypto(result)
            // setAssets(assets.map(asset => mapAsset(asset, result))) - было, неоптимизировано
            setAssets(mapAssets(assets, result))

            setLoading(false)
        }
        preload()
    }, []);

    function addAsset (newAsset) {
        setAssets(prev => mapAssets([...prev, newAsset], crypto))
    }

    return (
        // По сути, мы создаем некоторый верхнеуровневый провайдер, который предоставляет всем дочерним...
        // ...компонентам children данные. И любой компонент будет иметь доступ к данным
        // в value передаем объект, в котором будут лежать все данные
        <CryptoContext.Provider
            value={{crypto, assets, loading, addAsset}}
        >
            {/*children - другие компоненты*/}
            {children}
        </CryptoContext.Provider>
    )
}

export function useCrypto() {
    return useContext(CryptoContext)
}