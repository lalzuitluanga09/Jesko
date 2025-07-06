<?php

namespace Database\Seeders;

use App\Models\Store;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {

        User::factory()->create([
            'name' => 'Test',
            'email' => 'test@mail.com',
            'password' => Hash::make('test'),
        ]);

        Store::create([
            'name' => 'Jesko Store',
            'slug' => 'jesko-store',
            'description' => 'Home for all things nice'
        ]);
    }
}
