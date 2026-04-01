<?php

namespace Database\Seeders;

use App\Models\Country;
use App\Models\District;
use App\Models\MarketplaceCategory;
use App\Models\MarketplaceProduct;
use App\Models\Order;
use App\Models\OrderAddress;
use App\Models\OrderItem;
use App\Models\Payment;
use App\Models\Product;
use App\Models\Sale;
use App\Models\State;
use App\Models\Store;
use App\Models\StoreCategory;
use App\Models\StoreTheme;
use App\Models\StoreUser;
use App\Models\User;
use App\Models\UserProfile;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Faker\Factory as Faker;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $user = User::factory()->create([
            'name' => 'Test',
            'email' => 'test@mail.com',
            'email_verified_at' => now(),
            'role' => 'admin',
            'password' => Hash::make('test@123'),
        ]);

        UserProfile::create([
            'user_id' => $user->id,
        ]);

        $themes = [
            "slate",
            "gray",
            "zinc",
            "neutral",
            "stone",
            "red",
            "orange",
            "amber",
            "yellow",
            "lime",
            "green",
            "emerald",
            "teal",
            "cyan",
            "sky",
            "blue",
            "indigo",
            "violet",
            "purple",
            "fuchsia",
            "pink",
            "rose"
        ];

        foreach ($themes as $theme) {
            StoreTheme::create([
                'name' => $theme
            ]);
        }
    $categories = [
        ['name' => 'Fashion',     'icon' => 'mdi-tshirt-crew'],
        ['name' => 'Beauty',      'icon' => 'mdi-lipstick'],
        ['name' => 'Electronics', 'icon' => 'mdi-cellphone'],
        ['name' => 'Home',        'icon' => 'mdi-home-outline'],
        ['name' => 'Food',        'icon' => 'mdi-food'],
        ['name' => 'Crafts',      'icon' => 'mdi-palette'],
        ['name' => 'Sports',      'icon' => 'mdi-basketball'],
        ['name' => 'Others',      'icon' => 'mdi-dots-horizontal'],
    ];


        foreach ($categories as $category) {
            StoreCategory::create([
                'name' => $category['name'],
                'slug' => Str::slug($category['name']),
                'icon' => $category['icon'],
                'is_active' => true,
                // 'parent_id',
            ]);
        }
        
        Store::create([
            'name' => 'Jesko Store',
            'slug' => 'jesko-store',
            'description' => 'Home for all things nice',
            'pin' => Hash::make('1234'),
            'category_id' => rand(1, count($categories)),
            'theme_id' => rand(1, count($themes)),
        ]);

        StoreUser::create([
            'store_id' => 1,
            'user_id' => 1,
            'role' => 'owner',
            'joined_at' => now()
        ]);


        $faker = Faker::create();

        for ($i = 1; $i <= 20; $i++) {
            $name = $faker->unique()->company;
            $store = Store::create([
                'name' => $name,
                'slug' => Str::slug($name) . '-' . $i,
                'description' => $faker->catchPhrase,
                'pin' => Hash::make('1234'),
                'category_id' => rand(1, count($categories)),
                'theme_id' => rand(1, count($themes)),
            ]);

             StoreUser::create([
                'store_id' => $store->id,
                'user_id' => 1,
                'role' => 'owner',
                'joined_at' => now()
            ]);
        }


        // for ($i = 1; $i <= 20; $i++) {
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

        // for ($i = 1; $i <= 20; $i++) {
        //     Order::create([
        //         'user_id' => 1,
        //         'store_id' => 1,
        //         'order_number' => 'ORD0'.$i,
        //         'status' => 1,
        //         'subtotal' =>1,
        //         'tax' => 1,
        //         'shipping_fee' => 1,
        //         'discount' => 1,
        //         'total' => 1,
        //         'placed_at' => now()
        //     ]);
        // }

        // for ($i = 1; $i <= 3; $i++) {
        //     OrderItem::create([
        //         'order_id' => 1,
        //         'product_id' => 1,
        //         'quantity' => $i,
        //         'unit_price' => 99,
        //         'total_price' => 99*$i,
        //     ]);
        // }

        // OrderAddress::create([
        //     'order_id' => 1,
        //     'type' => 'shipping',
        //     'label' => 'Home',
        //     'name' => 'John Carter',
        //     'phone' => '1234567890',
        //     'address' => 'H.no 24/2, CV Hospital Road',
        //     'landmark' => 'Near CV Police Station',
        //     'postal_code' => '796000',
        //     'district' => 'Aizawl',
        //     'city' => 'Aizawl',
        //     'state' => 'Mizoram',
        //     'country' => 'India',
        // ]);

        // Payment::create([
        //     'order_id' => 1,
        //     'payment_mode' => 'cod',
        //     'amount' => 99.99,
        //     'status' => 'pending'
        // ]);

        // Sale::create([
        //     'store_id' => 1,
        //     'name' => 'Black Friday Sale',
        //     'type' => 'flash',
        //     'description' => 'Get 20% off on all products',
        //     'discount_type' => 'percentage',
        //     'discount_value' => 20,
        //     'start_at' => now(),
        //     'end_at' => now()->addDays(7),
        //     'status' => 'active'
        // ]);


        $country = Country::create([
            'name' => 'India',
            'iso_code' => 'IN',
            'phone_code' => '+91',
            'currency' => 'INR'
        ]);

        $state = State::create([
            'name' => 'Mizoram',
            'country_id' => $country->id
        ]);

        District::create([
            'name' => 'Aizawl',
            'state_id' => $state->id
        ]);
    }
}


