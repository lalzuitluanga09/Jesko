<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Payment extends Model
{
    use SoftDeletes;
    protected $fillable = [
        'order_id', //
        'payment_mode', // cod, card, upi, net_banking
        'gateway',
        'transaction_id',
        'receipt_number',
        'amount', //
        'status', // pending, paid, failed, refunded
        'paid_at',
        'meta'
    ];

    protected $casts = [
        'meta' => 'array',
    ];

    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class);
    }

}
