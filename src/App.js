import React, { useState } from 'react';
import GlobalContext from './store/globalContext';
import StoryContext from './store/storyContext';
import AllStories from './components/allStories';
import StoryContainer from './components/storyContainer';

function App() {
  const globalCtx = {
    defaultInterval: 4000,
    height: 350,
    width: 650
  };
  const [currentStorySetId, setCurrentStorySetId] = useState(1);
  const updateStorySetId = (id) => {
    setCurrentStorySetId(id);
  }
  const storyCtx = {
    stories: [
      { id: 1, stories: [
        { id: 1, type: 'TEXT', text: 'aajdksajdk kndkasdkja kdnksjnda', color: '#F08080' },
        { id: 2, type: 'TEXT', text: 'ab', color: 'darkkhaki' },
        { id: 3, type: 'IMAGE', src:'/logo192.png' },
        { id: 4, type: 'IMAGE', src: '/manda_batharam.gif' }] },
      { id: 2, stories: [
        { id: 1, type: 'TEXT', text: 'bc', color: 'turquoise' },
        { id: 2, type: 'VIDEO', src: '/video.mp4', duration: 18000 },
        { id: 3, type: 'TEXT', text: 'ab', color: 'sandybrown' }] }
    ],
    currentUserStorySetId: currentStorySetId,
    setCurrentUserStorySetId: updateStorySetId
  };
  return (
    <GlobalContext.Provider value={globalCtx}>
      <StoryContext.Provider value={storyCtx}>
        <div className="pageContainer">
          <AllStories></AllStories>
          <StoryContainer></StoryContainer>
        </div>
      </StoryContext.Provider>
    </GlobalContext.Provider>
  );
}

export default App;
