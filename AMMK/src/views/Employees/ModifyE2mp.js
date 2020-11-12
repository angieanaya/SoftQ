/*!

@Author: Emilio Padilla Miranda
@Date: Sunday, October 11, 2020

*/

import React from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import Swal from 'sweetalert2';
import { API_BASE_URL } from '../../index';



// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
  Progress,
  Label,
  CustomInput,
  Alert,
  Button
} from "reactstrap";


class ModifyEmployee2 extends React.Component {
  constructor(props){
    super(props)
    this.state = {
    employee: [],
      estado: null,
      ciudad: null, 
      calle: null,
      numExt: null, 
      numInt: null, 
      cp: null, 
      colonia: null,
      municipio: null,
      correo: null, 
      telefono: null,
      celular: null
    }
  }

  fillData (id) {
    axios.get(API_BASE_URL + 'employee/' + id)
        .then(function (res) {
           document.getElementById("estadoSelect").value = res.data[0].estado;
           document.getElementById("ciudadSelect").value = res.data[0].ciudad;
           document.getElementById("calle").value = res.data[0].calle;
           document.getElementById("numExt").value = res.data[0].numExterior;
           document.getElementById("numInt").value = res.data[0].numInterior;
           document.getElementById("cp").value = res.data[0].codigoPostal;
           document.getElementById("colonia").value = res.data[0].colonia; 
           document.getElementById("municipio").value = res.data[0].ciudad; 
           document.getElementById("correo").value = res.data[0].correo; 
           document.getElementById("telefono").value = res.data[0].telefono; 
           document.getElementById("celular").value = res.data[0].celular; 
           document.getElementById("valorId").value = id;
          })
  }

  componentDidMount() {
    this.getEmployee();
  }

  getEmployee() {
    const { id } = this.props.match.params;
    this.state.id = id
    axios.get(API_BASE_URL + 'employee/' + id)
        .then(res => {
            const employees = res.data;
            this.setState({ employees });
          })
  }

  onSubmit(e, id){
    //Agarrar los valores 
    let estado = document.getElementById("estadoSelect").value;
    let ciudad = document.getElementById("ciudadSelect").value;
    let calle = document.getElementById("calle").value;
    let numExterior = document.getElementById("numExt").value;
    let numInterior = document.getElementById("numInt").value;
    let codigoPostal = document.getElementById("cp").value;
    let colonia = document.getElementById("colonia").value;
    let municipio = document.getElementById("municipio").value;
    let correo = document.getElementById("correo").value;
    let telefono = document.getElementById("telefono").value;
    let celular = document.getElementById("celular").value;
    var idD= document.getElementById("valorId").value;

    if (estado !== '' && ciudad !== '' && municipio !== '' && celular !== '') {
    const datosContacto = {
      estado: estado,
      ciudad: ciudad, 
      calle: calle,
      numExterior: numExterior, 
      numInterior: numInterior, 
      codigoPostal: codigoPostal, 
      colonia: colonia,
      municipio: municipio,
      correo: correo, 
      telefono: telefono,
      celular: celular
    };
    axios.put("http://localhost:8000/api/employee/contact/" + idD, datosContacto)
      .then(function (resp) {
        console.log(resp.data);
      });
      Swal.fire(
        '¡Listo!',
        'Empleado modificado de manera exitosa',
        'success'
        ).then(function() {
          let rouote = "http://localhost:3000/admin/view-employee/"+idD
          window.location = rouote;
        });
  } else{
    Swal.fire( {
      icon: 'error',
      title: 'Oops...',
      text: 'No se han llenado todos los campos obligatorios!',
    })
  }
}


  render() {
    const { id } = this.props.match.params;
    this.fillData (id);
    return (
      <>
        <div className="content">
          <h2 className="title">Modificar empleado</h2>
          <Form>
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                 
                <h3 className="title">Datos de contacto</h3>
                    <br></br>
                        <Alert color="primary">Los campos marcados con un asterisco (*) son obligatorios.</Alert>
                  
                </CardHeader>
                <CardBody>
                  
                    <Row>
                      <Col className="pl-md-1" md="6">
                        <FormGroup>
                          <Label htmlFor="estadoSelect">* Estado</Label>
                          <Input type="select" name="select" id="estadoSelect">
                          <option defaultValue="1">Selecciona un estado...</option>
                          <option >Guanajuato</option>
                          <option>Puebla</option>
                          <option >Queretaro</option>
                          </Input>
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="6">
                        <FormGroup>
                          <Label htmlFor="ciudadSelect">* Ciudad</Label>
                          <Input type="select" name="select" id="ciudadSelect">
                          <option defaultValue="1">Selecciona una ciudad...</option>
                          <option >Guanajuato</option>
                          <option>Irapuato</option>
                          <option >Salamanca</option>
                          </Input>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pl-md-1" md="6">
                        <FormGroup>
                          <Label htmlFor="calle">Calle</Label>
                          <Input
                            defaultValue=""
                            placeholder=""
                            type="text"
                            id="calle"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="2">
                        <FormGroup>
                          <Label htmlFor="numExt">#Ext</Label>
                          <Input
                            placeholder=""
                            type="text"
                            id="numExt"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="2">
                        <FormGroup>
                          <Label htmlFor="numInt">
                            #Int
                          </Label>
                          <Input
                            placeholder=""
                            type="text"
                            id="numInt"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="2">
                        <FormGroup>
                          <Label htmlFor="cp">
                            C.P
                          </Label>
                          <Input
                            placeholder=""
                            type="text"
                            id="cp"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pl-md-1" md="6">
                        <FormGroup>
                          <Label htmlFor="colonia">Colonia</Label>
                          <Input
                            placeholder="Company"
                            type="text"
                            id="colonia"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="6">
                        <FormGroup>
                          <Label htmlFor="municipio">* Municipio</Label>
                          <Input
                            placeholder="Corregidora"
                            type="text"
                            id="municipio"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pl-md-1" md="7">
                        <FormGroup>
                        <Label htmlFor="CompDom">Comprobante de Domicilio</Label>
                        <CustomInput type="file" name="customFile" id="CompDom" label="Selecciona un archivo"/>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pl-md-1" md="7">
                        <FormGroup>
                          <Label htmlFor="correo">Correo</Label>
                          <Input
                            placeholder="mike@email.com" type="email"id="correo"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="6">
                        <FormGroup>
                          <Label htmlFor="telefono">Teléfono</Label>
                          <Input
                            placeholder="" type="tel" id="telefono"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="6">
                        <FormGroup>
                          <Label htmlFor="celular">* Celular</Label>
                          <Input
                            placeholder="" type="tel" id="celular"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  
                </CardBody>
              </Card>
              <Row>
              <Col  md="12" align="center">
              <Link to='/admin/register-employee'>
              <Button className="btn btn-primary" onClick={this.onSubmit.bind("this", id)}>Modificar</Button>
              </Link>
              </Col>
             
              </Row>
            </Col>
          </Row>
          </Form>
          <div>
                    <Input type="text" id="valorId" style={{display: "none"}}>

                    </Input>
                </div>

        </div>
      </>
    );
  }
}

export default ModifyEmployee2;