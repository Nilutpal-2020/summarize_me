import React from 'react';

import './ErrorNotice.css';

const errorNotice = (props) => {
    const color = ["error_box", "alert"];
    color.push(props.noticeColor);

    return (
        <div className={color.join(' ')}>
            <span className="error_texts">{props.message}</span>
            <button onClick={props.clearError} className="error_close">
                <ion-icon name="close-outline"></ion-icon>
            </button>
        </div>
    );
}

export default errorNotice;