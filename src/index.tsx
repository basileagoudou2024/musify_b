import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Amplify } from 'aws-amplify';
import awsconfig from './amplifyconfiguration.json';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// Configure Amplify with the aws-exports.js configuration
Amplify.configure(awsconfig);

import  CarouselComponent  from './components/CarouselComponent';
import Navbar from './components/Navbar';
import SongManager from './screens/SongManager';

import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

// Configuration du routeur
const AppRoutes = () => (
    <Routes>
        <Route path="/" element={<CarouselComponent />} />
        <Route path="/auth" element={<Authenticator />} />
        <Route path="/songs" element={<SongManager />} />
    </Routes>
);

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Authenticator>
                <Navbar />
                <AppRoutes />
                <div>Footer</div>
            </Authenticator>
        </BrowserRouter>
    </React.StrictMode>
);

reportWebVitals();
