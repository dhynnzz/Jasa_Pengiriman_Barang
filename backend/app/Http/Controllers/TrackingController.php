<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Shipment;

class TrackingController extends Controller
{
    public function index()
    {
        return view('tracking');
    }

    public function search(Request $request)
    {
        $resi = $request->input('tracking_number');
        $shipment = Shipment::with('histories')->where('tracking_number', strtoupper($resi))->first();

        return view('tracking', compact('shipment', 'resi'));
    }

    public function apiSearch($resi)
    {
        $shipment = Shipment::with('histories')->where('tracking_number', strtoupper($resi))->first();

        if ($shipment) {
            return response()->json([
                'success' => true,
                'data' => $shipment
            ]);
        }

        return response()->json([
            'success' => false,
            'message' => 'Resi tidak ditemukan.'
        ], 404);
    }
}
