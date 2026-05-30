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
        Schema::create('shipments', function (Blueprint $table) {
            $table->id();
            $table->string('tracking_number')->unique();
            $table->string('status'); 
            $table->string('driver_name')->nullable();
            $table->string('current_location')->nullable();
            $table->integer('progress_percentage')->default(0);
            $table->string('estimated_time')->nullable();
            $table->decimal('weight', 8, 2)->nullable();
            $table->string('dimensions')->nullable();
            $table->string('service_type')->nullable(); 
            $table->string('insurance')->nullable();
            $table->string('origin')->nullable();
            $table->string('destination')->nullable();
            $table->text('origin_address')->nullable();
            $table->text('destination_address')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('shipments');
    }
};
