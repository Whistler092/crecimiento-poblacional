import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import math from 'mathjs';
import { Bar } from 'react-chartjs-2';

class PopulationGrowthSimulator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            poblacionInicial: 2500,
            poblacionEnDeterminadoTiempo: 5000,
            tiempoCrecimientoInicial: 1,
            crecimientoEnTiempo: {
                tiempo: 3.583333,
                poblacionFinal: 0
            },
            crecimientoEnCantidad: {
                poblacion: 50000,
                tiempoFinal: 0
            },
            data: {
                labels: ["January", "February", "March", "April", "May", "June", "July"],
                datasets: [{
                    label: "Crecimiento Poblacional",
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: [0, 10, 5, 2, 20, 30, 45],
                }]
            }
        };
    }

    minTommss = (minutes) => {
        var sign = minutes < 0 ? "-" : "";
        var min = Math.floor(Math.abs(minutes));
        var sec = Math.floor((Math.abs(minutes) * 60) % 60);
        return sign + (min < 10 ? "0" : "") + min + ":" + (sec < 10 ? "0" : "") + sec;
    }

    calcularCrecimientoEnTiempo = (K) => {

        let h = math.parse(`${K} * ${this.state.crecimientoEnTiempo.tiempo}`).eval({});
        h = math.round(h, 4);
        console.log("h", h);
        let x = math.parse('x^' + h).eval({ x: math.e });
        x = math.round(x, 4)
        console.log("x", x);

        let P = this.state.poblacionInicial * x;
        P = math.round(P, 4);

        this.setState(prevState => ({
            crecimientoEnTiempo: {
                ...prevState.crecimientoEnTiempo,
                poblacionFinal: P
            }
        }))

        console.log("Población en " + this.state.crecimientoEnTiempo.poblacionFinal, P);

    }

    calcularDiferencias = () => {
        const diferenciaPoblacion = this.state.poblacionEnDeterminadoTiempo / this.state.poblacionInicial;
        console.log("diferencia poblaciónInicial vs población en un periodo del tiempo", diferenciaPoblacion);
        let K = math.log(diferenciaPoblacion, math.e) * this.state.tiempoCrecimientoInicial;
        K = math.round(K, 4)
        console.log("math.log 2: ", K);

        return K;
    }

    calcularCrecimientoEnCantidad = (K) => {
        // ¿Cuanto tardaría en completar N bacterias?
        let diferenciaTiempo = this.state.crecimientoEnCantidad.poblacion / this.state.poblacionInicial;
        let tiempo = math.log(diferenciaTiempo, math.e) / K;
        console.log("tiempo", tiempo);

        this.setState(prevState => ({
            crecimientoEnCantidad: {
                ...prevState.crecimientoEnCantidad,
                tiempoFinal: tiempo
            }
        }))
        
    }

    componentWillMount() {
        const K = this.calcularDiferencias();
        this.calcularCrecimientoEnTiempo(K);
        this.calcularCrecimientoEnCantidad(K);

        /* const diferenciaPoblacion = this.state.poblacionEnDeterminadoTiempo / this.state.poblacionInicial;
        console.log("diferencia poblaciónInicial vs población en un periodo del tiempo", diferenciaPoblacion);
        let K = math.log(diferenciaPoblacion, math.e) * this.state.tiempoCrecimientoInicial;
        K = math.round(K, 4)
        console.log("math.log 2: ", K);

        let h = math.parse(`${K} * ${this.state.tiempoCrecimientoX}`).eval({});
        h = math.round(h, 4);
        console.log("h", h);
        let x = math.parse('x^' + h).eval({ x: math.e });
        x = math.round(x, 4)
        console.log("x", x);

        let P = this.state.poblacionInicial * x;
        P = math.round(P, 4);

        console.log("Población en " + this.state.tiempoCrecimientoX, P); */


    }
    render() {
        let tiempo2 = `población en tiempo ${this.minTommss(this.state.tiempoCrecimientoInicial)} ${this.state.tiempoCrecimientoInicial > 1 ? 'Horas' : 'Hora'}: ${new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(this.state.poblacionEnDeterminadoTiempo)}`;
/*
crecimientoEnTiempo: {
                tiempo: 3.583333,
                poblacionFinal: 0
            },
            crecimientoEnCantidad: {
                poblacion: 50000,
                tiempoFinal: 0
            },
*/
        let data = this.state.data;
        console.log("state", this.state);
        return (
            <Grid>
                <Row className="show-grid">
                    <Col xs={12} md={12} lg={12}>
                        <h1>Simulador de Crecimiento poblacional de Bacterias</h1>
                        <p>La población de una determinada comunidad de bacterias es de: 2.500, el número de bacterias se duplica despues de una hora.</p>
                        <p>Población Inicial: {new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(this.state.poblacionInicial)} Bacterias</p>
                        <p>{tiempo2} Bacterias</p>
                        <p>Población en {this.minTommss(this.state.crecimientoEnTiempo.tiempo)} {this.state.crecimientoEnTiempo.tiempo > 1 ? 'Horas' : 'Hora'}: {new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(this.state.crecimientoEnTiempo.poblacionFinal)} </p>
                        <p>¿Cuanto tardaría en completar {new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(this.state.crecimientoEnCantidad.poblacion)} bacterias?</p>
                        <p>tardaría {this.minTommss(this.state.crecimientoEnCantidad.tiempoFinal)} {this.state.crecimientoEnCantidad.tiempoFinal > 1 ? 'Horas' : 'Hora'}</p>
                        <Bar data={data} />
                    </Col>
                </Row>
            </Grid>
        );
    }
}

export default PopulationGrowthSimulator;
