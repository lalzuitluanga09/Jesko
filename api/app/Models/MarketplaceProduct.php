<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class MarketplaceProduct extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'user_id',
        'title', //-
        'description',
        'price', //-
        'discounted_price',
        'condition', //-
        'category_id',
        'location_id',
        'tags',
        'status',
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'discounted_price' => 'decimal:2',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function images(): HasMany
    {
        return $this->hasMany(MarketplaceImage::class)->orderBy('position');
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(MarketplaceCategory::class, 'category_id');
    }

    public function location(): BelongsTo
    {
        return $this->belongsTo(District::class, 'location_id');
    }
}
