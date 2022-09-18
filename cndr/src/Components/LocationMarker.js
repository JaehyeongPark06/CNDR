import React from 'react';
import {Icon} from '@iconify/react';
import fireImage from '@iconify/icons-emojione/fire';

function LocationMarker({lat, lng, onClick, id}) {
    let renderIcon = null;
    if(id === 1){
        renderIcon = fireImage
    } else {
        return;
    }

    return (
        <div onClick={onClick}>
            <Icon icon={renderIcon} className="location-icon" />
        </div>
    );
}

export default LocationMarker;