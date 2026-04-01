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
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('store_id')->constrained('stores')->onDelete('cascade');

            $table->string('order_number')->unique();
            
            $table->enum('status', [
                'pending',
                'confirmed',
                'shipped',
                'out_for_delivery',
                'delivered',
                'cancelled',
                'refunded'
            ])->default('pending');

            $table->decimal('subtotal', 10, 2)->default(0);
            $table->decimal('tax', 10, 2)->default(0);
            $table->decimal('shipping_fee', 10, 2)->default(0);
            $table->decimal('discount', 10, 2)->default(0);
            $table->decimal('total', 10, 2)->default(0);

            $table->text('note')->nullable();

            $table->timestamp('placed_at')->nullable();

            $table->foreignId('coupon_id')->nullable()->constrained('coupons')->onDelete('set null');
            $table->decimal('coupon_discount', 10, 2)->default(0);
            $table->json('coupon_snapshot')->nullable();

            $table->timestamps();
            $table->softDeletes();
                
            $table->index(['store_id', 'status'], 'idx_orders_store_status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
