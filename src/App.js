import Auth from './components/Auth';
import Dashboard from './components/user/Dashboard';
import AdminDashboard from './components/admin/Dashboard';
import Home from './components/user/Home';
import AdminHome from './components/admin/Home';
import Layout from './components/user/Layout';
import AdminLayout from './components/admin/Layout';
import Profile from './components/user/Profile';
import AdminProfile from './components/admin/Profile';
import Signup from './components/user/Signup';
import AdminSignup from './components/admin/Signup';
import Login from './components/user/login';
import AdminLogin from './components/admin/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Category from './components/admin/Category';
import AddProduct from './components/admin/AddProduct';
import EditProfile from './components/admin/EditProfile';
import UserEditProfile from './components/user/EditProfile';
import UpdateProduct from './components/admin/UpdateProduct';
import ForgotPassword from './components/ForgotPassword';
import ChangePassword from './components/ChangePassword';
import LandingPage from './components/user/LandingPage';
import Products from './components/user/Products';
import ViewProduct from './components/user/ViewProduct';
import Cart from './components/user/Cart';
import CheckOut from './components/user/CheckOut';
import Orders from './components/user/Orders';
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/user" element={<Layout />}>
            <Route path="" element={<LandingPage />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="home/" element={<Dashboard />} />
            <Route path="home/cart" element={<Cart />} />
            <Route path="home/product/:productId" element={<ViewProduct />} />
            <Route path="home/profile" element={<Profile />} />
            <Route path="home/edit-profile" element={<UserEditProfile />} />
            <Route path="home/checkout" element={<CheckOut />} />
            <Route path="home/orders" element={<Orders />} />
            <Route path="home" element={<Home />}>
              <Route path=":category" element={<Products />} />
            </Route>
          </Route>
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="" element={<AdminDashboard />} />
            <Route path="login" element={<AdminLogin />} />
            <Route path="signup" element={<AdminSignup />} />
            <Route path="home" element={<AdminHome />}>
              <Route path="" element={<AdminProfile />} />
              <Route path=":category" element={<Category />} />
              <Route path="add-product" element={<AddProduct />} />
              <Route path="user/:user" element={<EditProfile />} />
              <Route path="product/:productId" element={<UpdateProduct />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
