import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Redirect } from 'react-router';
import Login from './pages/Login';
import Register from './pages/Register';
import Products from './pages/Products';
import Admin from './pages/Admin';
import CustomerOrderDetails from './pages/CustomerOrderDetails';
import SellerOrderDetails from './pages/SellerOrderDetails';
import OrdersPage from './pages/OrdersPage';

import './App.css';

function App() {
  return (
    <Switch>
      <Route path="/login" component={ Login } />
      <Route exact path="/">
        <Redirect to="/login" component={ Login } />
      </Route>
      <Route path="/register" component={ Register } />
      <Route path="/customer/products" component={ Products } />
      <Route path="/customer/orders/:id" component={ CustomerOrderDetails } />
      <Route path="/customer/orders" component={ OrdersPage } />
      <Route path="/seller/orders/:id" component={ SellerOrderDetails } />
      <Route path="/seller/orders" component={ OrdersPage } />
      <Route path="/admin/manage" component={ Admin } />
    </Switch>
  );
}

export default App;
