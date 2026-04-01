<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use App\Models\Store;
use Illuminate\Http\Request;

use function Laravel\Prompts\info;

class PaymentController extends Controller
{
    public function index(Request $request, $storeSlug)
    {
        $searchTerm = $request->query('searchTerm');
        $status = $request->query('status');
        $paymentMode = $request->query('paymentMode');
        $from = $request->query('from');
        $to = $request->query('to');

        $storeId = Store::where('slug', $storeSlug)->value('id');

        $payments = Payment::with('order.store')
            ->whereHas('order', fn($q) => $q->where('store_id', $storeId))
            ->when($searchTerm, fn($q) => $q->whereHas('order', fn($oq) => $oq->where('order_number', 'like', "%{$searchTerm}%")))
            ->when($status, fn($q) => $q->where('status', $status))
            ->when($paymentMode, fn($q) => $q->where('payment_mode', $paymentMode))
            ->when($from, fn($q) => $q->where('created_at', '>=', $from))
            ->when($to, fn($q) => $q->where('created_at', '<=', $to))
            ->orderBy('created_at', 'desc')
            ->paginate(10)
            ->through(
                fn($payment) => [
                    'id' => $payment->id,
                    'order_id' => $payment->order_id,
                    'order_number' => $payment->order->order_number,
                    'gateway' => $payment->gateway,
                    'transaction_id' => $payment->transaction_id,
                    'receipt_number' => $payment->receipt_number,
                    'amount' => $payment->amount,
                    'status' => $payment->status,
                    'payment_mode' => $payment->payment_mode,
                    'paid_at' => $payment->paid_at,
                    'meta' => $payment->meta,
                ]
            );

        return response()->json($payments);
    }

    public function markPaid(Request $request, $stpreslug, $id)
    {
        $payment = Payment::findOrFail($id);
        $payment->status = 'paid';
        $payment->paid_at = now();
        $payment->save();

        return response()->json(['message' => 'Payment marked as paid']);
    }

    public function markUnpaid(Request $request, $storeSlug, $id)
    {
        $payment = Payment::findOrFail($id);
        $payment->status = 'pending';
        $payment->paid_at = null;
        $payment->save();

        return response()->json(['message' => 'Payment marked as unpaid']);
    }
}
