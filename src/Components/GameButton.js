import React from 'react';

const GameButton = (props) => {
    let color = props.color;

    const dimColor = () => {
        return color.map((color) => color*0.5);
    }

    color = props.activeNumber!==props.number ? dimColor() : color;

    return (
        <div 
            className="game-button" 
            onClick={() => props.onClick(props.number)}
            style={{background: `rgb(${color[0]},${color[1]},${color[2]})`}}
        />
    );
}

export default GameButton;