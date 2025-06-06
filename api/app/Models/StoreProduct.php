<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class StoreProduct extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'store_id',
        'product_id',
        'price',
        'discounted_price',
        'sale_start_at',
        'sale_end_at',
        'is_visible',
        'is_featured',
        'parent_id',
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'discounted_price' => 'decimal:2',
        'sale_start_at' => 'datetime',
        'sale_end_at' => 'datetime',
        'is_visible' => 'boolean',
        'is_featured' => 'boolean',
    ];

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }
}
