<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        $totalShipments = \App\Models\Shipment::count();
        $inTransit = \App\Models\Shipment::where('status', 'In Transit')->count();
        $delivered = \App\Models\Shipment::where('status', 'Delivered')->count();
        $pickedUp = \App\Models\Shipment::where('status', 'Picked Up')->count();
        
        // Active could mean anything not delivered
        $activeShipments = $totalShipments - $delivered;

        return response()->json([
            'success' => true,
            'data' => [
                'total' => $totalShipments,
                'active' => $activeShipments,
                'delivered' => $delivered,
                'picked_up' => $pickedUp,
                'in_transit' => $inTransit,
            ]
        ]);
    }
}
