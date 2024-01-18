<?php

namespace App\Http\Controllers\Api;

use App\Models\Product;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\ProductResource;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Repositories\Interfaces\ProductRepositoryInterface;
use Illuminate\Auth\Events\Validated;

class ProductController extends Controller
{    
    private $productRepository;
    public function __construct(ProductRepositoryInterface $productRepository)
    {
        $this->productRepository = $productRepository;
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = Product::with('category')->get();
    //    $products =  $this->productRepository->all();
       return $products;
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProductRequest $request)
    {
        // return response()->json(['testing' => true]);
        $data = $request->validated();
        $product = $this->productRepository->store($data);
        return response(new ProductResource($product),201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        return $this->productRepository->show($product);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProductRequest $request, $id)
    {
        $data = $request->validated();
        $updateProduct = $this->productRepository->update($data,$id);
        return new ProductResource($updateProduct);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $this->productRepository->delete($id);
        return response("",204);
    }
}
