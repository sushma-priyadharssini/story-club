import { useState } from 'react';
import GlobalContext from './store/globalContext';
import StoryContext from './store/storyContext';
import AllStories from './components/allStories';
import StoryContainer from './components/storyContainer';
import { STORIES } from "./data"

function App() {
  const globalCtx = {
    defaultInterval: 4000,
    height: 350,
    width: 650
  };
  const [currentUserStoryList, setCurrentUserStoryList] = useState(null);
  const [currentStory, setCurrentStory] = useState(null);
  const [pauseStory, setPauseStory] = useState(false);

  const storyCtx = {
    stories: STORIES,
    currentUserStoryList,
    setCurrentUserStoryList,
    currentStory,
    setCurrentStory,
    pauseStory,
    setPauseStory
  };

  return (
    <GlobalContext.Provider value={globalCtx}>
      <StoryContext.Provider value={storyCtx}>
        <div className="pageContainer">
          <AllStories />
          <StoryContainer />
        </div>
      </StoryContext.Provider>
    </GlobalContext.Provider>
  );
}

export default App;
