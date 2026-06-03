FROM php:8.2-cli

# Install dependencies for Laravel & Postgres
RUN apt-get update && apt-get install -y \
    libpq-dev \
    libzip-dev \
    unzip \
    && docker-php-ext-install pdo pdo_pgsql zip

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /app
COPY . .

RUN composer install --no-dev --optimize-autoloader

# Beri hak akses ke folder storage
RUN chmod -R 775 storage bootstrap/cache

# Jalankan server bawaan Laravel
CMD php artisan serve --host=0.0.0.0 --port=${PORT:-10000}
