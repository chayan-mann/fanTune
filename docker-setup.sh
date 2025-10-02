#!/bin/bash

# Docker setup script for fanTune app

echo "🚀 Setting up fanTune with Docker..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker and try again."
    exit 1
fi

# Check if .env file exists
if [ ! -f .env ]; then
    echo "⚠️  .env file not found. Please create one with your environment variables."
    echo "You can use .env.example as a template if available."
    exit 1
fi

echo "📦 Building Docker images..."
docker-compose build

echo "🗄️  Starting PostgreSQL database..."
docker-compose up -d postgres

echo "⏳ Waiting for database to be ready..."
sleep 10

echo "🔄 Running database migrations..."
docker-compose run --rm app npx prisma db push

echo "🌱 (Optional) Running database seed..."
docker-compose run --rm app npx prisma db seed 2>/dev/null || echo "No seed script found, skipping..."

echo "🚀 Starting the application..."
docker-compose up -d app

echo "✅ fanTune is now running!"
echo "🌐 Access the app at: http://localhost:3000"
echo "🗄️  PostgreSQL is running on: localhost:5432"
echo ""
echo "📋 Useful commands:"
echo "  View logs: docker-compose logs -f app"
echo "  Stop all services: docker-compose down"
echo "  Restart app: docker-compose restart app"
echo "  Run Prisma Studio: docker-compose exec app npx prisma studio"