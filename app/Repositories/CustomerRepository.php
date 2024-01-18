<?php 
namespace App\Repositories;

use App\Http\Resources\CustomerResource;
use App\Models\Customer;
use App\Repositories\Interfaces\CustomerRepositoryInterface;

class CustomerRepository implements CustomerRepositoryInterface{
   public function all(){
      return CustomerResource::collection(Customer::query()->orderBy('id','desc')->paginate(10));
   }
   public function show($data){
        return new CustomerResource($data);
   }
   public function store($data){
    return Customer::create($data);
   }
   public function update($data, $id)
   {
      $customer = Customer::find($id);
      $customer->update($data);
      return $customer;
   }
   public function delete($id){
      $customer = Customer::find($id);
      $customer->delete();
  }
}