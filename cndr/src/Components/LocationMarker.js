import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFire } from '@fortawesome/free-solid-svg-icons';

function LocationMarker({id}) {
    let FontAwesomeIcon = null;
    if(id == 1){
        FontAwesomeIcon = faFire;
    } else {
        return;
    }

    return (
        <div>
            <FontAwesomeIcon icon={faFire} className="location-icon" />
        </div>
    );
}

export default LocationMarker;