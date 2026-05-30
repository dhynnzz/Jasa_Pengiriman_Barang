<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Shipment extends Model
{
    protected $guarded = [];

    public function histories(): HasMany
    {
        return $this->hasMany(ShipmentHistory::class)->orderBy('occurred_at', 'desc');
    }
}
