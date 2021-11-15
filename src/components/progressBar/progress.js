import React, { useContext } from 'react';
import classes from './progress.module.css';

const Progress = (props) => {
    // const { bufferAction, pause } = useContext(ProgressCtx)

    const getProgressStyle = ({ active }) => {
        switch (active) {
            case 2:
                return { width: '100%' }
            case 1:
                return { transform: `scaleX(${props.count / 100})` }
            case 0:
                return { width: 0 }
            default:
                return { width: 0 }
        }
    }

    const getProgressWrapperStyle = (width) => ({
        width: `${width * 100}%`
        // opacity: pause && !bufferAction ? 0 : 1
    })

    const { width, active } = props
    return (
        <div className={classes.progressBar} 
            style={{ ...getProgressWrapperStyle(width) }}>
            <div className={classes.inner}
                style={{ ...getProgressStyle({ active }) }} />
        </div>
    )
}

export default Progress;
