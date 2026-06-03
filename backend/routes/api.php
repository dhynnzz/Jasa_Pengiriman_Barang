<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\ShipmentController;
use App\Http\Controllers\Admin\RateController;

use App\Http\Controllers\DriverController;
use App\Http\Controllers\BranchController;
use App\Http\Controllers\PartnershipController;

// Auth Route
Route::post('/admin/login', [AuthController::class, 'login']);

// Public Routes (if needed)
Route::get('/branches', [BranchController::class, 'index']); // Public access to branches
Route::post('/partnerships', [PartnershipController::class, 'store']); // Public submit form
Route::post('/calculate-rate', [RateController::class, 'calculatePublic']); // Public calculate rate
Route::get('/tracking/{resi}', [\App\Http\Controllers\Admin\ShipmentController::class, 'track']); // Public tracking

// Protected Admin Routes
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/admin/logout', [AuthController::class, 'logout']);
    
    // Admin Dashboard Statistics
    Route::get('/admin/dashboard-stats', [DashboardController::class, 'index']);
    
    // Admin Reports
    Route::get('/admin/reports', [\App\Http\Controllers\Admin\ReportController::class, 'index']);

    // Admin Shipments Management
    Route::apiResource('/admin/shipments', ShipmentController::class);
    Route::post('/admin/shipments/{id}/history', [ShipmentController::class, 'addHistory']);

    // Admin Rates Management
    Route::apiResource('/admin/rates', RateController::class);
    
    // Drivers
    Route::apiResource('/admin/drivers', DriverController::class);
    
    // Branches (Admin management)
    Route::post('/admin/branches', [BranchController::class, 'store']);
    Route::put('/admin/branches/{id}', [BranchController::class, 'update']);
    Route::delete('/admin/branches/{id}', [BranchController::class, 'destroy']);
    
    // Partnerships (Admin view/update)
    Route::get('/admin/partnerships', [PartnershipController::class, 'index']);
    Route::put('/admin/partnerships/{id}', [PartnershipController::class, 'update']);
    Route::delete('/admin/partnerships/{id}', [PartnershipController::class, 'destroy']);
    
    // Users (Admin management)
    Route::apiResource('/admin/users', \App\Http\Controllers\UserController::class);
    
    // Settings
    Route::get('/admin/settings', [\App\Http\Controllers\SettingController::class, 'index']);
    Route::post('/admin/settings', [\App\Http\Controllers\SettingController::class, 'update']);
    
    // Profile (Current logged-in user)
    Route::get('/admin/profile', [\App\Http\Controllers\UserController::class, 'getProfile']);
    Route::put('/admin/profile', [\App\Http\Controllers\UserController::class, 'updateProfile']);
});
