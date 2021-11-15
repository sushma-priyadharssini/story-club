import React from 'react';

const globalContext = React.createContext({
    defaultInterval: 4000,
    height: 350,
    width: 650
});

export default globalContext;