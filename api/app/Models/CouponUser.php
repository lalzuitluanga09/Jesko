<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CouponUser extends Model
{
    protected $fillable = [
        'coupon_id',
        'user_id',
        'times_used',
        'last_used_order_id',
    ];
    
    public function coupon(): BelongsTo 
    {
        return $this->belongsTo(Coupon::class);
    }

    public function user(): BelongsTo 
    {
        return $this->belongsTo(User::class);
    }
}
