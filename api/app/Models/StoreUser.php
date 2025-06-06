<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class StoreUser extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'store_id',
        'user_id',
        'role',
        'status',
    ];
    protected $casts = [
        'store_id' => 'integer',
        'user_id' => 'integer',
        'role' => 'string',
        'status' => 'string',
    ];

    public function store(): BelongsTo
    {
        return $this->belongsTo(Store::class, 'store_id');
    }

    public function user(): BelongsTo   
    {
        return $this->belongsTo(User::class, 'user_id');
    }
    public function isOwner(): bool
    {
        return $this->role === 'owner';
    }

    public function isManager(): bool
    {
        return $this->role === 'manager';
    }

    public function isStaff(): bool
    {
        return $this->role === 'staff';
    }
}