import React, { useContext } from 'react';
import {ConfigContext} from './useGameState';

const ShowLevel = () => {

    const context = useContext(ConfigContext);

    switch(context.gameState) {
        case 'observe':
            return (
                <p>
                    {`Level ${context.gameLevel}`}
                </p>
            );
        case 'replicate':
            return (
                <p>
                    {`Level ${context.gameLevel}`}
                </p>
            );
        case 'end':
            return (
                <p>
                    {`You've reached level ${context.gameLevel}`}
                </p>
            );
        case 'congrats':
            return (
                <p>
                    {`You've passed level ${context.gameLevel}`}
                </p>
            );
        default:
            return '';
    }
};

export default ShowLevel;