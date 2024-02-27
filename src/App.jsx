import {CryptoContextProvider} from "./context/crypto-context.jsx";
import {AppLayout} from "./components/layout/AppLayout.jsx";
// это позволит не писать фразу "Layout." в: Layout.Header, Layout.Footer и т.д.
// const {Header, Footer, Sider, Content} = Layout;

export default function App() {
    // asset - купленная монета с сохраненными характеристиками (ценой) на момент покупки
    // crypto/coin - текущая монета с актуальными на текущий момент характеристиками (ценой)
    return (
        <CryptoContextProvider>
            <AppLayout/>
        </CryptoContextProvider>
    )
}
