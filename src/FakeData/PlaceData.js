import { useContext } from 'react';
import { placeContext } from '../App';

const [place, setPlace] = useContext(placeContext);

const placeData = [
    {
        id: 1,
        name: 'Sajek',
        lat: "23.307419°",
        lng: '92.189155°'
    },
    {
        id: 2,
        name: 'Sreemangal',
        lat: '24.302905°',
        lng: '91.792124°'
    },
    {
        id: 3,
        name: 'Sundorbon',
        lat: '25.05748°',
        lng: '88.28261°'
    }
];
setPlace(placeData);

export default PlaceData;