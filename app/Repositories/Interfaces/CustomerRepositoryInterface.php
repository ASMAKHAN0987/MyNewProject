<?php
namespace App\Repositories\Interfaces;
Interface CustomerRepositoryInterface{
    public function all();
    public function store($data);
    public function show($data);
    // public function find($id);
    public function update($customer,$data);
    public function delete($id);
}