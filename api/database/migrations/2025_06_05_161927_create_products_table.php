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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->foreignId('store_id')->constrained('stores')->onDelete('cascade');
            $table->string('name');
            $table->text('description')->nullable();
            $table->decimal('price', 10, 2)->default(0);
            $table->unsignedInteger('stock')->default(0);
            $table->string('sku')->unique()->nullable();
            $table->foreignId('parent_id')->nullable()->constrained('products')->onDelete('cascade');
            $table->enum('status', ['active', 'draft'])->default('draft');
            $table->enum('type', ['simple', 'variable', 'variant'])->default('simple');
            $table->timestamps();
            $table->softDeletes();
            
            $table->index(['store_id', 'status'], 'idx_products_store_status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
