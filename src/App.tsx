import { Outlet } from 'react-router-dom';
import Menu from './shared/menu';
import Footer from './shared/footer';
import { Layout, ConfigProvider } from 'antd';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { theme } from './theme/theme';
import './theme/globalStyles.css';


const { Content } = Layout;

const App = () => {
  return (
    <Provider store={store}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: theme.colors.primary,
            borderRadius: 8,
            colorBgContainer: theme.colors.background,
            colorText: theme.colors.text,
            colorTextSecondary: theme.colors.textSecondary,
          },
        }}
      >
        <Layout style={{ minHeight: '100vh', background: theme.colors.backgroundSecondary }}>
          <Menu />
          <Content style={{ maxWidth: 1200, margin: '0 auto', width: '100%', padding: '24px' }}>
            <main>
              <Outlet />
            </main>
          </Content>
          <Footer />
        </Layout>
      </ConfigProvider>
    </Provider>
  );
};

export default App;
