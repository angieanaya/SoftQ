<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

//importing model 
use App\Models\Beneficiary; 

class BeneficiaryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $beneficiaries = Beneficiary::with('status', 'headquarter')->get();
        return response()->json($beneficiaries);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage. POST
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $beneficiary = new Beneficiary;

        $beneficiary->nombreCompleto= $request-> nombreCompleto;
        $beneficiary->apodo= $request-> apodo;
        $beneficiary->fechaNacimiento = $request -> fechaNacimiento;
        $beneficiary->numCurp = $request -> numCurp;
        $beneficiary->fechaIngreso = $request -> fechaIngreso;
        $beneficiary->edadMental = $request -> edadMental;
        $beneficiary->canalizador = $request -> canalizador;
        $beneficiary->vinculosFam = $request -> vinculosFam;
        $beneficiary->dxMedico = $request -> dxMedico;
        $beneficiary->headquarter_id = $request -> headquarter_id;

        $beneficiary->save();  
    }

    /**
     * Display only one specific beneficiary
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */

    public function show($id)
    {
        $beneficiary = Beneficiary::where('id', $id)->get();
        return response()->json($beneficiary);
    }

    /**
     * Display beneficiaries according to status value
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function status($id)
    {
        $beneficiaries = Beneficiary::where('status_id', '=', $id)->get();
        return response()->json ($beneficiaries);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $beneficiary = Beneficiary::find($id);
        $beneficiary->status_id = $request->status_id;
        $beneficiary->headquarter_id = $request->headquarter_id;
        $beneficiary->nombreCompleto = $request->nombreCompleto;
        $beneficiary->apodo = $request->apodo;
        $beneficiary->fechaNacimiento = $request->fechaNacimiento;
        $beneficiary->numCurp = $request->numCurp;
        $beneficiary->fechaIngreso = $request->fechaIngreso;
        $beneficiary->motivoIngreso = $request->motivoIngreso;
        $beneficiary->canalizador = $request->canalizador;
        $beneficiary->edadMental = $request->edadMental;
        $beneficiary->dxMedico = $request->dxMedico;
        $beneficiary->vinculosFam = $request->vinculosFam;
        $beneficiary->fechaEgreso = $request->fechaEgreso;
        $beneficiary->motivoEgreso = $request->motivoEgreso;
        $beneficiary->destino = $request->destino;
        $beneficiary->update();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
