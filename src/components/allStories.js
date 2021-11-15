import React, { useContext } from 'react';
import storyContext from '../store/storyContext';
import StoryPreview from './storyPreview';
import classes from './allStories.module.css';

const AllStories = () => {
    const { stories } = useContext(storyContext);
    return (
        <ul className={classes.allStoriesContainer}>
            {stories.map((story) => (
                <StoryPreview key={story.id} story={story} />
            ))}
        </ul>
    )
}

export default AllStories;