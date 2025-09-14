import React, { useContext } from 'react';
import classes from './storyPreview.module.css';
import storyContext from '../store/storyContext';

const StoryPreview = (props) => {
    const { setCurrentUserStoryList } = useContext(storyContext);
    const showStory = () => {
        setCurrentUserStoryList(props.story);
    }
    return (<>
        <div className={classes.outerStoryCircle} >
            <div
                className={classes.innerStoryCircle}
                onClick={showStory}
                style={{ backgroundColor: props.story.stories[0].color }}></div>
        </div>
    </>

    )
}

export default StoryPreview;