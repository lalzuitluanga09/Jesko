<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('marketplace_products', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('title');
            $table->text('description')->nullable();
            $table->decimal('price', 10, 2);
            $table->decimal('discounted_price', 10, 2)->nullable();
            $table->enum('condition', ['new', 'like_new', 'used', 'for_parts']);
            $table->foreignId('category_id')->nullable()->constrained('marketplace_categories')->nullOnDelete();
            $table->foreignId('location_id')->nullable()->constrained('districts')->nullOnDelete();
            $table->json('tags')->nullable();
            $table->enum('status', ['active', 'sold', 'hidden'])->default('active');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('marketplace_products');
    }
};
