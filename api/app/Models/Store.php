<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\HasOneThrough;
use Illuminate\Database\Eloquent\SoftDeletes;

class Store extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'slug',
        'logo',
        'description',
        'cover_image',
        'is_published',
        'is_featured',
        'launch_at',
        'category_id',
        'theme_id',
        'location_id',
        'pin'
    ];

    protected $casts = [
        'is_published' => 'boolean',
        'is_featured' => 'boolean',
        'launch_at' => 'datetime',
        'category_id' => 'integer',
        'theme_id' => 'integer',
    ];

    public function owner(): HasOneThrough
    {
        return $this->hasOneThrough(
            User::class,
            StoreUser::class,
            'store_id',
            'id',
            'id',
            'user_id'
        )->where('store_users.role', 'owner');
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(StoreCategory::class, 'category_id');
    }

    public function storeTheme(): BelongsTo
    {
        return $this->belongsTo(StoreTheme::class, 'theme_id');
    }

    public function followers(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'store_followers');
    }

    // public function users(): HasMany
    // {
    //     return $this->hasMany(StoreUser::class, 'store_id');
    // }

    public function links(): HasMany
    {
        return $this->hasMany(StoreLink::class, 'store_id');
    }

    public function policies(): HasMany
    {
        return $this->hasMany(StorePolicy::class, 'store_id');
    }

    public function products(): HasMany
    {
        return $this->hasMany(Product::class, 'store_id')->whereNull('parent_id');
    }

    public function categories(): HasMany
    {
        return $this->hasMany(Category::class, 'store_id');
    }

    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'store_users')
                    ->withPivot('role', 'status', 'joined_at')
                    ->withTimestamps();
    }

    public function orders(): HasMany
    {
        return $this->hasMany(Order::class);
    }

    public function customers()
    {
        return $this->hasManyThrough(
            User::class,
            Order::class,
            'store_id', // Foreign key on orders table
            'id',       // Foreign key on users table
            'id',       // Local key on stores table
            'user_id'   // Local key on orders table
        )->distinct();
    }
    
    public function coupons(): HasMany
    {
        return $this->hasMany(Coupon::class);
    }

    public function sales(): HasMany
    {
        return $this->hasMany(Sale::class);
    }

    public function activeSale(): HasOne
    {
        return $this->hasOne(Sale::class)
            ->where('status', 'active')
            ->where('start_at', '<=', now())
            ->where('end_at', '>=', now())
            ->latest('start_at');
    }

    public function location(): BelongsTo
    {
        return $this->belongsTo(District::class, 'location_id');
    }
}
