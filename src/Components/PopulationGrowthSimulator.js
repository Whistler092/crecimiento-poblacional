import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
/* require('mathjs-simple-integral');
 */
class PopulationGrowthSimulator extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillMount(){
        /* console.log("math", math); */
        /* var math = math.import(require('mathjs-simple-integral'));
        math.integral('x^2', 'x') */
    }
    render() {
        return (
            <Grid>
                <Row className="show-grid">
                    <Col xs={12} md={12} lg={12}>
                        <h1>I'm PopulationGrowthSimulator</h1>
                        {/* <form onSubmit={this.handleSubmit}>
                        </form> */}
                        {}
                    </Col>
                </Row>
            </Grid>
        );
    }
}

export default PopulationGrowthSimulator;
