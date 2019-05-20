import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

import math from 'mathjs';
import { Bar } from 'react-chartjs-2';
import PopulationForm from './PopulationForm';

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
                poblacion: 80000,
                tiempoFinal: 0
            },
            data: {
                labels: [3.583333, 2.583333, 1.583333, 0.5833330000000001, -0.4166669999999999],
                datasets: [{
                    label: "Crecimiento Poblacional",
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: [0, 10, 5, 2, 20],
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
        let x = math.parse('x^' + h).eval({ x: math.e });
        x = math.round(x, 4)

        let P = this.state.poblacionInicial * x;
        P = math.round(P, 4);

        this.setState(prevState => ({
            crecimientoEnTiempo: {
                ...prevState.crecimientoEnTiempo,
                poblacionFinal: P
            }
        }));
    }

    calcularDiferencias = () => {
        const diferenciaPoblacion = this.state.poblacionEnDeterminadoTiempo / this.state.poblacionInicial;
        /* console.log("diferencia poblaciónInicial vs población en un periodo del tiempo", diferenciaPoblacion); */
        let K = math.log(diferenciaPoblacion, math.e) * this.state.tiempoCrecimientoInicial;
        K = math.round(K, 4)

        return K;
    }

    calcularCrecimientoEnCantidad = (K) => {
        // ¿Cuanto tardaría en completar N bacterias?
        let diferenciaTiempo = this.state.crecimientoEnCantidad.poblacion / this.state.poblacionInicial;
        let tiempo = math.log(diferenciaTiempo, math.e) / K;

        let poblacion = this.state.crecimientoEnCantidad.poblacion;
        console.log(`¿Cuanto tardaría en completar ${poblacion} bacterias?`, tiempo);

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

        this.graficar(K);

    }

    graficar = (K) => {

        let crecimientoEnTiempo = this.state.crecimientoEnTiempo.tiempo;
        let tiempoCrecimientoInicial = this.state.tiempoCrecimientoInicial;

        let count = crecimientoEnTiempo;
        let labels = [];
        
        let fistCalc = this.calcularCrecimientoEnIntervalos(K, crecimientoEnTiempo);
        let dataFields = [fistCalc];
        labels.push(this.minTommss(count));

        while (count >= 0) {
            if (crecimientoEnTiempo > tiempoCrecimientoInicial) {
                count--;
                if(count < 0){
                    labels.push(this.minTommss(0));
                }else {
                    labels.push(this.minTommss(count));
                }
                
                let poblacion = this.calcularCrecimientoEnIntervalos(K, count);

                dataFields.push(poblacion);
            }
        }

        let datasetsLocal = [{
            label: "Crecimiento Poblacional",
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: dataFields.reverse(),
        }];
        console.log("data", datasetsLocal);

        this.setState(prevState => ({
            data: {
                ...prevState.data,
                labels: labels.reverse(),
                datasets: datasetsLocal
            }
        }))


        console.log("state", this.state)
    }

    calcularCrecimientoEnIntervalos = (K, tiempo) => {
        let h = math.parse(`${K} * ${tiempo}`).eval({});
        h = math.round(h, 4);
        let x = math.parse('x^' + h).eval({ x: math.e });
        x = math.round(x, 4)

        let P = this.state.poblacionInicial * x;
        P = math.round(P, 4);
        return P
    }

    handleSaveForm = (values) => {
        var tiempoCrecimientoInicial = parseInt(values.tiempoCrecimientoInicial_horas) + (parseInt(values.tiempoCrecimientoInicial_minutos) / 60) + (parseInt(values.tiempoCrecimientoInicial_segundos) / 3600);
        var crecimientoEnTiempo = parseInt(values.crecimientoEnTiempo_horas) + (parseInt(values.crecimientoEnTiempo_minutos) / 60) + (parseInt(values.crecimientoEnTiempo_segundos) / 3600);


        this.setState(prevState => ({
            poblacionInicial: values.poblacionInicial,
            poblacionEnDeterminadoTiempo: values.poblacionEnDeterminadoTiempo,
            tiempoCrecimientoInicial: tiempoCrecimientoInicial,
            crecimientoEnCantidad: {
                ...prevState.crecimientoEnCantidad,
                poblacion: values.crecimientoEnCantidad_poblacion
            },
            crecimientoEnTiempo: {
                ...prevState.crecimientoEnTiempo,
                tiempo: crecimientoEnTiempo
            }
        }));

        const K = this.calcularDiferencias();
        this.calcularCrecimientoEnTiempo(K);
        this.calcularCrecimientoEnCantidad(K);
        this.graficar(K);
    }

    render() {
        let tiempo2 = `población en tiempo ${this.minTommss(this.state.tiempoCrecimientoInicial)} ${this.state.tiempoCrecimientoInicial > 1 ? 'Horas' : 'Hora'}: ${new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(this.state.poblacionEnDeterminadoTiempo)}`;

        let data = this.state.data;
        let initialValues = this.state;

        return (
            <Grid>
                <Row className="show-grid">
                    <Col xs={12} md={12} lg={12}>
                        <h2>Simulador de Crecimiento poblacional de Bacterias</h2>
                        <hr></hr>
                        <PopulationForm handleSaveForm={this.handleSaveForm} initial={initialValues} />
                        <p>La población de una determinada comunidad de bacterias es de: {new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(this.state.poblacionInicial)}, el número de bacterias se duplica despues de una hora.</p>
                        <p>Población Inicial: {new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(this.state.poblacionInicial)} Bacterias</p>
                        <p>{tiempo2} Bacterias</p>
                        <p>Población en {this.minTommss(this.state.crecimientoEnTiempo.tiempo)} {this.state.crecimientoEnTiempo.tiempo > 1 ? 'Horas' : 'Hora'}: {new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(this.state.crecimientoEnTiempo.poblacionFinal)} Bacterias</p>
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
