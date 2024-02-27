import React, {useRef, useState} from 'react';
import {Button, DatePicker, Divider, Flex, Form, InputNumber, Result, Select, Space, Typography} from "antd";
import {useCrypto} from "../context/crypto-context.jsx";
import {SubmitButton} from "./SubmitButton.jsx";
import {CoinInfoHeader} from "./CoinInfoHeader.jsx";

export const AddAssetForm = ({onClose}) => {
    const [select, setSelect] = useState(false);
    const [isSucceed, setIsSucceed] = useState(false);
    const assetRef = useRef()

    const [coin, setCoin] = useState(null);
    const {crypto, addAsset} = useCrypto();

    const [form] = Form.useForm();

    const onFinish = (values) => {
        // ! values.название_поля, где название поля должно ПОЛНОСТЬЮ совпадать с name нужного Form.Item
        // З.Ы. потому name-ы у Form.Item-ов желательно делать с маленькой буквы
        const newAsset = {
            id: coin.id,
            amount: values.Amount,
            price: values.Price,
            // https://youtu.be/S4HOy6yTclU?t=8193
            // у DatePicker-а настолько подробный формат даты, что в выбранное поле он пихает объект M2, если просто указать:
            // date: values.Date.
            //
            // В объекте M2 есть такое поле как $d, которое и нужно для формата времени.
            // *Дословно: если есть такое поле как $d в value DatePicker-а с name='Date'
            date: values.Date?.$d ?? new Date(),
        }
        assetRef.current = newAsset
        addAsset(newAsset)

        setIsSucceed(true)

        console.log(newAsset)
    }

    // value берется прямиком из параметра value того инпута, к которому привязан обработчик событий
    const handleAmountChange = (value) => {
        const price = form.getFieldValue('Price')
        form.setFieldsValue({
            Total: +(price * value).toFixed(2)
        })
    }

    const handlePriceChange = (value) => {
        const amount = form.getFieldValue('Amount')
        form.setFieldsValue({
            Total: +(amount * value).toFixed(2)
        })
    }

    const validateMessages = {
        required: '${label} is required!',
        types: {
            number: '${label} is not a valid number!',
        },
        number: {
            range: '${label} must be between ${min} and ${max}',
        },
    };

    const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 6 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 14 },
        },
    };

    if (!coin) {
        return (
            <Select
                style={{
                    width: '100%',
                }}
                placeholder="Select coin"
                onSelect={(v) => setCoin(crypto.find(c => c.id === v))}
                onClick={() => setSelect(prev => !prev)}
                onBlur={() => setSelect(false)}
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
        );
    }

    if (isSucceed) {
        return (
            <Result
                status="success"
                title="Successfully New Asset Added!"
                subTitle={`Added ${assetRef.current.amount} of ${coin.name} by price ${assetRef.current.price}$`}
                extra={[
                    <Button type="primary" key="console" onClick={onClose}>
                        Close
                    </Button>
                ]}
            />
        )
    }

    return (
        <>
            <Form
                {...formItemLayout}
                form={form}
                initialValues={{
                    // названия должны совпадать с тем, что написано в name у Form.Item
                    // то есть: Amount, Price, Date, Total
                    // Название_Form.Item: значение
                    Price: +coin.price.toFixed(2)
                }}
                validateMessages={validateMessages}
                onFinish={onFinish}
            >
                <CoinInfoHeader coin={coin} withSymbol={false}/>
                <Divider/>
                <Form.Item label="Amount" name="Amount" rules={[{ required: true, type: "number", min: 0 }]}>
                    <InputNumber placeholder={'Enter coin amount'} style={{ width: '100%' }} onChange={handleAmountChange}/>
                </Form.Item>

                <Form.Item label="Price" name="Price" rules={[{ required: true, type: "number", min: 0 }]}>
                    <InputNumber style={{ width: '100%' }} onChange={handlePriceChange}/>
                </Form.Item>

                <Form.Item label="Date & Time" name="Date">
                    <DatePicker style={{ width: '100%' }} showTime/>
                </Form.Item>

                <Form.Item label="Total" name="Total">
                    <InputNumber style={{ width: '100%' }} disabled/>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
                    <SubmitButton form={form} content='Add Asset' style={{marginRight: 10}}/>
                    <Button type={'default'} onClick={() => setCoin(null)}>Cancel</Button>
                </Form.Item>
            </Form>
        </>
    );
};

