import { useEffect, useState, useContext, useRef, useCallback } from 'react';
import Progress from './progress';
import storyContext from '../../store/storyContext';
import globalContext from '../../store/globalContext';
import classes from './progressArray.module.css';

const ProgressArray = () => {
    const [count, setCount] = useState(0);
    const { defaultInterval } = useContext(globalContext);
    const {
        stories,
        currentUserStoryList,
        currentStory,
        setCurrentStory,
        setCurrentUserStoryList,
        pauseStory
    } = useContext(storyContext);
    const { stories: selectedStories } = currentUserStoryList || {};


    let animationFrameId = useRef();

    const nextStory = useCallback(() => {
        const currIndex = selectedStories?.findIndex(s => s.id === currentStory?.id)
        setCurrentStory(selectedStories[currIndex + 1])
    }, [selectedStories, currentStory, setCurrentStory])

    const nextUserStory = useCallback(() => {
        const currIndex = stories.findIndex(s => s.id === currentUserStoryList?.id)
        setCurrentUserStoryList(stories[currIndex + 1])
    }, [stories, currentUserStoryList, setCurrentUserStoryList])

    const isLastStoryOfUser = useCallback(() => {
        const currIndex = selectedStories?.findIndex(s => s.id === currentStory?.id);
        return currIndex === selectedStories.length - 1
    }, [selectedStories, currentStory])

    const getCurrentInterval = useCallback(() => {
        return currentStory.duration ?? defaultInterval
    }, [currentStory, defaultInterval])

    const incrementCount = useCallback(() => {
        const interval = getCurrentInterval();
        const updatedCount = count + (100 / ((interval / 1000) * 60))
        setCount(updatedCount);
        if (updatedCount < 100) {
            animationFrameId.current = requestAnimationFrame(incrementCount)
        } else {
            if (isLastStoryOfUser()) {
                nextUserStory();
            } else {
                nextStory();
            }
            cancelAnimationFrame(animationFrameId.current);
        }
    }, [count, getCurrentInterval, isLastStoryOfUser, nextStory, nextUserStory])


    useEffect(() => {
        setCount(0)
    }, [currentStory, selectedStories])

    useEffect(() => {
        if (!pauseStory) {
            animationFrameId.current = requestAnimationFrame(incrementCount)
        }
        return () => {
            cancelAnimationFrame(animationFrameId.current)
        }
    }, [currentStory, currentUserStoryList, pauseStory, incrementCount])

    return (
        <div className={classes.progressArr}>
            {selectedStories?.map((_, i) =>
                <Progress
                    key={i}
                    count={count}
                    width={1 / selectedStories.length}
                    active={i + 1 === currentStory.id ? 1 : (i + 1 < currentStory.id ? 2 : 0)}
                />)}
        </div>
    )
}

export default ProgressArray;