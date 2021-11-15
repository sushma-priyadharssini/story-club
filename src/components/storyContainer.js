import React, { useContext, useEffect, useState } from 'react';
import storyContext from '../store/storyContext';
import classes from './storyContainer.module.css';
import ProgressArray from './progressBar/progressArray';
import ProgressContext from '../store/progressContext';

const StoryContainer = () => {
    const { stories, currentUserStorySetId, setCurrentUserStorySetId } = useContext(storyContext);
    const currentStory = stories.find(story => story.id === currentUserStorySetId);
    const [currentStoryId, setCurrentStoryId] = useState(currentStory?.stories[0]?.id);
    const [pause, setPause] = useState(false);

    useEffect(() => {
        setCurrentStoryId(currentStory?.stories[0].id);
    }, [currentUserStorySetId, currentStory?.stories])

    const getCurrentStoryDetails = () => {
        return currentStory && currentStory.stories.find(story => story.id === currentStoryId);
    }

    const progressValue = {
        currentStoryId: currentStoryId,
        pause: pause,
        next: () => {
            setCurrentStoryId(prevValue => prevValue + 1)
        },
        clear: () => {
            setCurrentUserStorySetId(prevValue => prevValue + 1)
        }
    }

    const isText = () => getCurrentStoryDetails().type === 'TEXT';

    const isImage = () => getCurrentStoryDetails().type === 'IMAGE';

    const isVideo = () => getCurrentStoryDetails().type === 'VIDEO';

    const pauseStatus = () => {
        setPause(prevValue => !prevValue);
    }

    return (
        <React.Fragment>
            { getCurrentStoryDetails() && isText() &&
                <div className={classes.storyContainer} onClick={pauseStatus.bind(this)} style={{ backgroundColor: getCurrentStoryDetails()?.color }}>
                    <ProgressContext.Provider value={progressValue}>
                        <ProgressArray></ProgressArray>
                    </ProgressContext.Provider>
                    <p>{getCurrentStoryDetails()?.text}</p>
                </div>
             }
             { getCurrentStoryDetails() && isImage() &&
                <div className={classes.storyContainer} onClick={pauseStatus.bind(this)}>
                    <ProgressContext.Provider value={progressValue}>
                        <ProgressArray></ProgressArray>
                    </ProgressContext.Provider>
                    <img src={getCurrentStoryDetails().src} alt="img"></img>
                </div>
             }
             { getCurrentStoryDetails() && isVideo() &&
                <div className={classes.storyContainer} onClick={pauseStatus.bind(this)}>
                    <ProgressContext.Provider value={progressValue}>
                        <ProgressArray></ProgressArray>
                    </ProgressContext.Provider>
                    <video width="320" height="240" autoPlay>
                        <source src={getCurrentStoryDetails().src} type="video/mp4"/>
                    </video>
                </div>
             }
        </React.Fragment>
    )

}

export default StoryContainer;