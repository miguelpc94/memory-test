import React from 'react';

const StateDependentButton = (props) => {
    if (props.actualState===props.dependsOn) {
        return (
            <div 
                className="state-button"
                onClick={props.onClick}
            >{props.text}
            </div>
        );
    }
    return '';
}

export default StateDependentButton;