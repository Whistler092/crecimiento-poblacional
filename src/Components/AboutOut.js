import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

class AboutOut extends Component {
    state = {}
    render() {
        return (
            <Grid>
                <Row className="show-grid">
                    <Col xs={12} md={12} lg={12}>
                        <h1>Creado por:</h1>
                        <p>Camilo Quintero</p>
                        <p>David Leandro Zuluaga</p>
                        <p>Ramiro Andrés Bedoya E.</p>
                        </Col>
                </Row>
            </Grid>
        );
    }
}

export default AboutOut;