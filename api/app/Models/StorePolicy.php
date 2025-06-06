<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class StorePolicy extends Model
{
    protected $fillable = [
        'store_id',
        'type',
        'title',
        'content',
        'active'
    ];

    /**
     * Get the store that owns the policy.
     */
    public function store(): BelongsTo
    {
        return $this->belongsTo(Store::class, 'store_id');
    }
}
