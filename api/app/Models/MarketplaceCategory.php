<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class MarketplaceCategory extends Model
{
    protected $fillable = [
        'name'
    ];

    public function products(): HasMany
    {
        return $this->hasMany(MarketplaceProduct::class, 'category_id');
    }

}
