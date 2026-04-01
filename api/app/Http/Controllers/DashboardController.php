<?php

namespace App\Http\Controllers;

use App\Models\Store;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function index(Request $request, $storeSlug)
    {
        $filter = $request->query('filter');

        $store = Store::where('slug', $storeSlug)->first();
        if (!$store) return response()->json(['error' => 'Store not found'], 404);

        // date range
        $startDate = null;
        $endDate = Carbon::now();

        switch ($filter) {
            case 'today':
                $startDate = Carbon::today();
                break;
            case 'last_7_days':
                $startDate = Carbon::now()->subDays(7);
                break;
            case 'this_month':
                $startDate = Carbon::now()->startOfMonth();
                break;
            case 'this_year':
                $startDate = Carbon::now()->startOfYear();
                break;
        }

        $applyDateFilter = function ($query, $column = 'created_at') use ($startDate, $endDate) {
            if ($startDate) {
                $query->whereBetween($column, [$startDate, $endDate]);
            }
        };

        $productCount = $store->products()->count();
        $currentStockValue = $store->products()->sum(DB::raw('price * stock'));

        $lowStockProducts = $store->products()
            ->select('id', 'name', 'stock')
            ->where('stock', '<', 10)
            ->take(10)
            ->get();

        // total sales
        $totalSalesQuery = $store->orders()
            ->whereIn('status', ['completed', 'shipped', 'delivered']);
        $applyDateFilter($totalSalesQuery);
        $totalSales = $totalSalesQuery->sum('total');

        // pending count
        $pendingOrdersQuery = $store->orders()->where('status', 'pending');
        $applyDateFilter($pendingOrdersQuery);
        $pendingOrdersCount = $pendingOrdersQuery->count();

        // pending list
        $pendingOrdersQuery = $store->orders()
            ->with('user:id,name')
            ->where('status', 'pending')
            ->orderByDesc('created_at');
        $applyDateFilter($pendingOrdersQuery);

        $pendingOrders = $pendingOrdersQuery
            ->take(10)
            ->get()
            ->map(fn($order) => [
                'order_id' => $order->order_number,
                'customer_name' => $order->user?->name,
                'total_amount' => $order->total,
                'status' => $order->status,
                'created_at' => $order->created_at,
            ])
            ->toArray();

        // top selling products
        $topSellingProducts = $store->products()
            ->select('id', 'name', 'price')
            ->withSum(['orderItems as total_sold' => function ($q) use ($startDate, $endDate) {
                if ($startDate) {
                    $q->whereHas('order', fn($oq) =>
                        $oq->whereBetween('created_at', [$startDate, $endDate])
                    );
                }
            }], 'quantity')
            ->having('total_sold', '>', 0)
            ->orderByDesc('total_sold')
            ->take(10)
            ->get();

        // sales by category
        $salesByCategoryQuery = DB::table('products')
            ->join('product_categories', 'products.id', '=', 'product_categories.product_id')
            ->join('categories', 'product_categories.category_id', '=', 'categories.id')
            ->join('order_items', 'products.id', '=', 'order_items.product_id')
            ->join('orders', 'order_items.order_id', '=', 'orders.id')
            ->where('products.store_id', $store->id)
            ->whereNull('categories.parent_id')
            ->whereIn('orders.status', ['confirmed', 'shipped', 'out_for_delivery', 'delivered']);

        $applyDateFilter($salesByCategoryQuery, 'orders.created_at');

        $salesByCategory = $salesByCategoryQuery
            ->groupBy('categories.id', 'categories.name')
            ->select(
                'categories.name as category',
                DB::raw('SUM(order_items.quantity * products.price) as total_sales')
            )
            ->orderByDesc('total_sales')
            ->limit(7)
            ->get();

        $salesData = match($filter) {
            'last_7_days' => $this->getWeeklySales($store->id),
            'this_month' => $this->getMonthlySales($store->id),
            'this_year' => $this->getYearlySales($store->id),
            default => $this->getWeeklySales($store->id),
        };


        return response()->json(
            [
                'total_sales' => $totalSales,
                'pending_orders' => $pendingOrdersCount,
                'current_stock_value' => $currentStockValue,
                'total_products' => $productCount,
                'pending_orders_list' => $pendingOrders,
                'top_selling_products' => $topSellingProducts,
                'low_stock_products' => $lowStockProducts,
                'sales_by_category' => $salesByCategory,
                'sales_data' => $salesData,
            ]
        );
    }


    public function getWeeklySales($storeId)
    {
        $startDate = Carbon::today()->subDays(6);
        $endDate = Carbon::today();

        // Get grouped sales
        $rawSales = DB::table('orders')
            ->where('store_id', $storeId)
            ->whereIn('status', ['confirmed', 'shipped', 'out_for_delivery', 'delivered'])
            ->whereBetween('created_at', [$startDate->startOfDay(), $endDate->endOfDay()])
            ->select(
                DB::raw("DATE(created_at) as date"),
                DB::raw('SUM(total) as total_sales')
            )
            ->groupBy(DB::raw("DATE(created_at)"))
            ->pluck('total_sales', 'date');

        // Build 7-day result
        return collect(range(0, 6))->map(function ($i) use ($startDate, $rawSales) {
            $date = $startDate->copy()->addDays($i);

            return [
                'label' => $date->format('D') . '(' . $date->format('j F') . ')',
                // Example: Mon(17 March)
                'total_sales' => $rawSales[$date->toDateString()] ?? 0
            ];
        });
    }

    public function getMonthlySales($storeId)
    {
        $startDate = Carbon::now()->startOfMonth();
        $endDate = Carbon::today();

        $rawSales = DB::table('orders')
            ->where('store_id', $storeId)
            ->whereIn('status', ['confirmed', 'shipped', 'out_for_delivery', 'delivered'])
            ->whereBetween('created_at', [$startDate->startOfDay(), $endDate->endOfDay()])
            ->select(
                DB::raw('FLOOR((DAY(created_at)-1)/7) + 1 as week'),
                DB::raw('SUM(total) as total_sales')
            )
            ->groupBy('week')
            ->orderBy('week')
            ->pluck('total_sales', 'week');

        return collect(range(1, 5))->map(function ($week) use ($startDate, $endDate, $rawSales) {

            $weekStart = $startDate->copy()->addDays(($week - 1) * 7);
            $weekEnd = $weekStart->copy()->addDays(6);

            if ($weekStart->lt($startDate)) {
                $weekStart = $startDate->copy();
            }

            if ($weekEnd->gt($endDate)) {
                $weekEnd = $endDate->copy();
            }

            if ($weekStart->gt($endDate)) {
                return null;
            }

            return [
                'label' => $weekStart->format('j') . '-' . $weekEnd->format('j F'),
                'total_sales' => $rawSales[$week] ?? 0
            ];
        })->filter()->values();
    }

    public function getYearlySales($storeId)
    {
        $currentYear = Carbon::now()->year;

        $rawSales = DB::table('orders')
            ->where('store_id', $storeId)
            ->whereIn('status', ['confirmed', 'shipped', 'out_for_delivery', 'delivered'])
            ->whereYear('created_at', $currentYear)
            ->select(
                DB::raw('MONTH(created_at) as month'),
                DB::raw('SUM(total) as total_sales')
            )
            ->groupBy('month')
            ->orderBy('month')
            ->pluck('total_sales', 'month');

        return collect(range(1, 12))->map(function ($month) use ($rawSales) {
            return [
                'label' => Carbon::create()->month($month)->format('F'),
                'total_sales' => $rawSales[$month] ?? 0
            ];
        });
    }
}
