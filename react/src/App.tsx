import React from 'react';
import './App.css';
import {BrowserRouter, NavLink, Route, Switch} from 'react-router-dom';
import * as pages from './pages';
import {QueryClient, QueryClientProvider} from 'react-query';
import 'antd/dist/antd.css';
import {Layout, Menu} from 'antd';
import styled, {createGlobalStyle} from 'styled-components';

const Navigation = () => (
  <Menu className="menu">
    {Object.values(pages).map(Page => (
      <Menu.Item key={Page.name}>
        <NavLink to={`/${Page.name}`}>{Page.name}</NavLink>
      </Menu.Item>
    ))}
  </Menu>
);

const Switcher = () => (
  <Switch>
    {Object.values(pages).map(Page => (
      <Route key={Page.name} path={`/${Page.name}`} component={Page} />
    ))}
  </Switch>
);

const queryClient = new QueryClient();

export const App = () => {
  return (
    <>
      <Styled>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <Layout className="layout">
              <Layout.Sider width={360} className="sider" theme="light">
                <Navigation />
              </Layout.Sider>
              <Layout.Content className="content">
                <Switcher />
              </Layout.Content>
            </Layout>
          </BrowserRouter>
        </QueryClientProvider>
      </Styled>
      <GlobalStyle />
    </>
  );
};

const Styled = styled.div`
  .content {
    background: #fff;
    padding: 0 24px;
    position: relative;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
  }
  .sider {
    height: 100%;
  }
  &,
  .layout {
    height: 100%;
    width: 100%;
  }
`;
const GlobalStyle = createGlobalStyle`
  body,
  html,
  #root {
    height: 100%;
    width: 100%;
  }
  .menu{
    height: 100%;
  }
`;
