import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import Service from './components/Service';
import AuthProvider from './Context/AuthProvider';
import AddBlog from './Page/AddBlog';
import AddNewOrder from './Page/AddNewOrder';
import BlogRequest from './Page/BlogRequest';
import Home from './Page/Home';
import Login from './Page/Login';
import MakeAdmin from './Page/MakeAdmin';
import ManageServices from './Page/ManageServices';
// import ManageOrder from './Page/ManageOrder';
import MyOrder from './Page/MyOrder';
import Profile from './Page/Profile';
import Register from './Page/Register';
import SingleBlog from './Page/SingleBlog';
import UpdateService from './Page/UpdateService';
import AdminRoute from './PrivateRoute/AdminRoute';
import PrivateRoute from './PrivateRoute/PrivateRoute';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <Header />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/home">
              <Home />
            </Route>
            <Route exact path="/services">
              <Service />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/blog/:id">
              <SingleBlog />
            </Route>
            <Route exact path="/register">
              <Register />
            </Route>
            <PrivateRoute exact path="/addblog">
              <AddBlog />
            </PrivateRoute>
            <PrivateRoute exact path="/profile">
              <Profile />
            </PrivateRoute>
            <PrivateRoute exact path="/myorders">
              <MyOrder />
            </PrivateRoute>
            <AdminRoute exact path="/pendingpost">
              <BlogRequest />
            </AdminRoute>
            <AdminRoute exact path="/makeadmin">
              <MakeAdmin />
            </AdminRoute>
            <AdminRoute exact path="/manageservices">
              <ManageServices />
            </AdminRoute>
            <AdminRoute exact path="/addservice">
              <AddNewOrder />
            </AdminRoute>
            <PrivateRoute exact path="/service/updateservice/:id">
              <UpdateService />
            </PrivateRoute>
          </Switch>
          <Footer />
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
