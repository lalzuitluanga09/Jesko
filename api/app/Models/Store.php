<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
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
    ];

    protected $casts = [
        'is_published' => 'boolean',
        'is_featured' => 'boolean',
        'launch_at' => 'datetime',
        'category_id' => 'integer',
        'theme_id' => 'integer',
    ];

    public function category(): BelongsTo
    {
        return $this->belongsTo(StoreCategory::class, 'category_id');
    }

    public function theme(): BelongsTo
    {
        return $this->belongsTo(StoreTheme::class, 'theme_id');
    }

    public function followers(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'store_followers');
    }

    public function users(): HasMany
    {
        return $this->hasMany(StoreUser::class, 'store_id');
    }

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
        return $this->hasMany(StoreProduct::class, 'store_id');
    }

    public function categories(): HasMany
    {
        return $this->hasMany(Category::class, 'store_id');
    }
}
