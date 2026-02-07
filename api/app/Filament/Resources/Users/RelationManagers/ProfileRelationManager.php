<?php

namespace App\Filament\Resources\Users\RelationManagers;

use Filament\Actions\CreateAction;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class ProfileRelationManager extends RelationManager
{
    protected static string $relationship = 'profile';

    public function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('gender'),
                TextColumn::make('date_of_birth')->date(),
            ])
            ->headerActions([
                CreateAction::make(),
            ]);
    }
}
