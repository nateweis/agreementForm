import React from 'react';

function Completed(){
    return(
        <div style={style.container}>
            <div className="completed">
                <div className="circle">
                    <div className="outer-circ"></div>
                    <div className="inner-circ"></div>
                    <div className="box top-left"></div>
                    <div className="box bottom-left"></div>
                    <div className="box top-right"></div>
                    <div className="box bottom-right"></div>
                    <svg className="check-mark" xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24">
                        <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"></path>
                    </svg>
                </div>
                <span className="completed-txt">Form Has Been Sent </span>
                <span className="completed-txt lower">we will contact you shortly to set up your startup </span>
            </div>
        </div>
    )
}

const style={
    container:{
        backgroundColor: 'rgb(243, 243, 243)',
        height: window.innerHeight
    }
}

export default Completed;