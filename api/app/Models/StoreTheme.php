<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StoreTheme extends Model
{
    protected $fillable = [
        'name',
    ];

    protected $casts = [
        'name' => 'string',
    ];

    /**
     * Get the stores that use this theme.
     */
    public function stores()
    {
        return $this->hasMany(Store::class, 'theme_id');
    }
}
