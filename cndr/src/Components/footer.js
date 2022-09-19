import React from 'react';

function Info(props) {
    function Value(props){
        if(Object.keys(props.fires).length===0){
            return <div></div>;
        }
        else{
            return props.fires.map(fire => (
                <div>{fire.title} {fire.radius} {fire.dangerLevel}</div>
            ));
        }

    }
    return (
        <div class="info">
            {Value(props)}
        </div>
    )
}


export default Info;