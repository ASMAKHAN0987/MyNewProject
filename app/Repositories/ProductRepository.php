<?php 
namespace App\Repositories;

use App\Http\Resources\ProductResource;
use App\Models\Product;
use App\Repositories\Interfaces\ProductRepositoryInterface;

class ProductRepository implements ProductRepositoryInterface{
   public function all(){
       return ProductResource::collection(Product::query()->orderBy('id','desc'));
   }
   public function store($data){
    return Product::create($data);
   }
   public function show($data){
    return new ProductResource($data);
        // return "hello";
}
   public function find($id){
    return Product::where('id', $id)->first();
   }
   public function update($data,$id)
   {
    $product = Product::find($id);
    $product->update($data);
    return $product;
   }
   public function delete($id){
       $product = Product::find($id);
       $product->delete();
   }
}