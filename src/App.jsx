import {Layout} from "antd";
import {AppHeader} from "./components/layout/AppHeader.jsx";
import {AppSider} from "./components/layout/AppSider.jsx";
import {AppContent} from "./components/layout/AppContent.jsx";
// это позволит не писать фразу "Layout." в: Layout.Header, Layout.Footer и т.д.
// const {Header, Footer, Sider, Content} = Layout;

export default function App() {
    // asset - купленная монета с сохраненными характеристиками (ценой) на момент покупки
    // crypto/coin - текущая монета с актуальными на текущий момент характеристиками (ценой)
    return (
        <Layout>
            <AppHeader/>
            <Layout>
                <AppSider/>
                <AppContent/>
            </Layout>
        </Layout>
    )
}
