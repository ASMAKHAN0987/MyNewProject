<?php
namespace App\Repositories\Interfaces;

use App\Models\Product;

Interface ProductRepositoryInterface{
    public function all();
    public function store($data);
    public function show($data);
    public function find($id);
    public function update($product,$data);
    public function delete($id);
}