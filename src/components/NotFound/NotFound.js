import React from 'react';
import { Jumbotron, Container } from 'react-bootstrap';

const NotFound = () => {
    return (
        <div>
            <Jumbotron fluid>
                <Container>
                    <h1 className='text-danger'>404 Error</h1>
                    <p>
                        The page is not found. 404 ERROR
                     </p>
                </Container>
            </Jumbotron>
        </div>
    );
};

export default NotFound;