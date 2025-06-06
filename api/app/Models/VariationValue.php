<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class VariationValue extends Model
{
    protected $fillable = [
        'variation_attribute_id',
        'value'
    ];

    public function attribute(): BelongsTo
    {
        return $this->belongsTo(VariationAttribute::class);
    }

    public function products(): BelongsToMany
    {
        return $this->belongsToMany(Product::class, 'product_variant_values');
    }
}
