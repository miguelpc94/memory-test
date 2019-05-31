import React from 'react';

const MessageDisplay = (props) => {

    switch(props.gameState) {
        case 'observe':
            return (
                <p className='game-message'>
                    Observe
                </p>
            );
        case 'replicate':
            return (
                <p className='game-message'>
                    Replicate
                </p>
            );
        case 'congrats':
            return (
                <p className='game-message'>
                    Well done!
                </p>
            );
        case 'end':
            return (
                <p className='game-message'>
                    Wrong sequence
                </p>
            );
        default:
            return '';
    }
}

export default MessageDisplay;