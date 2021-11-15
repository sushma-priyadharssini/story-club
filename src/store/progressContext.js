import React from 'react';

const progressContext = React.createContext({
    currentStoryId: 1,
    next: (id) => {},
});

export default progressContext;