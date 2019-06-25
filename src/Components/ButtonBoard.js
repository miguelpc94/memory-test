import React,{ useState, useEffect, useContext } from 'react';
import GameButton from './GameButton';
import {ConfigContext} from './MemoryGame';

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

const ButtonBoard = () => {

    const context = useContext(ConfigContext);

    const [activeNumber, setActiveNumber] = useState(0);
    const [buttonSequence, setButtonSequence] = useState({sequenceAhead: [], next: -1});
    const [userSequence, setUserSequence] = useState([]);
    const [correctSequence, setCorrectSequence] = useState([]);

    const generateNumber = () => {
        return (1+Math.floor(Math.random()*9));
    }

    // Determines what happens when the component is rendered and when to re-render
    useEffect(() => {
        const buttonBoardStateControl = (newState) => {
            context.dispatchGameState({
                type: 'buttonBoardControl',
                data: newState
            });
        }
        const generateNumberSequence = (sequenceSize) => {
            let numberSequence = [];
            let lastNumber=null;
            for (let index=0; index<sequenceSize; index++) {
                let randomNumber=generateNumber();
                while (randomNumber===lastNumber) randomNumber=generateNumber();
                lastNumber=randomNumber;
                numberSequence.push(randomNumber);
            }
            return numberSequence;
        };
        const generateButtonSequence = () => {
            let buttonSequence = generateNumberSequence(1+context.gameLevel);
            let [next,...sequenceAhead] = [...buttonSequence];
            sequenceAhead.push(0);
            sequenceAhead.push(null);
            setCorrectSequence(buttonSequence);
            return {sequenceAhead, next};
        }; 
        const userIsWrong = () => {
            if (userSequence.length===0) return false;
            for (let index=0; index<userSequence.length; index++) {
                if (userSequence[index]!==correctSequence[index]) return true;
            }
            return false;
        };
        const userIsDoneAndRight = () => {
            if (!userIsWrong) return false;
            if (userSequence.length===correctSequence.length) return true;
        };
        const sequenceNextButton = () => {
            let sequenceAhead = buttonSequence.sequenceAhead;
            let next = sequenceAhead.shift();
            setActiveNumber(buttonSequence.next);
            setButtonSequence({sequenceAhead, next});
        };
        if (context.gameState==='replicate' && userIsWrong()) {
            buttonBoardStateControl('end');
            setButtonSequence({sequenceAhead: [], next: -1});
            return;
        }
        if (context.gameState==='replicate' && userIsDoneAndRight()) {
            buttonBoardStateControl('congrats');
            setButtonSequence({sequenceAhead: [], next: -1});
            return;
        }
        if (context.gameState==='observe' && buttonSequence.next!==-1 && buttonSequence.next!==null) {
            const timeoutId = setTimeout(() => sequenceNextButton(),1000);
            return () => clearTimeout(timeoutId);
        }
        if (context.gameState==='observe' && buttonSequence.next===null) {
            buttonBoardStateControl('replicate');
            setButtonSequence({sequenceAhead: [], next: -1});
            setActiveNumber(0);
            return;
        }
        if (context.gameState==='observe' && buttonSequence.next===-1) {
            setButtonSequence(generateButtonSequence());
            setUserSequence([]);
            setActiveNumber(0);
            return;
        }
    }, [ buttonSequence, userSequence, correctSequence, context]);

    // Determines what happens when you click the buttons
    let buttonClick;
    if (context.gameState==='replicate') {
        buttonClick = (number) => {
            if (userSequence[userSequence.length-1]!==number) {
                setActiveNumber(number);
                setUserSequence(userSequence.concat(number));
            }
        };
    }
    else {
        buttonClick = (number) => null;
    }

    // Lay the buttons on the board
    let buttons = [];
    for (let number=0; number<9; number++) {
        buttons.push(
            <GameButton 
                key={number}
                color={buttonColors[number]} 
                activeNumber={activeNumber} 
                number={number+1} onClick={buttonClick}
            />
        );
    }

    return (
        <div className='row'>
            <div className="col-4 button-board center-block">
                {buttons}
            </div>
        </div>
    );
}

export default ButtonBoard;