<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Sale extends Model
{
    protected $fillable = [
        'store_id',
        'name',
        'type',
        'description',
        'discount_type',
        'rules',
        'discount_value',
        'start_at',
        'end_at',
        'status',
    ];

    protected $casts = [
        'start_at' => 'datetime',
        'end_at' => 'datetime',
        'discount_value' => 'decimal:2',
    ];

    public function store(): BelongsTo
    {
        return $this->belongsTo(Store::class);
    }

    public function products(): BelongsToMany
    {
        return $this->belongsToMany(Product::class, 'sale_products')
            ->withTimestamps()
            ->withPivot('sale_price');
    }

    public function categories(): BelongsToMany
    {
        return $this->belongsToMany(Category::class, 'sale_categories')
            ->withTimestamps();
    }

    public function isActive(): bool
    {
        return $this->status === 'active'
            && now()->between($this->start_at, $this->end_at);
    }
}
