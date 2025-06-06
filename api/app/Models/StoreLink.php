<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class StoreLink extends Model
{
    protected $fillable = [
        'store_id',
        'name',
        'url',
    ];

    protected $casts = [
        'store_id' => 'integer',
    ];
}
