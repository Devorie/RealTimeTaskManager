import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './Pages/Home';
import Signup from './Pages/Signup';
import Login from './Pages/Login';

import { AuthContextComponent } from './AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Logout from './Pages/Logout';

const App = () => {
    return (
        <AuthContextComponent>
            <Layout>
                <Routes>
                    <Route path='/signup' element={<Signup />} />
                    <Route path='/Login' element={<Login />} />
                    <Route path='/' element={
                        <PrivateRoute>
                            <Home />
                        </PrivateRoute>
                    } />
                    <Route path='/logout' element={<Logout />} />
                </Routes>
            </Layout>
        </AuthContextComponent>
    );
}

export default App;