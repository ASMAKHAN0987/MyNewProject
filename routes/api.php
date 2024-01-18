<?php

use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\CustomerController;
use App\Http\Controllers\Api\ProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::apiResource('/category',CategoryController::class);
// Route::post('/product',[ProductController::class,"store"]);

// Route::post('/product', function (Request $request){
//     // dd($request);

//     return response()->json(['test' => true]);
// });
Route::apiResource('/product',ProductController::class);

Route::apiResource('/customer',CustomerController::class);

