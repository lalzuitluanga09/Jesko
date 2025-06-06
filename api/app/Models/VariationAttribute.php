<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class VariationAttribute extends Model
{
    use HasFactory;

    protected $fillable = [];

    public function values(): HasMany
    {
        return $this->hasMany(VariationValue::class);
    }
}
