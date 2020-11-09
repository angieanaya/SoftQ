import React from 'react';
import { Link } from "react-router-dom";

//API CALLS
import axios from 'axios';
import { API_BASE_URL } from '../../index';

//COMPONENTS
import {Table, Button, Row, ModalBody, ModalFooter, Modal, Col} from 'reactstrap';
import TakeOutB from '../../views/Beneficiarias/TakeOutB';
import ReenterB from '../../views/Beneficiarias/ReenterB';
import SimpleTooltip from '../../views/General/SimpleTooltip';

//ICONS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fas)
  
export default class AdminTable extends React.Component {
  state = {
    beneficiaries: [],
  }
  
  componentDidMount() {
    let id = this.props.dataFromParent;
    console.log(id);
    axios.get(API_BASE_URL + 'beneficiaries/' + id + '/status')
      .then(res => {
        const beneficiaries = res.data;
        this.setState({ beneficiaries });
      })
  }

  render() {
    return (
      <div>
        <Table hover>
            <thead>
              <tr>
                  <th>Nombre</th>
                  <th>Fecha de nacimiento</th>
                  <th>DX médico</th>
                  <th>sede</th>
                  <th>acciones</th>
              </tr>
            </thead>
  
            <tbody>
              {this.state.beneficiaries.map((beneficiary) => (
                <tr key={beneficiary.id}>
                  <td>{beneficiary.nombreCompleto}</td>
                  <td>{beneficiary.fechaNacimiento}</td>
                  <td>{beneficiary.dxMedico}</td>
                  <td>{beneficiary.headquarter_id}</td>
                  <td>
                      <Row>
                      <Col md="4">
                      <Link   to={{
                        pathname: 'SpecificView/'+ beneficiary.id,
                        state:beneficiary.id
                      }}> 
                          <Button color="info" size="sm" id="verDetalle"><FontAwesomeIcon icon={['fas', 'eye']} /></Button>
                          <SimpleTooltip placement="top" target="verDetalle">Ver detalle</SimpleTooltip>
                      </Link>
                      </Col>

                          <Col md="4">
                          <TakeOutB id={beneficiary.id}/>
                          </Col>

                          <Col md="4">
                          <ReenterB name={beneficiary.id}/>
                          </Col>
                      </Row>
                  </td>
                </tr>
              ))}
            </tbody>
  
        </Table>

        <Modal isOpen={this.state.modalEliminar}>
                <ModalBody>
                   ¿Estás segur@ que deseas eliminar la consulta médica?
                </ModalBody>
                <ModalFooter>
                  <Button color="primary"onClick={()=>this.setState({modalEliminar: false})}>No</Button>
                  <Button color="danger" onClick={()=>this.peticionDelete()}>Sí</Button>
                </ModalFooter>
        </Modal>

      </div>
    )
  }
} 