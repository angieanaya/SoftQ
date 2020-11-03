import React, { Component } from 'react';
import { Link } from "react-router-dom";

// reactstrap components
import { Row, Col, Button, FormGroup, Card, CardHeader, CardTitle, CardBody} from 'reactstrap';
import Form from "react-bootstrap/Form";
import ExpensesTable from "../../components/Finanzas/ExpensesTable";
import IncomesTable from "../../components/Finanzas/IncomesTable";
import SimpleTooltip from "../General/SimpleTooltip";

//API calls
import axios from 'axios';
import { API_BASE_URL } from 'index';

//Importing Icon library
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fas)

export default class MonthlyView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            incomesStartDate: null,
            incomesEndDate: null,
            incomesTotal: null,
            expensesTotal: null
        }
      this.onIncomesChange = this.onIncomesChange.bind(this);
      this.onExpensesChange = this.onExpensesChange.bind(this);
    }

    setIncomesDates() {
        var date = new Date();
        var firstDay = new Date(date.getFullYear(), date.getMonth(), 1)
            .toISOString().split('T')[0];
        var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0)
            .toISOString().split('T')[0];
        this.setState({ incomesStartDate: firstDay, incomesEndDate: lastDay });
    }

    crearSelect(){
        var sel='<option value="NA" disabled selected>Selecciona una opcion</option>';
        const num=1;
        axios.get(API_BASE_URL + "categories").then(function(resp){
        console.log(resp.data);
        resp.data.forEach(element =>{
          sel = sel.concat('<option value='+ element.id + '>' + element.nombre +'</option>');
        });
        document.getElementById("selectCategory").innerHTML=sel; 
      });
    }

    crearSelect2(){
        var sel='<option value="NA" disabled selected>Selecciona una opcion</option>';
        const num=1;
        axios.get(API_BASE_URL + "headquarters").then(function(resp){
        console.log(resp.data);
        resp.data.forEach(element =>{
          sel = sel.concat('<option value='+ element.id + '>' + element.nombre +'</option>');
        });
        document.getElementById("selectSede").innerHTML=sel; 
      });
    }

    onIncomesChange(e) {
        this.setState({ incomesTotal: e });
        console.log(this.state.incomesTotal);
    }

    onExpensesChange(e) {
        this.setState({ expensesTotal: e });
        console.log(this.state.expensesTotal);
    }

    componentDidMount() {
        this.setIncomesDates();
    }

    render() {
        this.crearSelect();
        this.crearSelect2();
        return (
            <div className="content">
                <h1 className="title">FINANZAS</h1>
                <Row>
                    <Col md="6">
                        <FormGroup>
                            <label>Selecciona la sede...</label>
                            <Form.Control as="select" id="selectSede"></Form.Control>
                        </FormGroup>
                    </Col>
                    
                    <Col md="6">
                        <Link to='/admin/Finanzas/Record'>
                        <Button className="btn btn-primary float-right"><FontAwesomeIcon icon={['fas', 'user-plus']} />Ver histórico</Button>
                        </Link>
                    </Col>
                </Row>

                <br></br>

                <Row>
                    <Col md="6">
                        <Card>
                            <CardHeader>
                                    <CardTitle>
                                     <h3 className="title">INGRESOS</h3>
                                    </CardTitle>
                            </CardHeader>  
                            <CardBody>
                                <Row>
                                    <Col md="12">
                                        <h4>Total: {this.state.incomesTotal}</h4>
                                    </Col>
                                </Row>
                                <IncomesTable
                                    startDate={"2020-11-01"}
                                    endDate={"2020-11-30"}
                                    onChange={this.onIncomesChange} />
                            </CardBody>
                        </Card>
                    </Col>
                    <Col md="6">
                        <Card>
                            <CardHeader>
                                <CardTitle>
                                    <Row>
                                    <Col md="12">
                                        <h3 className="title m-0 d-inline">EGRESOS</h3>
                                        <Link className="float-right" to='/admin/Finanzas/RegisterExpense'>
                                        <Button size="sm" id="registrarEgreso"><FontAwesomeIcon icon={['fas', 'plus']}/></Button>
                                        <SimpleTooltip placement="right" target="registrarEgreso" >Registrar egreso</SimpleTooltip>
                                        </Link>
                                    </Col>    
                                    </Row>
                                </CardTitle>
                            </CardHeader>        
                            <CardBody>
                                <Row>
                                    <Col md="12">
                                        <h4>Total: {this.state.expensesTotal}</h4>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md="12">
                                    <FormGroup>
                                        <label>Filtra por categoría...</label>
                                        <Form.Control as="select" id="selectCategory"></Form.Control>
                                    </FormGroup>
                                    </Col>
                                </Row>
                                <ExpensesTable onChange={this.onExpensesChange} />
                            </CardBody>
                        </Card>
                        
                    </Col>
                </Row>        
                
            </div>
        )
    }
}
