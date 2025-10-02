# fanTune - Docker Setup

This guide will help you set up and run the fanTune application using Docker.

## Prerequisites

- Docker Desktop installed and running
- Docker Compose (included with Docker Desktop)

## Quick Start

### 1. Environment Setup

Create a `.env` file in the root directory with your environment variables:

```env
# Database
DATABASE_URL="postgresql://fantune_user:fantune_password@postgres:5432/fantune"
DIRECT_URL="postgresql://fantune_user:fantune_password@postgres:5432/fantune"

# NextAuth.js
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"

# Google OAuth (if using Google authentication)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# YouTube API
YOUTUBE_API_KEY="your-youtube-api-key"

# Add any other environment variables your app needs
```

### 2. Run the Setup Script (Recommended)

```bash
./docker-setup.sh
```

This script will:

- Build the Docker images
- Start the PostgreSQL database
- Run database migrations
- Start the application

### 3. Manual Setup (Alternative)

If you prefer to run commands manually:

```bash
# Build and start all services
docker-compose up -d

# Run database migrations
docker-compose exec app npx prisma db push

# (Optional) Seed the database
docker-compose exec app npx prisma db seed
```

## Development Mode

For development with hot reloading:

```bash
# Start development environment
docker-compose -f docker-compose.dev.yml up -d

# Run migrations
docker-compose -f docker-compose.dev.yml exec app-dev npx prisma db push
```

## Useful Docker Commands

### Application Management

```bash
# View application logs
docker-compose logs -f app

# Restart the application
docker-compose restart app

# Stop all services
docker-compose down

# Stop and remove volumes (⚠️ This will delete your database data)
docker-compose down -v
```

### Database Management

```bash
# Access PostgreSQL database
docker-compose exec postgres psql -U fantune_user -d fantune

# Run Prisma Studio (Database GUI)
docker-compose exec app npx prisma studio

# Reset database
docker-compose exec app npx prisma db push --force-reset

# View database logs
docker-compose logs postgres
```

### Development Commands

```bash
# Install new packages
docker-compose exec app npm install package-name

# Run linting
docker-compose exec app npm run lint

# Access app container shell
docker-compose exec app sh
```

## Services

The Docker setup includes:

- **app**: The fanTune Next.js application (Port 3000)
- **postgres**: PostgreSQL database (Port 5432)

## Volumes

- `postgres_data`: Persistent storage for PostgreSQL data

## Environment Variables

Make sure to set these environment variables in your `.env` file:

| Variable               | Description                         | Required                  |
| ---------------------- | ----------------------------------- | ------------------------- |
| `DATABASE_URL`         | PostgreSQL connection string        | Yes                       |
| `DIRECT_URL`           | Direct PostgreSQL connection string | Yes                       |
| `NEXTAUTH_SECRET`      | Secret for NextAuth.js              | Yes                       |
| `NEXTAUTH_URL`         | Base URL for NextAuth.js            | Yes                       |
| `GOOGLE_CLIENT_ID`     | Google OAuth client ID              | If using Google auth      |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret          | If using Google auth      |
| `YOUTUBE_API_KEY`      | YouTube Data API key                | If using YouTube features |

## Troubleshooting

### Port Already in Use

If port 3000 or 5432 is already in use, you can change the ports in `docker-compose.yml`:

```yaml
ports:
  - "3001:3000" # Change external port to 3001
```

### Database Connection Issues

1. Make sure PostgreSQL container is running: `docker-compose ps`
2. Check PostgreSQL logs: `docker-compose logs postgres`
3. Verify environment variables in `.env` file

### Application Won't Start

1. Check application logs: `docker-compose logs app`
2. Ensure all required environment variables are set
3. Try rebuilding: `docker-compose build --no-cache app`

### Permission Issues

If you encounter permission issues with files:

```bash
# Fix ownership (on Unix systems)
sudo chown -R $USER:$USER .
```

## Production Deployment

For production deployment, consider:

1. Using environment-specific `.env` files
2. Setting up proper secrets management
3. Using a managed database service
4. Implementing proper backup strategies
5. Setting up monitoring and logging

## Cleanup

To completely remove all Docker resources:

```bash
# Stop and remove containers, networks, and volumes
docker-compose down -v

# Remove images
docker image rm fantune-app fantune-postgres
```

## Support

If you encounter issues:

1. Check the logs: `docker-compose logs`
2. Verify your `.env` file configuration
3. Ensure Docker Desktop is running and up to date
4. Try rebuilding the containers: `docker-compose build --no-cache`
