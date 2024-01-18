<?php
namespace App\Repositories\Interfaces;

use App\Models\Category;

Interface CategoryRepositoryInterface{
    public function all();
    public function store($data);
    public function show($data);
    public function find($id);
    public function update($category,$data);
    public function delete($id);
}