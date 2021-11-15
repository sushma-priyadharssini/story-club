import React, { useEffect, useState, useContext, useRef } from 'react';
import Progress from './progress';
import storyContext from '../../store/storyContext';
import globalContext from '../../store/globalContext';
import progressContext from '../../store/progressContext';
import classes from './progressArray.module.css';

const ProgressArray = () => {

    const [count, setCount] = useState(0);
    const { currentStoryId, next, clear, pause } = useContext(progressContext);
    const { defaultInterval } = useContext(globalContext);
    const { stories, currentUserStorySetId } = useContext(storyContext);

    const selectedStories = stories.find(story => story.id === currentUserStorySetId).stories;

    useEffect(() => {
        setCount(0)
    }, [currentStoryId, selectedStories, currentUserStorySetId])

    useEffect(() => {
        if (!pause) {
            animationFrameId.current = requestAnimationFrame(incrementCount)
        }
        return () => {
            cancelAnimationFrame(animationFrameId.current)
        }
    }, [currentStoryId, currentUserStorySetId, pause])

    let animationFrameId = useRef();

    let countCopy = count;
    const incrementCount = () => {
        if (countCopy === 0) storyStartCallback()
        setCount((count) => {
            const interval = getCurrentInterval()
            countCopy = count + (100 / ((interval / 1000) * 60))
            return count + (100 / ((interval / 1000) * 60))
        })
        if (countCopy < 100) {
            animationFrameId.current = requestAnimationFrame(incrementCount)
        } else {
            storyEndCallback();
            if (currentStoryId === selectedStories.length) {
                allStoriesEndCallback();
            }
            cancelAnimationFrame(animationFrameId.current);
        }
    }

    const storyStartCallback = () => {
    }

    const storyEndCallback = () => {
        next();
    }

    const allStoriesEndCallback = () => {
        clear();
    }

    const getCurrentInterval = () => {
        const currentStory = selectedStories.find(story => story.id === currentStoryId);
        if (currentStory.type === 'VIDEO') return currentStory.duration;
        return defaultInterval
    }

    return (
        <div className={classes.progressArr}>
            {selectedStories.map((_, i) =>
                <Progress
                    key={i}
                    count={count}
                    width={1 / selectedStories.length}
                    active={i+1 === currentStoryId ? 1 : (i+1 < currentStoryId ? 2 : 0)}
                />)}
        </div>
    )
}

export default ProgressArray;