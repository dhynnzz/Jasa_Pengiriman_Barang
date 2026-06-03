<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Shipment;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function index()
    {
        $today = Carbon::today();
        $startOfMonth = Carbon::now()->startOfMonth();

        // Shipments Status Stats
        $total = Shipment::count();
        $active = Shipment::whereIn('status', ['Pending', 'Manifested'])->count();
        $inTransit = Shipment::where('status', 'In_Transit')->count();
        $delivered = Shipment::where('status', 'Delivered')->count();

        // Financial Stats (Mocked for now since total_price is not in schema)
        $todayRevenue = Shipment::whereDate('created_at', $today)->count() * 45000;
        $monthRevenue = Shipment::whereMonth('created_at', $startOfMonth->month)
                                ->whereYear('created_at', $startOfMonth->year)
                                ->count() * 45000;

        // Recent Shipments (5 latest)
        $recentShipments = Shipment::latest()->take(5)->get()->map(function($shipment) {
            $shipment->total_price = 45000;
            $shipment->sender_name = $shipment->sender_name ?? 'Budi';
            $shipment->receiver_name = $shipment->receiver_name ?? 'Andi';
            return $shipment;
        });

        // 7 Days Chart Data (Shipments per day)
        $chartData = [];
        for ($i = 6; $i >= 0; $i--) {
            $date = Carbon::today()->subDays($i);
            $count = Shipment::whereDate('created_at', $date)->count();
            $chartData[] = [
                'name' => $date->format('d M'),
                'pengiriman' => $count
            ];
        }

        return response()->json([
            'success' => true,
            'data' => [
                'total' => $total,
                'active' => $active,
                'in_transit' => $inTransit,
                'delivered' => $delivered,
                'today_revenue' => $todayRevenue,
                'month_revenue' => $monthRevenue,
                'recent_shipments' => $recentShipments,
                'chart_data' => $chartData
            ]
        ]);
    }
}
