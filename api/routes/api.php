<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\MarketplaceController;
use App\Http\Controllers\MetaController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\StoreController;
use App\Http\Controllers\TagController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\WishlistController;
use Illuminate\Support\Facades\Route;

Route::get('/sanctum/csrf-cookie', function () {
    return response('OK', 200);
});

Route::post('/register', [RegisterController::class, 'register'])->name('register');
Route::post('/login', [AuthController::class, 'login'])->name('login');
Route::post('/admin/check-pin', [AuthController::class, 'checkPin'])->name('check-pin');
Route::get('/admin/forget-session', [AuthController::class, 'forgetSession'])->name('close-session');

Route::get('/stores', [StoreController::class, 'getStores'])->name('get-all-stores');
Route::get('/store-products', [StoreController::class, 'getStoreProducts'])->name('get-store-products');

Route::get('/top-stores', [StoreController::class, 'getTopStores'])->name('get-top-stores');
Route::get('/store/product/{id}', [StoreController::class, 'getProductData'])->name('get-product-data');
Route::get('/store/{slug}', [StoreController::class, 'getStoreData'])->name('get-store-data');

Route::get('/marketplace/products', [MarketplaceController::class, 'getProducts'])->name('marketplace.get-products');
Route::get('/marketplace/product/{id}', [MarketplaceController::class, 'fetchItem'])->name('marketplace.fetch-item');


Route::get('/meta', [MetaController::class, 'getMeta'])->name('get-website-meta');

Route::group([
    'middleware' => ['auth:sanctum'],
], function () {
    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
    
    Route::get('/user', [UserController::class, 'getUserData'])->name('get-user-data');
    Route::get('/user-meta', [UserController::class, 'getUserMeta'])->name('get-user-meta');
    
    Route::get('/followed-stores', [UserController::class, 'getFollowedStores'])->name('get-followed-stores');
    Route::post('/store/{store}/follow', [UserController::class, 'follow'])->name('stores.follow');
    Route::delete('/store/{store}/unfollow', [UserController::class, 'unfollow'])->name('stores.unfollow');
    
    Route::apiResource('/cart', CartController::class);
    Route::apiResource('/wishlist', WishlistController::class);
    
    Route::prefix('admin/{storeslug}')
        ->middleware(['store.access'])
        ->group(function () {
            Route::apiResource('/product', ProductController::class);
            Route::apiResource('/category', CategoryController::class);
            Route::apiResource('/tag', TagController::class);
        });
});
