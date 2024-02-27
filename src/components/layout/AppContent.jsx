import {Divider, Layout, Typography} from "antd";
import {useCrypto} from "../../context/crypto-context.jsx";
import {PortfolioChart} from "../PortfolioChart.jsx";
import {AssetsTable} from "../AssetsTable.jsx";

const contentStyle = {
    textAlign: 'center',
    minHeight: 'calc(100vh - 60px)',
    backgroundColor: '#001529',
    padding: '1rem'
};

export const AppContent = () => {
    const {assets, crypto} = useCrypto()

    const cryptoPriceMap = crypto.reduce((acc, coin) => {
        acc[coin.id] = coin.price
        return acc
    }, {})

    return (
        <Layout.Content style={contentStyle}>
            <Typography.Title level={3} style={{color: "#fff", textAlign: "left"}}>
                Portfolio: {assets.map(asset => {
                    // До:
                    // const coin = crypto.find(c => c.id === asset.id)
                    // После:
                    return asset.amount * cryptoPriceMap[asset.id]
                // acc - аккумулятор, изначально n значение ( n указывается вторым аргументом .reduce() ),
                // аккумулятор нужен, чтобы его просуммировать с передаваемыми в value значениями
                }).reduce((acc, value) => (acc += value), 0).toFixed(2)}$
            </Typography.Title>
            <PortfolioChart/>
            <Divider/>
            <AssetsTable/>
        </Layout.Content>
    );
};

