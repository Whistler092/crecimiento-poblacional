import React from 'react';
import { Formik } from 'formik';
import { FormGroup, InputGroup, FormControl, Col } from 'react-bootstrap';
 
const minTommss = (minutes) => {
    var sign = minutes < 0 ? "-" : "";
    var min = Math.floor(Math.abs(minutes));
    var sec = Math.floor((Math.abs(minutes) * 60) % 60);
    let result = sign + (min < 10 ? "0" : "") + min + ":" + (sec < 10 ? "0" : "") + sec;

    return {
        hours : result.substring(0,2),
        minutes: result.substring(3,5),
        seconds : "00"
    }
}

const PopulationForm = ({ handleSaveForm, initial }) => {

    let tiempoCrecimiento = minTommss(initial.tiempoCrecimientoInicial); 
    let crecimientoEnTiempo = minTommss(initial.crecimientoEnTiempo.tiempo); 

    let initialValues = {
        poblacionInicial: initial.poblacionInicial,
        poblacionEnDeterminadoTiempo: initial.poblacionEnDeterminadoTiempo,
        tiempoCrecimientoInicial_tiempo: initial.tiempoCrecimientoInicial,
        tiempoCrecimientoInicial_horas: tiempoCrecimiento.hours,
        tiempoCrecimientoInicial_minutos: tiempoCrecimiento.minutes,
        tiempoCrecimientoInicial_segundos: tiempoCrecimiento.seconds,
        crecimientoEnTiempo_tiempo: initial.crecimientoEnTiempo.tiempo,
        crecimientoEnTiempo_horas: crecimientoEnTiempo.hours,
        crecimientoEnTiempo_minutos: crecimientoEnTiempo.minutes,
        crecimientoEnTiempo_segundos: crecimientoEnTiempo.seconds,
        crecimientoEnCantidad_poblacion: initial.crecimientoEnCantidad.poblacion
    };
    return (
        <div>
            <Formik
                initialValues={initialValues}
                validate={values => {
                    let errors = {};
                    if (!values.poblacionInicial) {
                        errors.poblacionInicial = 'Required';
                    }

                    if (!values.poblacionEnDeterminadoTiempo) {
                        errors.poblacionEnDeterminadoTiempo = 'Required';
                    }

                    if (!values.tiempoCrecimientoInicial_tiempo) {
                        errors.tiempoCrecimientoInicial_tiempo = 'Required';
                    }

                    if (values.tiempoCrecimientoInicial_horas  === '') {
                        errors.tiempoCrecimientoInicial_horas = 'Required';
                    }

                    if (values.tiempoCrecimientoInicial_minutos === '') {
                        errors.tiempoCrecimientoInicial_minutos = 'Required';
                    }

                    if (!values.crecimientoEnTiempo_tiempo) {
                        errors.crecimientoEnTiempo_tiempo = 'Required';
                    }

                    if (values.crecimientoEnTiempo_horas  === '') {
                        errors.crecimientoEnTiempo_horas = 'Required';
                    }

                    if (values.crecimientoEnTiempo_minutos === '') {
                        errors.crecimientoEnTiempo_minutos = 'Required';
                    }

                    if (!values.crecimientoEnCantidad_poblacion) {
                        errors.crecimientoEnCantidad_poblacion = 'Required';
                    }

                    return errors;
                }}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                    console.log("submitting ...");
                    setSubmitting(false);
                    handleSaveForm(values);

                    /* resetForm(initialValues); */

                }}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                }) => (

                        <form onSubmit={handleSubmit}>
                            <FormGroup>
                                <InputGroup>
                                    <InputGroup.Addon>Población Inicial de </InputGroup.Addon>
                                    <FormControl type="number" id="poblacionInicial" name="poblacionInicial"
                                        onChange={handleChange} onBlur={handleBlur} value={values.poblacionInicial}
                                        placeholder="Digita la cantidad inicial de Población" />
                                    <InputGroup.Addon>Bacterias</InputGroup.Addon>
                                    <span >{errors.poblacionInicial && touched.poblacionInicial && errors.poblacionInicial}</span>

                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                <InputGroup>
                                    <InputGroup.Addon>Tiempo 1 (HH:MM:SS)</InputGroup.Addon>
                                    <Col xs={10} md={10} lg={10}>
                                        <Col xs={4} md={4} lg={4}>
                                            <FormControl type="number" id="tiempoCrecimientoInicial_horas" name="tiempoCrecimientoInicial_horas"
                                                onChange={handleChange} onBlur={handleBlur} value={values.tiempoCrecimientoInicial_horas}
                                                placeholder="Horas" /></Col>
                                        <Col xs={4} md={4} lg={4}>
                                            <FormControl type="number" id="tiempoCrecimientoInicial_minutos" name="tiempoCrecimientoInicial_minutos"
                                                onChange={handleChange} onBlur={handleBlur} value={values.tiempoCrecimientoInicial_minutos}
                                                placeholder="Minutos" /></Col>
                                        <Col xs={4} md={4} lg={4}>
                                            <FormControl type="number" id="tiempoCrecimientoInicial_segundos" name="tiempoCrecimientoInicial_segundos"
                                                onChange={handleChange} onBlur={handleBlur} value={values.tiempoCrecimientoInicial_segundos}
                                                placeholder="Segundos" /></Col>
                                    </Col>
                                    <span >{errors.tiempoCrecimientoInicial_tiempo && touched.tiempoCrecimientoInicial_horas && touched.tiempoCrecimientoInicial_minutos && touched.tiempoCrecimientoInicial_segundos}</span>
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                <InputGroup>
                                    <InputGroup.Addon>Población En Tiempo 1</InputGroup.Addon>
                                    <FormControl type="number" id="poblacionEnDeterminadoTiempo" name="poblacionEnDeterminadoTiempo"
                                        onChange={handleChange} onBlur={handleBlur} value={values.poblacionEnDeterminadoTiempo}
                                        placeholder="Digita La población Tiempo 1" />
                                </InputGroup>
                            </FormGroup>
                            <hr></hr>
                            <FormGroup>
                                <InputGroup>
                                    <InputGroup.Addon>¿Cuanta población crecerá en el siguiente tiempo: </InputGroup.Addon>
                                    <Col xs={12} md={12} lg={12}>
                                        <Col xs={4} md={4} lg={4}>
                                            <FormControl type="number" id="crecimientoEnTiempo_horas" name="crecimientoEnTiempo_horas"
                                                onChange={handleChange} onBlur={handleBlur} value={values.crecimientoEnTiempo_horas}
                                                placeholder="Horas" /></Col>
                                        <Col xs={4} md={4} lg={4}>
                                            <FormControl type="number" id="crecimientoEnTiempo_minutos" name="crecimientoEnTiempo_minutos"
                                                onChange={handleChange} onBlur={handleBlur} value={values.crecimientoEnTiempo_minutos}
                                                placeholder="Minutos" /></Col>
                                        <Col xs={4} md={4} lg={4}>
                                            <FormControl type="number" id="crecimientoEnTiempo_segundos" name="crecimientoEnTiempo_segundos"
                                                onChange={handleChange} onBlur={handleBlur} value={values.crecimientoEnTiempo_segundos}
                                                placeholder="Segundos" /></Col>
                                    </Col>
                                    <InputGroup.Addon> (HH:MM:SS)?</InputGroup.Addon>
                                    <span >{errors.crecimientoEnTiempo_tiempo && touched.crecimientoEnTiempo_horas && touched.crecimientoEnTiempo_minutos && touched.crecimientoEnTiempo_segundos}</span>
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                <InputGroup>
                                    <InputGroup.Addon>¿Cuanto tardaría en completar</InputGroup.Addon>
                                    <FormControl type="number" id="crecimientoEnCantidad_poblacion" name="crecimientoEnCantidad_poblacion"
                                        onChange={handleChange} onBlur={handleBlur} value={values.crecimientoEnCantidad_poblacion}
                                        placeholder="Digita La población Tiempo 1" />
                                    <InputGroup.Addon>bacterias?</InputGroup.Addon>
                                </InputGroup>
                            </FormGroup>
                            <button type="submit" disabled={isSubmitting} >Actualizar</button>

                        </form>
                    )}
            </Formik>
        </div>
    );
}

export default PopulationForm;