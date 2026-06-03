<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Shipment;
use Carbon\Carbon;
use Illuminate\Http\Request;

class ReportController extends Controller
{
    public function index(Request $request)
    {
        $month = $request->input('month', date('n'));
        $year = $request->input('year', date('Y'));

        $shipments = Shipment::whereMonth('created_at', $month)
                             ->whereYear('created_at', $year)
                             ->orderBy('created_at', 'asc')
                             ->get();

        $totalShipments = $shipments->count();
        $totalRevenue = $totalShipments * 45000; // Mocked pricing for now

        // Calculate daily revenue for chart
        $daysInMonth = Carbon::createFromDate($year, $month, 1)->daysInMonth;
        $chartData = [];
        
        for ($i = 1; $i <= $daysInMonth; $i++) {
            $dailyCount = $shipments->filter(function ($shipment) use ($i) {
                return Carbon::parse($shipment->created_at)->day == $i;
            })->count();

            $chartData[] = [
                'name' => "$i",
                'pendapatan' => $dailyCount * 45000
            ];
        }

        // Map shipments for table view (adding mocked prices)
        $mappedShipments = $shipments->map(function ($s) {
            $s->total_price = 45000;
            return $s;
        });

        return response()->json([
            'success' => true,
            'summary' => [
                'total_shipments' => $totalShipments,
                'total_revenue' => $totalRevenue
            ],
            'chart_data' => $chartData,
            'transactions' => $mappedShipments->reverse()->values() // latest first for table
        ]);
    }
}
