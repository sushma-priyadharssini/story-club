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
        setPauseStory
    } = useContext(storyContext);

    useEffect(() => {
        const currentUserStory = stories.find(story => story.id === currentUserStoryList?.id);
        setCurrentStory(currentUserStory?.stories[0])
    }, [currentUserStoryList, stories, setCurrentStory])

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
                                <img src={src} alt="img"></img>
                            ),
                            // eslint-disable-next-line
                            ['VIDEO']: (
                                <video width="320" height="240" autoPlay>
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