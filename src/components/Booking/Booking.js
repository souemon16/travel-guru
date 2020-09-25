import React, { useContext } from 'react';
import { useHistory} from 'react-router-dom';
import { placeContext } from '../../App';
import './Booking.css';

const Booking = () => {

    const History = useHistory()
    const handleSearch = () => {
        History.push(`/find-hotel`);
    };

    const [place, setPlace] = useContext(placeContext);

    return (
        <div className='container-fluid'>
            <div className="container">
                <div className="row">
                    <div className="col-md-6 description">
                        <h1>TRAVEL GURU</h1>
                        <p>Travel anywhere in Bangladesh with Travel Guru. Travel Guru makes your journey as easy as your clap. Don't be afraid for best secured hotel with best facilities. We will do this all for you. Find the best hotel and transportation with the best price. So, don't be late for travel</p>
                    </div>
                    <div className="col-md-5 booking-form">
                        <form className=''>
                            <div className='form-group'>
                                <label className='text-muted' htmlFor='origin'>
                                    Origin
                                </label>
                                <input
                                    type='text'
                                    className='form-control font-weight-bold py-4'
                                    value="Dhaka"
                                />
                            </div>
                            <div className='form-group'>
                                <label className='text-muted' htmlFor='origin'>
                                    Destination
                                </label>
                                <input
                                    type='text'
                                    className='form-control font-weight-bold py-4'
                                    value={place.place}
                                    readOnly
                                    required
                                />
                            </div>

                            <div className='row'>
                                <div className='col-6'>
                                    <div className='form-group'>
                                        <label className='text-muted'>From</label>
                                        <input
                                            type='date'
                                            className='form-control font-weight-bold py-4'
                                        />
                                    </div>
                                </div>
                                <div className='col-6'>
                                    <div className='form-group'>
                                        <label className='text-muted'>To</label>
                                        <input
                                            type='date'
                                            className='form-control font-weight-bold py-4'
                                        />
                                    </div>
                                </div>
                            </div>
                            <button type='submit' onClick={handleSearch} className='btn btn-block btn-warning font-weight-bold'> Start Booking </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Booking;