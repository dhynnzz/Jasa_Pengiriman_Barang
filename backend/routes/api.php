<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RateController;

use App\Http\Controllers\TrackingController;
use App\Http\Controllers\ChatController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Admin Auth
Route::post('/admin/login', [\App\Http\Controllers\AuthController::class, 'login']);
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/admin/logout', [\App\Http\Controllers\AuthController::class, 'logout']);
    
    // Admin Dashboard Statistics
    Route::get('/admin/dashboard-stats', [\App\Http\Controllers\Admin\DashboardController::class, 'index']);

    // Admin Shipments Management
    Route::apiResource('/admin/shipments', \App\Http\Controllers\Admin\ShipmentController::class);
    Route::post('/admin/shipments/{id}/history', [\App\Http\Controllers\Admin\ShipmentController::class, 'addHistory']);

    // Admin Rates Management
    Route::apiResource('/admin/rates', \App\Http\Controllers\Admin\RateController::class);
});

Route::post('/calculate-rate', [RateController::class, 'calculate'])->name('api.rates.calculate');
Route::get('/tracking/{resi}', [TrackingController::class, 'apiSearch']);
Route::post('/chat', [ChatController::class, 'send']);
