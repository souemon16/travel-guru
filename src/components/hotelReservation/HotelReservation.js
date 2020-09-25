import React, { useContext } from 'react';
import './HotelReservation.css';
import star from '../../Image/Icons/star.png';
import hotel1 from '../../Image/hotel1.png';
import hotel2 from '../../Image/hotel2.png';
import hotel3 from '../../Image/hotel3.png';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { placeContext } from '../../App';

const HotelReservation = () => {
    const [ place, setPlace] = useContext(placeContext);

    const mapStyles = {
        height: "100vh",
        width: "100%"
    };

    const defaultCenter = {
        lat: 21.4394636,
        lng: 92.00773159999994
    }
    return (
        <div className="container">
            <div className='row mt-3 d-flex justify-content-center align-items-center'>
                <div className="col-md-7">
                    <p className='text-muted'>252 Stays Apr 13-17 252 guests</p>
                    <div className="row">
                        <h3>Stay In {place.place}</h3>
                        <div className="row mt-4 mb-4 mr-3">
                            <div className="col-md-6 card-img"> <img src={hotel1} alt="hotel-img" /></div>
                            <div className="col-md-6 card-details">
                                <h4>Light Bright Airy Stylish Apartment</h4>
                                <p className="text-muted">Guests 6 Bedrooms 3 Beds 3 Baths 2</p>
                                <p className="text-muted">Wifi Air Condition kitchen</p>
                                <p className="text-muted">Cancellation flexibility available</p>
                                <span className='font-weight-bold'> <img style={{ marginBottom: '5px', height: '16px', width: '15px' }} src={star} alt="icon-star" /> 4.5/(20)</span>
                                <span className='float-right font-weight-bold'>$70/<span className='text-muted'>Night $167 total</span></span>
                            </div>
                        </div>
                        <div className="row mb-4">
                            <div className="col-md-6 card-img"> <img src={hotel2} alt="hotel-img" /></div>
                            <div className="col-md-6 card-details">
                                <h4>Apartment in lost Panorama</h4>
                                <p className="text-muted">Guests 4 Bedrooms 2 Beds 2 Baths 2</p>
                                <p className="text-muted">Wifi Air Condition kitchen</p>
                                <p className="text-muted">Cancellation flexibility available</p>
                                <span className='font-weight-bold'> <img style={{ marginBottom: '5px', height: '16px', width: '15px' }} src={star} alt="icon-star" /> 4.6/(10)</span>
                                <span className='float-right font-weight-bold'>$54/<span className='text-muted'>Night $134 total</span></span>
                            </div>
                        </div>
                        <div className="row mb-4 mr-3">
                            <div className="col-md-6 card-img"> <img src={hotel3} alt="hotel-img" /></div>
                            <div className="col-md-6 float-right card-details">
                                <h4>Ar Lounge And Pool (Couple)</h4>
                                <p className="text-muted">Guests 2 Bedrooms 1 Beds 1 Baths 1</p>
                                <p className="text-muted">Enjoy the refreshments of nature.</p>
                                <p className="text-muted">Cancellation flexibility available</p>
                                <span className='font-weight-bold'> <img style={{ marginBottom: '5px', height: '16px', width: '15px' }} src={star} alt="icon-star" /> 4.9/(59)</span>
                                <span className='float-right font-weight-bold'>$44/<span className='text-muted'>Night $99 total</span></span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-5">
                    <LoadScript googleMapsApiKey='AIzaSyDsFZkPG5TwCqnutM9H6q8GYj7chJtfOMU'>
                        <GoogleMap
                            mapContainerStyle={mapStyles}
                            zoom={14}
                            center={defaultCenter} />
                    </LoadScript>
                </div>
            </div>
        </div>
    );
};

export default HotelReservation;