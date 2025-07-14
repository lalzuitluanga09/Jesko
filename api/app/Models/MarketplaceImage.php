<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MarketplaceImage extends Model
{
    protected $fillable = [
        'marketplace_product_id',
        'image_url',
        'position'
    ];
}
