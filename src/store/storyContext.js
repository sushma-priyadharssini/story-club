import React from 'react';

const storyContext = React.createContext({
    stories: [],
    currentUserStorySetId: null,
    setCurrentUserStorySetId: (id) => {},
});

export default storyContext;