import React, { useContext, useEffect } from 'react';
import storyContext from '../store/storyContext';
import classes from './storyContainer.module.css';
import ProgressArray from './progressBar/progressArray';

const StoryContainer = () => {
    const {
        stories,
        currentUserStoryList,
        currentStory,
        setCurrentStory,
        pauseStory,
        setPauseStory
    } = useContext(storyContext);

    useEffect(() => {
        const currentUserStory = stories.find(story => story.id === currentUserStoryList?.id);
        setCurrentStory(currentUserStory?.stories[0])
    }, [currentUserStoryList, stories, setCurrentStory])

    useEffect(() => {
        const video = document.getElementById("video-story");
        if (currentStory?.type === "VIDEO") {
            if (pauseStory) {
                video?.pause()
            } else {
                video?.play()
            }
        }
    }, [pauseStory, currentStory])

    const { text, src, type: mediaType, color } = currentStory || {};

    return (
        <React.Fragment>
            {currentStory &&
                <div className={classes.storyContainer}
                    onClick={() => setPauseStory(prevValue => !prevValue)}
                    style={{ backgroundColor: color }}>
                    <ProgressArray />
                    {
                        {
                            // eslint-disable-next-line
                            ['TEXT']: (
                                <p>{text}</p>
                            ),
                            // eslint-disable-next-line
                            ['IMAGE']: (
                                <img src={src} width="100%" alt="img"></img>
                            ),
                            // eslint-disable-next-line
                            ['VIDEO']: (
                                <video id="video-story" width="100%" height="100%" autoPlay>
                                    <source src={src} type="video/mp4" />
                                </video>
                            ),
                        }[mediaType]
                    }
                </div>
            }
        </React.Fragment>
    )

}

export default StoryContainer;