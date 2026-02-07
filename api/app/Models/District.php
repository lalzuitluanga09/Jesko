<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class District extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'state_id',
    ];

    public function state(): BelongsTo
    {
        return $this->belongsTo(State::class);
    }

    public function marketplace_products(): HasMany
    {
        return $this->hasMany(MarketplaceProduct::class, 'location_id');
    }

    public function stores(): HasMany
    {
        return $this->hasMany(Store::class, 'location_id');
    }
}
