import React, { useContext } from 'react';
import {ConfigContext} from './useGameState';

const MessageDisplay = () => {

    const context = useContext(ConfigContext);

    switch(context.gameState) {
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