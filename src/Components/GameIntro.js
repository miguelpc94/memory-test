import React from 'react';

const GameIntro = (props) => {
    if (props.gameState==='start') {
        return (
        <>
            <p className={'game-intro-header'}>
                How to play:
            </p>
            <p className={'game-intro'}>
                A sequence of buttons will flash. 
                You should memorize and repeat it right after.
                The higher the level you reach, the longer is the sequence.
                See how far you can get.
            </p>
        </>
        );
    }
    return "";
}

export default GameIntro;