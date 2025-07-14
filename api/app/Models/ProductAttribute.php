<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductAttribute extends Model
{
    protected $fillable = [
        'product_id',
        'name'
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function values()
    {
        return $this->hasMany(ProductVariationAttribute::class, 'attribute_id');
    }

    public function getUniqueValuesAttribute()
    {
        return $this->values->pluck('value')->unique()->values();
    }

}
