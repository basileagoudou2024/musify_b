import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Amplify } from 'aws-amplify';
import awsconfig from "./amplifyconfiguration.json";
import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import  CarouselComponent  from "./components/CarouselComponent";
import  Navbar  from "./components/Navbar";
import  SongManager  from "./screens/SongManager";
import  {Authenticator}  from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

// Configure Amplify with the aws-exports.js configuration
Amplify.configure(awsconfig);

// 2- ROUTEUR REACT


// 3- ECRANS ET COMPOSANTS




// 4- AUTHENTIFICATION ET CONFIGURATION AMPLIFY



// 5 - CONFIGURATION DU ROUTEUR
const router = createBrowserRouter([
    {
        path: "/",
        element:<div ></div>,
    },
    {
        path: "/edit",
        element: <SongManager />,
    },
]);

// 6- RENDU DE L'APPLICATION
const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

// @ts-ignore
root.render(
    <React.StrictMode>
        <Authenticator>
            <Navbar />
            <SongManager/>
            <RouterProvider router={router} />
            {/*<div>Footer</div>*/}
        </Authenticator>
        <CarouselComponent/>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
