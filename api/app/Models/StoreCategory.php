<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class StoreCategory extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'slug',
        'icon',
        'is_active',
        'parent_id',
    ];
    
    protected $casts = [
        'is_active' => 'boolean',
        'parent_id' => 'integer',
    ];

    public function parent(): BelongsTo
    {
        return $this->belongsTo(StoreCategory::class, 'parent_id');
    }

    public function subCategories(): HasMany
    {
        return $this->hasMany(StoreCategory::class, 'parent_id');
    }
}
