<?php

namespace App\Filament\Resources\Stores\Pages;

use App\Filament\Resources\Stores\StoreResource;
use App\Models\StoreUser;
use App\Models\User;
use Filament\Resources\Pages\CreateRecord;
use Illuminate\Support\Facades\Hash;

class CreateStore extends CreateRecord
{
    protected static string $resource = StoreResource::class;

    protected function mutateFormDataBeforeCreate(array $data): array
    {
        $data['pin'] = Hash::make($data['pin']);
        return $data;
    }

    protected function afterCreate(): void
    {
        $record = $this->record;
        $data = $this->data;

        StoreUser::create([
            'store_id' => $record->id,
            'user_id' => $data['owner_id'],
            'role' => 'owner',
        ]);

        User::where('id', $data['owner_id'])->update(['role' => 'seller']);
    }

}
