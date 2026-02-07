<?php

namespace App\Filament\Resources\Stores\Schemas;

use App\Models\District;
use App\Models\StoreTheme;
use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class StoreForm
{
    public static function configure(Schema $schema): Schema
    {
        $themes = StoreTheme::all()->pluck('name', 'id')->toArray();
        $locations = District::all()->pluck('name', 'id')->toArray();
        return $schema
            ->components([
                TextInput::make('name')
                    ->required(),
                TextInput::make('slug')
                    ->required(),
                Textarea::make('description')
                    ->columnSpanFull(),
                FileUpload::make('logo')
                    ->disk('public')
                    ->directory('logos')
                    ->image(),
                FileUpload::make('cover_image')
                    ->disk('public')
                    ->directory('cover_images')
                    ->image(),
                Toggle::make('is_published')
                    ->required(),
                Toggle::make('is_featured')
                    ->required(),
                DateTimePicker::make('joined_at')->seconds(false),
                Select::make('category_id')
                    ->relationship('category', 'name'),
                
                Select::make('Theme')
                    ->options($themes),
                Select::make('Location')
                    ->options($locations),
                TextInput::make('pin'),
                Select::make('owner_id')
                    ->label('Store Owner')
                    ->relationship('owner', 'email')
                    ->searchable(),
            ]);
    }
}
