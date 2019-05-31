import React from 'react';
import GameButton from './GameButton';

const buttonColors = [
    [0x7F,0xDB,0xFF],
    [0xFF,0xDC,0x00],
    [0x01,0xFF,0x70],
    [0xF0,0x12,0xBE],
    [0x39,0xCC,0xCC],
    [0xB1,0x0D,0xC9],
    [0xFF,0x85,0x1B],
    [0x00,0x74,0xD9],
    [0xFF,0x41,0x36]
];

const ButtonBoard = (props) => {

    const buttonClick = (number) => {
        console.log(number)
    };

    let buttons = [];
    for (let number=0; number<9; number++) {
        buttons.push(
            <GameButton 
                key={number}
                color={buttonColors[number]} 
                activeNumber={props.activeNumber} 
                number={number+1} onClick={buttonClick} 
            />
        );
    }

    return (
        <div className="button-board">
            {buttons}
        </div>
    );
}

export default ButtonBoard;