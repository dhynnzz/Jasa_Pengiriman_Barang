<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TrackingController;
use App\Http\Controllers\RateController;

Route::get('/', function () {
    return view('home');
});

Route::get('/services', function () {
    return view('services');
});

Route::get('/rates', function () {
    return view('rates');
});

Route::get('/about', function () {
    return view('about');
});

Route::get('/coverage-map', function () {
    return view('map');
});

Route::get('/terms', function () {
    return view('terms');
});

Route::get('/help', function () {
    return view('help');
});
Route::get('/tracking', [TrackingController::class, 'index'])->name('tracking.index');
Route::post('/tracking/search', [TrackingController::class, 'search'])->name('tracking.search');
