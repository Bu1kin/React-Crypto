import {Button, Drawer, Layout, Modal, Select, Space} from "antd";
import {useCrypto} from "../../context/crypto-context.jsx";
import {useEffect, useState} from "react";
import {CoinInfoModal} from "../CoinInfoModal.jsx";
import {AddAssetForm} from "../AddAssetForm.jsx";

const headerStyle = {
    width: '100%',
    textAlign: 'center',
    height: 60,
    padding: '1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
};

export const AppHeader = () => {
    const [select, setSelect] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);

    const [coin, setCoin] = useState(null);
    const {crypto} = useCrypto()

    useEffect(() => {
        const keypress = (event) => {
            if (event.key === '/') {
                setSelect(prev => !prev)
            }
        }

        document.addEventListener('keypress', keypress)

        return () => document.removeEventListener('keypress', keypress)
    }, []);

    const handleSelect = (value) => {
        setCoin(crypto.find(c => c.id === value))
        setModalOpen(true)
    };

    return (
        <Layout.Header style={headerStyle}>
            <Select
                style={{
                    width: '25%',
                }}
                open={select}
                value="Press '/' to open"
                onSelect={handleSelect}
                onClick={() => setSelect(prev => !prev)}
                onBlur={() => setSelect(false)}
                // кастомный мап данных, так как для работы Select-а нужны поля label и value,
                // которых у массива данных крипты нет
                options={crypto.map(coin => ({
                    label: coin.name,
                    value: coin.id,
                    icon: coin.icon,
                    symbol: coin.symbol,
                }))}
                optionRender={(option) => (
                    <Space>
                        <img
                            src={option.data.icon}
                            alt={option.data.symbol}
                            style={{width: 20}}
                        />
                        {option.data.label}
                    </Space>
                )}
            />

            <Button type='primary' onClick={() => setDrawerOpen(true)}>
                Add Asset
            </Button>

            <Modal
                open={modalOpen}
                footer={false}
                onCancel={() => setModalOpen(false)}
            >
                <CoinInfoModal coin={coin}/>
            </Modal>

            <Drawer
                title={'Add Asset'}
                width={'35%'}
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
            >
                <AddAssetForm onClose={() => setDrawerOpen(false)}/>
            </Drawer>
        </Layout.Header>
    );
};