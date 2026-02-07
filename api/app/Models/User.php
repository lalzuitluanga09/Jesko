<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Filament\Models\Contracts\FilamentUser;
use Filament\Panel;

class User extends Authenticatable implements FilamentUser
{
    use HasApiTokens, HasFactory, Notifiable, SoftDeletes;
    
    protected $fillable = [
        'name',
        'email',
        'phone',
        'role',
        'status',
        'is_store_owner',
        'password',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];


    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'phone_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function canAccessPanel(Panel $panel): bool
    {
        return $this->role === 'admin';
    }

    public function profile(): HasOne
    {
        return $this->hasOne(UserProfile::class);
    }

    public function addresses(): HasMany
    {
        return $this->hasMany(Address::class);
    }

    public function defaultAddress(): HasOne
    {
        return $this->hasOne(Address::class)->where('is_default', true);
    }

    public function followedStores(): BelongsToMany
    {
        return $this->belongsToMany(Store::class, 'store_followers');
    }

    public function marketplaceProducts(): HasMany
    {
        return $this->hasMany(MarketplaceProduct::class, 'user_id');
    }

    public function stores(): BelongsToMany
    {
        return $this->belongsToMany(Store::class, 'store_users');
    }

    public function storeUsers(): HasMany
    {
        return $this->hasMany(StoreUser::class);
    }

    public function getStoreUsersWithStore(): HasMany
    {
        return $this->hasMany(StoreUser::class)->with([
            'store:id,name,slug,logo'
        ]);
    }

    public function carts(): HasMany
    {
        return $this->hasMany(Cart::class);
    }

    public function getActiveCartAttribute()
    {
        return $this->carts()->where('status', 'active')->first();
    }

    public function wishlistProducts(): BelongsToMany 
    {
        return $this->belongsToMany(Product::class, 'wishlists');
    }

    public function orders(): HasMany
    {
        return $this->hasMany(Order::class);
    }

}      
