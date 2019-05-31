import React from 'react';

const ShowLevel = (props) => {
    switch(props.gameState) {
        case 'observe':
            return (
                <p>
                    {`Level ${props.gameLevel}`}
                </p>
            );
        case 'replicate':
            return (
                <p>
                    {`Level ${props.gameLevel}`}
                </p>
            );
        case 'end':
            return (
                <p>
                    {`You've reached level ${props.gameLevel}`}
                </p>
            );
        case 'congrats':
            return (
                <p>
                    {`You've reached level ${props.gameLevel}`}
                </p>
            );
        default:
            return '';
    }
};

export default ShowLevel;