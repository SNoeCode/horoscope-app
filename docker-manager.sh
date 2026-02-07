#!/bin/bash

# Docker Management Script for Horoscope App
# Usage: ./docker-manager.sh [command]

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Helper functions
print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

print_info() {
    echo -e "${YELLOW}ℹ $1${NC}"
}

# Check if Docker is installed
check_docker() {
    if ! command -v docker &> /dev/null; then
        print_error "Docker is not installed. Please install Docker first."
        exit 1
    fi
    
    if ! command -v docker-compose &> /dev/null; then
        print_error "Docker Compose is not installed. Please install Docker Compose first."
        exit 1
    fi
    
    print_success "Docker and Docker Compose are installed"
}

# Start production environment
start_prod() {
    print_info "Starting production environment..."
    docker-compose up -d --build
    print_success "Production environment started"
    print_info "Frontend: http://localhost"
    print_info "Backend API: http://localhost:5000"
}

# Start development environment
start_dev() {
    print_info "Starting development environment..."
    docker-compose -f docker-compose.dev.yml up
}

# Stop all services
stop() {
    print_info "Stopping all services..."
    docker-compose down
    print_success "All services stopped"
}

# Restart services
restart() {
    print_info "Restarting services..."
    docker-compose restart
    print_success "Services restarted"
}

# View logs
logs() {
    if [ -z "$1" ]; then
        docker-compose logs -f
    else
        docker-compose logs -f "$1"
    fi
}

# Build images
build() {
    print_info "Building Docker images..."
    docker-compose build --no-cache
    print_success "Images built successfully"
}

# Clean up everything
clean() {
    print_info "Cleaning up Docker resources..."
    read -p "This will remove all containers, images, and volumes. Continue? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        docker-compose down -v --rmi all
        print_success "Cleanup complete"
    else
        print_info "Cleanup cancelled"
    fi
}

# Check status
status() {
    print_info "Container Status:"
    docker-compose ps
    echo
    print_info "Resource Usage:"
    docker stats --no-stream
}

# Access container shell
shell() {
    if [ "$1" == "frontend" ]; then
        docker exec -it horoscope-frontend sh
    elif [ "$1" == "backend" ]; then
        docker exec -it horoscope-api bash
    else
        print_error "Please specify 'frontend' or 'backend'"
        exit 1
    fi
}

# Run tests
test() {
    print_info "Running tests in backend..."
    docker exec horoscope-api python test_scraper.py
}

# Backup data
backup() {
    print_info "Creating backup..."
    BACKUP_DIR="backups/$(date +%Y%m%d_%H%M%S)"
    mkdir -p "$BACKUP_DIR"
    
    # Backup cache
    docker run --rm -v $(pwd)/cache:/data -v $(pwd)/$BACKUP_DIR:/backup alpine tar czf /backup/cache.tar.gz /data
    
    print_success "Backup created in $BACKUP_DIR"
}

# Show help
show_help() {
    cat << EOF
Docker Management Script for Horoscope App

Usage: ./docker-manager.sh [command]

Commands:
    start-prod      Start production environment
    start-dev       Start development environment (with hot reload)
    stop            Stop all services
    restart         Restart all services
    logs [service]  View logs (optionally for specific service)
    build           Build Docker images
    clean           Remove all containers, images, and volumes
    status          Show container status and resource usage
    shell [service] Access shell in container (frontend/backend)
    test            Run backend tests
    backup          Backup application data
    help            Show this help message

Examples:
    ./docker-manager.sh start-prod
    ./docker-manager.sh logs backend
    ./docker-manager.sh shell frontend
    ./docker-manager.sh status

EOF
}

# Main script
main() {
    check_docker
    
    case "$1" in
        start-prod)
            start_prod
            ;;
        start-dev)
            start_dev
            ;;
        stop)
            stop
            ;;
        restart)
            restart
            ;;
        logs)
            logs "$2"
            ;;
        build)
            build
            ;;
        clean)
            clean
            ;;
        status)
            status
            ;;
        shell)
            shell "$2"
            ;;
        test)
            test
            ;;
        backup)
            backup
            ;;
        help|*)
            show_help
            ;;
    esac
}

# Run main function with all arguments
main "$@"
