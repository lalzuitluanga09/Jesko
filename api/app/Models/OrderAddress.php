<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class OrderAddress extends Model
{
    use HasFactory;

    protected $fillable = [
        'order_id',
        'type',
        'label',
        'name',
        'phone',
        'address',
        'landmark',
        'postal_code',
        'district',
        'city',
        'state',
        'country',
    ];
    

    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class);
    }
}
