<?php

namespace Database\Seeders;

use App\Models\MarketplaceCategory;
use App\Models\MarketplaceImage;
use App\Models\MarketplaceProduct;
use App\Models\Product;
use App\Models\Store;
use App\Models\StoreCategory;
use App\Models\StoreUser;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Faker\Factory as Faker;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // User::factory()->create([
        //     'name' => 'Test',
        //     'email' => 'test@mail.com',
        //     'password' => Hash::make('test'),
        // ]);
        
        // Store::create([
        //     'name' => 'Jesko Store',
        //     'slug' => 'jesko-store',
        //     'description' => 'Home for all things nice',
        //     'pin' => Hash::make('1234')
        // ]);

        // StoreUser::create([
        //     'store_id' => 1,
        //     'user_id' => 1,
        //     'role' => 'owner',
        //     'joined_at' => now()
        // ]);

        // $categories = [
        //     'Electronics',
        //     'Fashion',
        //     'Furniture',
        //     'Personal Care',
        //     'Books & Stationery',
        //     'Food',
        //     'Toys',
        //     'Sports',
        //     'Health & Wellness',
        //     'Pet Supplies',
        //     'Handmade & Crafts',
        // ];

        // foreach ($categories as $category) {
        //     StoreCategory::create([
        //         'name' => $category,
        //         'slug' => Str::slug($category),
        //         // 'icon' => ,
        //         'is_active' => true,
        //         // 'parent_id',
        //     ]);
        // }


        $faker = Faker::create();

        // for ($i = 1; $i <= 100; $i++) {
        //     $name = $faker->unique()->company;
        //     Store::create([
        //         'name' => $name,
        //         'slug' => Str::slug($name) . '-' . $i,
        //         'description' => $faker->catchPhrase,
        //         'pin' => Hash::make('1234'),
        //     ]);
        // }


        // for ($i = 1; $i <= 50; $i++) {
        //     $name = $faker->unique()->name;
        //     Product::create([
        //         'store_id' => 1,
        //         'name' => $name,
        //         'price' => 99,
        //         'stock' => 10,
        //         'status' => 'active'
        //     ]);
        // }

        // for ($i = 1; $i <= 20; $i++) {
        //     $name = $faker->unique()->name;
        //     MarketplaceProduct::create([
        //         'user_id' => 1,
        //         'title' => $name,
        //         'price' => 123,
        //         'condition' => 'new'
        //     ]);
        // }

        // $items = ['Electronics', 'Fashion', 'Automobile', 'Furniture', 'Toys', 'Books & Stationery', 'Food', 'Cosmetics', 'Others'];

        // foreach ($items as $item) {
        //     MarketplaceCategory::create([
        //         'name' => $item
        //     ]);
        // }

        $items = MarketplaceProduct::all();

        foreach ($items as $item) {
            MarketplaceImage::create([
                'marketplace_product_id' => $item->id,
                'image_url' => 'test',
                'position' => 0
            ]);
        }
    }
}
