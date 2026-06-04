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
Route::post('/driver/register', [AuthController::class, 'driverRegister']);
Route::post('/driver/login', [AuthController::class, 'driverLogin']);
Route::post('/customer/register', [AuthController::class, 'customerRegister']);
Route::post('/customer/login', [AuthController::class, 'customerLogin']);

// Protected Routes (Sanctum)
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/customer/shipments', [\App\Http\Controllers\Admin\ShipmentController::class, 'customerShipments']);
    Route::post('/customer/shipments/save', [\App\Http\Controllers\Admin\ShipmentController::class, 'saveCustomerShipment']);
    Route::get('/driver/stats', [\App\Http\Controllers\Admin\ShipmentController::class, 'driverStats']);
});

// Public Routes (if needed)
Route::get('/branches', [BranchController::class, 'index']); // Public access to branches
Route::post('/partnerships', [PartnershipController::class, 'store']); // Public submit form
Route::post('/calculate-rate', [RateController::class, 'calculatePublic']); // Public calculate rate
Route::get('/tracking/{resi}', [\App\Http\Controllers\Admin\ShipmentController::class, 'track']); // Public tracking
Route::post('/driver/update-location', [\App\Http\Controllers\Admin\ShipmentController::class, 'updateLocation']); // Driver GPS update
Route::post('/driver/mark-delivered', [\App\Http\Controllers\Admin\ShipmentController::class, 'markAsDelivered']); // Quick mark delivered
Route::post('/driver/auto-history', [\App\Http\Controllers\Admin\ShipmentController::class, 'autoHistory']); // Auto history location
Route::post('/chat', [\App\Http\Controllers\ChatController::class, 'send']); // Public AI chat
Route::post('/public/shipments', [\App\Http\Controllers\PublicShipmentController::class, 'store']); // Public create shipment

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
