<?php 
namespace App\Repositories;

use App\Http\Resources\CategoryResource;
use App\Models\Category;
use App\Repositories\Interfaces\CategoryRepositoryInterface;

class CategoryRepository implements CategoryRepositoryInterface{
   public function all(){
       return CategoryResource::collection(Category::query()->orderBy('id','desc')->paginate(10));
   }
   public function store($data){
    return Category::create($data);
   }
   public function show($data){
    return new CategoryResource($data);
   }
   public function find($id){
    return Category::where('id', $id)->first();
   }
   public function update($data,$id)
   {
    $category = Category::find($id);
    $category->update($data);
    return $category;
   }
   public function delete($id){
       $category = Category::find($id);
       $category->delete();
   }
}