

// src/components/Auth.js

import React from 'react';
import { withAuthenticator } from '@aws-amplify/ui-react';

const Auth = () => (
    <div>
        <h1>Welcome to Musify</h1>
    </div>
);

export default withAuthenticator(Auth);
