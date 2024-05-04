<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Car extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $fillable = [
        'brand',
        'model',
        'fuel_type',
        'price',
        'gearbox',
        'available',
        'photo1',
        'photo2',
    ];
}
