#!/bin/bash

# ORM Learning Project Deployment Script
# This script sets up and deploys the application

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Check if environment argument is provided
if [ $# -eq 0 ]; then
    print_error "Please specify environment: development or production"
    echo "Usage: ./deploy.sh [development|production]"
    exit 1
fi

ENVIRONMENT=$1

# Validate environment
if [ "$ENVIRONMENT" != "development" ] && [ "$ENVIRONMENT" != "production" ]; then
    print_error "Invalid environment. Use 'development' or 'production'"
    exit 1
fi

print_info "🚀 Starting deployment for $ENVIRONMENT environment..."

# Set NODE_ENV
export NODE_ENV=$ENVIRONMENT
print_info "Set NODE_ENV to $ENVIRONMENT"

# Install dependencies
print_info "📦 Installing dependencies..."
if npm install; then
    print_success "Dependencies installed successfully"
else
    print_error "Failed to install dependencies"
    exit 1
fi

# Setup database
print_info "🗄️  Setting up database..."
if npm run db:setup; then
    print_success "Database setup completed"
else
    print_warning "Database might already exist. Continuing..."
fi

# Run migrations
print_info "🔄 Running database migrations..."
if npm run db:migrate; then
    print_success "Migrations completed successfully"
else
    print_warning "Migrations might already be up to date"
fi

# Start the application
print_success "🎉 Deployment completed successfully!"
print_info "🌐 Starting server for $ENVIRONMENT environment..."
print_info "📝 API Documentation will be available at: http://localhost:3000/api-docs"

npm start
