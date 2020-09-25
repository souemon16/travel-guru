import React, { useContext } from 'react';
import './Home.css';
import sajek from '../../Image/Sajek.png';
import sreemongol from '../../Image/Sreemongol.png';
import sundorbon from '../../Image/sundorbon.png';
import { Button, Card } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';
import { placeContext } from '../../App';

const Home = () => {
    const [place, setPlace] = useContext(placeContext);

    const History = useHistory();
    const handleBooking = (id) => {
        History.push(`/booking/${id}`);
    }

    let { id } = useParams();
    return (
        <main>
            <div className="container-fluid container-item">
                <div className="row">
                    <div className="col-md-4 description" style={{ textAlign: 'center', margin: 'auto 0px' }}>
                        <h1 className="text-white">Travel Guru</h1>
                        <p className="text-white">Travel anywhere in Bangladesh with Travel Guru. Find the best hotel and transportation with the best price. So, don't be late for travel...</p>
                    </div>

                    <div class=" col-md-2 card-body">
                        <Card style={{ width: '18rem', borderRadius: '5px', backgroundColor: 'rgba(0,0,0,0)', border: 'none' }}>
                            <Card.Img variant="top" src={sajek} />
                            <Card.Body>
                                <Card.Title style={{ textAlign: 'center', fontSize: '30px', fontFamily: 'Bebas Neue' }}>Sajek</Card.Title>
                                <Button onClick={() => {
                                    handleBooking(1);
                                    setPlace({place: 'Sajek', id: 1, lat: 23.307419, lng: 92.189155 });
                                }} style={{ margin: '0px auto', display: 'block' }} variant="warning">Book Now</Button>
                            </Card.Body>
                        </Card>
                    </div>
                    <div class=" col-md-2 card-body">
                        <Card style={{ width: '18rem', borderRadius: '5px', backgroundColor: 'rgba(0,0,0,0)', border: 'none', marginLeft: '70px' }}>
                            <Card.Img variant="top" src={sreemongol} />
                            <Card.Body>
                                <Card.Title style={{ textAlign: 'center', fontSize: '30px', fontFamily: 'Bebas Neue' }}>Sreemongol</Card.Title>
                                <Button onClick={() => {
                                    handleBooking(2);
                                    setPlace({place: 'Sreemongol', id: 2, lat: 24.302905, lng: 91.792124});
                                }} style={{ margin: '0px auto', display: 'block' }} variant="warning">Book Now</Button>
                            </Card.Body>
                        </Card>
                    </div>
                    <div class=" col-md-2 card-body">
                        <Card style={{ width: '18rem', borderRadius: '5px', backgroundColor: 'rgba(0,0,0,0)', border: 'none', marginLeft: '140px' }}>
                            <Card.Img variant="top" src={sundorbon} />
                            <Card.Body>
                                <Card.Title style={{ textAlign: 'center', fontSize: '30px', fontFamily: 'Bebas Neue' }}>Sundorbon</Card.Title>
                                <Button onClick={() => {
                                    handleBooking(3);
                                    setPlace({place: 'Sundorbon', id: 3, lat: 25.05748, lng: 88.28261});
                                }} style={{ margin: '0px auto', display: 'block' }} variant="warning">Book Now</Button>
                            </Card.Body>
                        </Card>
                    </div>

                </div>
            </div>
        </main>
    );
};

export default Home;