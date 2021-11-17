import React from 'react';

function Completed(){
    return(
        <div style={style.container}>
            <div className="completed">
                <span className="completed-txt">Completed!!!!</span>
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