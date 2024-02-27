import {Table} from "antd";
import {useCrypto} from "../context/crypto-context.jsx";

export const AssetsTable = () => {
    const {assets, crypto} = useCrypto()

    // const btc = crypto.find(c => c.name, 'Bitcoin')
    // =
    const btc = crypto.find(c => c.name === 'Bitcoin')

    console.log(btc)

    const priceInBTC = (asset) => {
        return +(asset.totalAmount / btc.price).toFixed(8)
    }

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            sorter: (a, b) => a.amount - b.amount,
        },
        {
            title: 'Price, $',
            dataIndex: 'price$',
            sorter: (a, b) => a.price$ - b.price$,
        },
        {
            title: 'Price, BTC',
            dataIndex: 'priceBtc',
            sorter: (a, b) => a.priceBtc - b.priceBtc,
        },
    ];

    const data = assets.map(a => {
        return {
            key: a.id,
            name: a.name,
            amount: a.amount,
            price$: a.totalAmount.toFixed(2),
            priceBtc: priceInBTC(a)
        }
    })

    const onChange = (sorter, extra) => {
        console.log('params', sorter, extra);
    };

    return (
        <div>
            <Table columns={columns} dataSource={data} onChange={onChange} pagination={false} />
        </div>
    );
};
