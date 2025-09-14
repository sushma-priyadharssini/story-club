import React from 'react';

const storyContext = React.createContext({
    stories: [],
    currentUserStoryList: null,
    setCurrentUserStoryList: (story) => { },
    currentStory: null,
    setCurrentStory: (story) => { },
    pauseStory: false,
    setPauseStory: (pause) => { },
});

export default storyContext;