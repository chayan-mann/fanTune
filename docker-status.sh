
echo "🔍 fanTune Docker Status Check"
echo "==============================="

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running"
    exit 1
fi

echo "✅ Docker is running"

# Check container status
echo ""
echo "📦 Container Status:"
docker-compose -f docker-compose.supabase.yml ps

# Check health endpoint
echo ""
echo "🏥 Health Check:"
health_response=$(curl -s http://localhost:3000/api/health)
if [ $? -eq 0 ]; then
    echo "✅ Health endpoint is responding"
    echo "$health_response" | jq
else
    echo "❌ Health endpoint is not responding"
fi

# Check main application
echo ""
echo "🌐 Main Application:"
main_response=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000)
if [ "$main_response" = "200" ]; then
    echo "✅ Main application is responding (HTTP $main_response)"
    echo "🚀 Application is available at: http://localhost:3000"
else
    echo "❌ Main application is not responding (HTTP $main_response)"
fi

# Show recent logs
echo ""
echo "📝 Recent Logs (last 10 lines):"
docker-compose -f docker-compose.supabase.yml logs --tail=10 app

echo ""
echo "==============================="
echo "🎉 fanTune Docker Status Complete!"