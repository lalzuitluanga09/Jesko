<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'store_id',
        'name',
        'description',
        'price',
        'stock',
        'sku',
        'parent_id',
        'status',
        'type'
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'stock' => 'integer',
        'parent_id' => 'integer',
    ];

    public function parent(): BelongsTo
    {
        return $this->belongsTo(Product::class, 'parent_id');
    }

    public function children(): HasMany
    {
        return $this->hasMany(Product::class, 'parent_id');
    }
    public function defaultImage(): HasOne
    {
        return $this->hasOne(ProductImage::class)->where('is_primary', true);
    }

    public function images(): HasMany
    {
        return $this->hasMany(ProductImage::class);
    }

    public function store(): BelongsTo
    {
        return $this->belongsTo(Store::class);
    }

    public function marketplaceProducts(): HasOne
    {
        return $this->hasOne(MarketplaceProduct::class);
    }

    public function categories(): BelongsToMany
    {
        return $this->belongsToMany(Category::class, 'product_categories');
    }

    public function tags(): BelongsToMany
    {
        return $this->belongsToMany(Tag::class, 'product_tags');
    }

    public function attributes(): HasMany
    {
        return $this->hasMany(ProductAttribute::class);
    }

    public function variations(): HasMany
    {
        return $this->hasMany(Product::class, 'parent_id');
    }

    public function variationAttributes(): HasMany
    {
        return $this->hasMany(ProductVariationAttribute::class, 'product_id');
    }

    public function wishlist(): HasMany
    {
        return $this->hasMany(Wishlist::class, 'product_id');
    }

    //If you want to access users who wishlisted the product directly:
    public function wishlistedByUsers(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'wishlists', 'product_id', 'user_id')->withTimestamps();
    }

    //If you want to check whether a specific user wishlisted the product:
    public function isWishlistedBy(User $user): bool
    {
        return $this->wishlist()->where('user_id', $user->id)->exists();
    }

    public function orderItems(): HasMany
    {
        return $this->hasMany(OrderItem::class);
    }

    public function sales(): BelongsToMany
    {
        return $this->belongsToMany(Sale::class, 'sale_products')
            ->withTimestamps()
            ->withPivot('sale_price');
    }

    public function activeSale(): BelongsToMany
    {
        return $this->belongsToMany(Sale::class, 'sale_products')
            ->where('sales.start_at', '<=', now())
            ->where('sales.end_at', '>=', now())
            ->where('sales.status', 'active')
            ->withTimestamps();
    }

    public function getActiveSale()
    {
        $sale = $this->activeSale()->first();

        if ($sale) {
            return $sale;
        }

        return $this->categories()
            ->with(['activeSale' => function ($q) {
                $q->where('sales.start_at', '<=', now())
                ->where('sales.end_at', '>=', now())
                ->where('sales.status', 'active');
            }])
            ->get()
            ->pluck('activeSale')
            ->flatten()
            ->first();
    }

    public function getDiscountedPrice()
    {
        $sale = $this->getActiveSale();

        if (!$sale) {
            return $this->price;
        }

        if ($sale->discount_type === 'percentage') {
            return round($this->price - ($this->price * ($sale->discount_value / 100)), 2);
        }

        if ($sale->discount_type === 'fixed') {
            return max($this->price - $sale->discount_value, 0);
        }

        return $this->price;
    }


};
