<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RateController;

use App\Http\Controllers\TrackingController;
use App\Http\Controllers\ChatController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/calculate-rate', [RateController::class, 'calculate'])->name('api.rates.calculate');
Route::get('/tracking/{resi}', [TrackingController::class, 'apiSearch']);
Route::post('/chat', [ChatController::class, 'send']);
