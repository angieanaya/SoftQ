import React, { Component } from 'react';
import { Link } from "react-router-dom";

//COMPONENTS
import { DropdownItem, Row, Table, Col, Alert, Button, Badge, CardBody, Card } from 'reactstrap';
import SimpleTooltip from "../General/SimpleTooltip";
import ModifyTakeOut from './ModifyTakeOut';
import ModifyEntry from './ModifyEntry';
import ModifyPersonal from './ModifyPersonal';

//API CALLS
import axios from 'axios';
import { API_BASE_URL } from '../../index';

//ICONS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fas)

export default class SpecificView extends Component {
    
    state = {
        beneficiaries: [],
    }

    componentDidMount () {
        const { id } = this.props.match.params;
        console.log(id);
        axios.get(API_BASE_URL + 'beneficiaries/' + id)
        .then(res => {
            const beneficiaries = res.data;
            this.setState({ beneficiaries });
            console.log(beneficiaries);
          })
      }

    render() {
        const login = localStorage.getItem("isLoggedIn");
        const idRol = localStorage.getItem("idRol");
        //Redirect in case of wrong role or no login
        if (!login ) {
            window.location = "http://localhost:3000/login";
        }else if(idRol==2){
            window.location = "http://localhost:3000/general/NurseIndex";
        }else if (idRol==1){
            window.location = "http://localhost:3000/admin/Nomina/Nomina";
        }
        return (
            <div className="content">
                <h3 className="title">DETALLE BENEFICIARIA</h3>
                {this.state.beneficiaries.map((beneficiary) => (
                <>
                    <Alert color="primary">BENEFICIARIA ACTIVA</Alert>
                    {/*<Alert color="light">BENEFICIARIA INACTIVA</Alert>*/}

                <Row>
                    <Col md="4">
                        <img src="archivosBeneficiarias/<?php echo obtenerImagen($idBeneficiaria.'_imagenIngreso_')?>" width="250" class="img-fluid" alt="Imagen de Ingreso" id="fotoBenef" onerror="this.onerror=null; this.src='avatar.jpg';"></img>
                    </Col>
                    <Col md="8">
                    <Card>
                  <CardBody>
                        <h1 className="title">{beneficiary.nombreCompleto}</h1>
                        <DropdownItem divider />
                        <Badge color="primary">DATOS PERSONALES</Badge>
                        <ModifyPersonal id={beneficiary.id}/>
                        <p className="font-weight-bold" style={{'font-size': '15px'}}>Apodo: {beneficiary.apodo}</p>
                        <p className="font-weight-bold">Fecha de nacimiento: {beneficiary.fechaNacimiento}</p>
                        <p className="font-weight-bold">Edad:</p>
                        <p className="font-weight-bold">CURP:{beneficiary.curp}</p>
                        </CardBody>
                    </Card>
                        <Row className="text-center">
                            <Col md="12">
                            <Link   to={{
                                pathname: '../MedicalRecordView/'+ beneficiary.id,
                                state:beneficiary.id
                            }}> 
                                <Button id="historialMedico" color="warning" className=""><FontAwesomeIcon icon={['fas', 'notes-medical']} />&nbsp;HISTORIAL MÉDICO</Button>
                                </Link>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <br></br>
                <Card>
                  <CardBody>
                <Row>
                    <Col md="6">
                        <Badge color="primary">DATOS DE INGRESO</Badge>
                    </Col>
                    <Col md="6">
                        <ModifyEntry id={beneficiary.id}/>
                    </Col>
                </Row>
                <Row>
                    <Col md="4">
                    <p className="font-weight-bold">Fecha de ingreso: {beneficiary.fechaIngreso}</p>
                    </Col>
                    <Col md="4">
                    <p className="font-weight-bold">Sede: {beneficiary.headquarter_id}</p>
                    </Col>
                    <Col md="4">
                    <p className="font-weight-bold">Canalizador: {beneficiary.canalizador}</p>
                    </Col>
                </Row>
                <Row>
                    <Col md="4">
                    <p className="font-weight-bold">Diagnóstico médico: {beneficiary.dxMedico}</p>
                    </Col>
                    <Col md="4">
                    <p className="font-weight-bold">Edad mental: {beneficiary.edadMental}</p>
                    </Col>
                    <Col md="4">
                    <p className="font-weight-bold">Vinculos familiares: {beneficiary.vinculosFam}</p>
                    </Col>
                </Row>
                </CardBody>
                </Card>
                <br></br>
                {/*<Card>
                  <CardBody>
                <Row>
                    <Col md="6">
                        <Badge color="primary">DATOS DE EGRESO</Badge>
                    </Col>
                    <Col md="6">
                        <ModifyTakeOut id={beneficiary.id}/>
                    </Col>
                </Row>
                <Row>
                    <Col md="4">
                    <p className="font-weight-bold">Fecha de egreso: {beneficiary.fechaEgreso}</p>
                    </Col>
                    <Col md="4">
                    <p className="font-weight-bold">Motivo: {beneficiary.motivo}</p>
                    </Col>
                    <Col md="4">
                    <p className="font-weight-bold">Destino: {beneficiary.destino}</p>
                    </Col>
                </Row>
                </CardBody>
                </Card>*/}
                <br></br>
                </>
                ))}
                <Card>
                  <CardBody>
                <Row>
                    <Col md="6">
                        <Badge color="primary">ARCHIVOS DE REGISTRO</Badge>
                    </Col>
                    <Col md="6">
                        <Button  className="float-right" size="sm" id="editar"><FontAwesomeIcon icon={['fas', 'pencil-alt']} /></Button>
                        <SimpleTooltip placement="top" target="editar" >Editar</SimpleTooltip>
                    </Col>
                </Row>
                <Table hover>
                    <thead>
                        <tr>
                            <th>Nombre de archivo</th>
                            <th>Descripción</th>
                            <th>Fecha</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>
                                <Row>
                                    <Col md="4">
                                    <Button color="info" size="sm" id="verArchivo"><FontAwesomeIcon icon={['fas', 'eye']} /></Button>
                                    <SimpleTooltip placement="top" target="verArchivo" >Ver archivo</SimpleTooltip>
                                    </Col>

                                    <Col md="4">
                                    <Button color="primary" size="sm" id="descargar"><FontAwesomeIcon icon={['fas', 'download']} /></Button>
                                    <SimpleTooltip placement="top" target="descargar" >Descargar</SimpleTooltip>
                                    </Col>

                                    <Col md="4">
                                    <Button color="danger" size="sm" id="eliminar"><FontAwesomeIcon icon={['fas', 'trash-alt']} /></Button>
                                    <SimpleTooltip placement="top" target="eliminar" >Eliminar</SimpleTooltip>
                                    </Col>
                                </Row>
                            </td>
                        </tr>
                </Table>
                </CardBody>
                </Card>
            </div>
        )
    }
}
