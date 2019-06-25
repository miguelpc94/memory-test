import React,{useContext} from 'react';
import {ConfigContext} from './MemoryGame';

const GameIntro = () => {

    const context = useContext(ConfigContext);

    if (context.gameState==='start') {
        return (
            <div className='row'>
                <div className='col-10 center-block'>
                    <br />
                    <p className='game-intro-header'>How to play:</p>
                    <p className='game-intro'>
                        A sequence of buttons will flash. 
                        You should memorize and repeat it right after.
                        The higher the level you reach, the longer is the sequence.
                        See how far you can get.
                    </p>
                </div>
            </div>
        );
    }
    return "";
}

export default GameIntro;