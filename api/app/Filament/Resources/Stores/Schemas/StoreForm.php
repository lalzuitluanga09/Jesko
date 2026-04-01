<?php

namespace App\Filament\Resources\Stores\Schemas;

use App\Models\District;
use App\Models\StoreTheme;
use App\Models\User;
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
                DateTimePicker::make('launch_at')
                    ->seconds(false),
                Select::make('category_id')
                    ->relationship('category', 'name'),
                
                Select::make('theme_id')
                    ->label('Theme')
                    ->options($themes),
                Select::make('location_id')
                    ->label('Location')
                    ->options($locations),
                TextInput::make('pin')
                    ->password()
                    ->revealable()
                    ->afterStateHydrated(fn ($component) => $component->state(''))
                    ->dehydrated(fn ($state) => filled($state)),
                Select::make('owner_id')
                    ->label('Store Owner')
                    ->searchable()
                    ->getSearchResultsUsing(fn (string $search) =>
                        User::where('email', 'like', "%{$search}%")
                            ->limit(50)
                            ->pluck('email', 'id')
                    )
                    ->getOptionLabelUsing(fn ($value): ?string =>
                        User::find($value)?->email
                    )
            ]);
    }
}
