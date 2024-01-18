<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCustomerRequest;
use App\Http\Requests\UpdateCustomerRequest;
use App\Http\Resources\CustomerResource;
use App\Models\Customer;
use App\Repositories\Interfaces\CustomerRepositoryInterface;
use Illuminate\Http\Request;

class CustomerController extends Controller
{
    private $CustomerRepository;
    public function __construct(CustomerRepositoryInterface $CustomerRepository){
       $this->CustomerRepository = $CustomerRepository;
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
       $customer =  $this->CustomerRepository->all();
        return $customer;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCustomerRequest $request)
    {
        $data = $request->validated();
        $customer = $this->CustomerRepository->store($data);
        return response(new CustomerResource($customer),201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Customer $customer)
    {
        return $this->CustomerRepository->show($customer);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCustomerRequest $request, $id)
    {
        $data = $request->validated();
       $updatedCustomer = $this->CustomerRepository->update($data,$id);
       return new CustomerResource($updatedCustomer);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $this->CustomerRepository->delete($id);
        return response("",204);
    }
}
