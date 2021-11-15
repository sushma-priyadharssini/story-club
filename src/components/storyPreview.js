import React, { useContext } from 'react';
import classes from './storyPreview.module.css';
import storyContext from '../store/storyContext';

const StoryPreview = (props) => {
    const { setCurrentUserStorySetId } = useContext(storyContext);
    const showStory = () => {
        setCurrentUserStorySetId(props.story.id);
    }
    return (
        <span 
            className={classes.storyCircle} 
            style={{ backgroundColor: props.story.stories[0].color }}
            onClick={showStory.bind(this)}>
        </span>
    )
}

export default  StoryPreview;