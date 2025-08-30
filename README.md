# ORM Learning Project 🚀

A Node.js project for learning Object-Relational Mapping (ORM) using **Sequelize** with **PostgreSQL** database. This project demonstrates CRUD operations, database migrations, and API documentation with Swagger.

## 🛠️ Technologies Used

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **Sequelize** - ORM for database operations
- **PostgreSQL** - Relational database
- **Swagger** - API documentation
- **Nodemon** - Development server

## 📁 Project Structure

```
Project-ORM/
├── controllers/           # Business logic
│   └── userController.js
├── routes/               # API routes
│   └── userRoutes.js
├── models/               # Sequelize models
│   ├── index.js
│   └── user.js
├── migrations/           # Database migrations
│   └── 20250830142052-create-user.js
├── config/              # Database configuration
│   └── config.json
├── swagger/             # Swagger configuration
│   └── swagger.js
├── docs/                # API documentation
│   └── swagger.yaml
├── seeders/             # Database seeders (optional)
├── app.js               # Main application file
└── package.json         # Dependencies and scripts
```

## ⚙️ Setup Instructions

### 1. Prerequisites
- Node.js (v22.18.0 or higher)
- PostgreSQL database server
- Git

### 2. Installation

```bash
# Clone or download the project
cd Project-ORM

# Install dependencies
npm install

# Install Sequelize CLI globally
npm install -g sequelize-cli
```

### 3. Database Configuration

1. Update `config/config.json` with your PostgreSQL credentials:
```json
{
  "test": {
    "username": "postgres",
    "password": "postgres",
    "database": "users",
    "host": "127.0.0.1",
    "port": 5432,
    "dialect": "postgres"
  }
}
```

2. Set environment to test:
```bash
export NODE_ENV=test
```

3. Create the database:
```bash
sequelize-cli db:create
```

4. Run migrations:
```bash
sequelize-cli db:migrate
```

### 4. Start the Server

```bash
# Development mode with auto-restart
npm run dev

# Or production mode
npm start
```

The server will start at `http://localhost:3000`

## 🚀 Deployment

### Environment Configuration

The project supports three environments:

- **test**: For local development (current setup)
- **development**: For staging/development server deployment  
- **production**: For production server deployment

### Quick Deployment

#### Using Deployment Script
```bash
# Deploy to development environment
./deploy.sh development

# Deploy to production environment
./deploy.sh production
```

#### Manual Deployment
```bash
# For development environment
export NODE_ENV=development
npm install
npm run setup:dev
npm start

# For production environment  
export NODE_ENV=production
npm install
npm run setup:prod
npm start
```

#### Available Deployment Commands
```bash
# Setup specific environments
npm run setup:dev      # Setup development database
npm run setup:prod     # Setup production database
npm run setup:test     # Setup test database (your current local)

# Database operations
npm run db:setup       # Create database + run migrations
npm run db:migrate     # Run pending migrations
npm run db:reset       # Drop, create, and migrate database
npm run db:seed        # Run all seeders

# One-command deployment
npm run deploy:dev     # Setup + start development
npm run deploy:prod    # Setup + start production
```

### Environment Variables

Current configuration per environment:

| Environment | Database Name | Username | Password | Host |
|-------------|---------------|----------|----------|------|
| test (local) | `users` | `postgres` | `postgres` | `127.0.0.1` |
| development | `orm_learning_development` | `postgres` | `postgres` | `127.0.0.1` |
| production | `orm_learning_production` | `postgres` | `postgres` | `127.0.0.1` |

**Note**: Update credentials in `config/config.json` for production deployment with secure passwords.

## 📚 API Documentation

### Swagger UI
Visit `http://localhost:3000/api-docs` for interactive API documentation.

### Available Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Welcome message and API info |
| GET | `/api/users` | Get all users |
| POST | `/api/users` | Create a new user |
| GET | `/api-docs` | Swagger API documentation |

### API Examples

#### Create a User (POST)
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "age": 25
  }'
```

#### Get All Users (GET)
```bash
curl http://localhost:3000/api/users
```

## 🗄️ Database Operations

### Check Database Data
```bash
# View all users in the database
psql -U postgres -d users -c "SELECT * FROM \"Users\";"

# Count total users
psql -U postgres -d users -c "SELECT COUNT(*) FROM \"Users\";"

# View latest users
psql -U postgres -d users -c "SELECT * FROM \"Users\" ORDER BY \"createdAt\" DESC;"
```

### Migration Commands
```bash
# Create a new migration
sequelize-cli migration:generate --name migration-name

# Run migrations
sequelize-cli db:migrate

# Undo last migration
sequelize-cli db:migrate:undo

# Check migration status
sequelize-cli db:migrate:status
```

### Model Commands
```bash
# Generate a new model with migration
sequelize-cli model:generate --name ModelName --attributes field1:string,field2:integer

# Generate a seeder
sequelize-cli seed:generate --name demo-users
```

## 🎓 Learning Objectives

This project helps you understand:

- **ORM Concepts**: How ORMs abstract database operations
- **Sequelize**: Model definition, associations, and queries
- **Database Migrations**: Version control for database schema
- **API Development**: RESTful endpoints with Express.js
- **Database Relationships**: Primary keys, foreign keys, associations
- **API Documentation**: Using Swagger for documentation

## 📝 User Model Schema

```javascript
{
  id: INTEGER (Primary Key, Auto Increment)
  firstName: STRING (Required)
  lastName: STRING (Required)
  email: STRING (Required, Unique)
  age: INTEGER (Optional)
  createdAt: DATE (Auto-generated)
  updatedAt: DATE (Auto-generated)
}
```

## 🚀 Next Steps

To continue learning, try:

1. **Add Validation**: Add email validation, age constraints
2. **Create Relationships**: Add Posts model that belongs to User
3. **Add More Endpoints**: PUT (update) and DELETE operations
4. **Add Authentication**: JWT tokens, login/logout
5. **Add Seeders**: Sample data for testing
6. **Error Handling**: Better error responses and logging

## 🔧 Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Check PostgreSQL is running
   - Verify credentials in `config/config.json`
   - Ensure database exists

2. **Migration Errors**
   - Check if correct `NODE_ENV` is set
   - Verify migration files are correct
   - Try running `npm run db:reset` to start fresh

3. **Port Already in Use**
   - Change PORT in `app.js` or kill existing process
   - Use `lsof -ti:3000 | xargs kill` to kill process on port 3000

4. **Deployment Issues**
   - Ensure PostgreSQL is running on deployment server
   - Check file permissions: `chmod +x deploy.sh`
   - Verify NODE_ENV is set correctly

### Deployment Checklist

Before deploying to production:

- [ ] Update database credentials in `config/config.json`
- [ ] Set environment variables properly
- [ ] Ensure PostgreSQL is running on target server
- [ ] Run database migrations: `npm run db:migrate`
- [ ] Test API endpoints after deployment
- [ ] Check logs for any errors

## 📄 Scripts

### Development Scripts
```bash
npm run dev              # Start local development server (test env)
npm start                # Start production server
```

### Database Scripts
```bash
npm run db:setup         # Create database and run migrations
npm run db:migrate       # Run pending migrations
npm run db:migrate:undo  # Undo last migration
npm run db:reset         # Drop, create, and migrate database
npm run db:seed          # Run all seeders
```

### Environment Setup Scripts
```bash
npm run setup:dev        # Setup development environment
npm run setup:prod       # Setup production environment  
npm run setup:test       # Setup test environment (local)
```

### Deployment Scripts
```bash
npm run deploy:dev       # Deploy to development
npm run deploy:prod      # Deploy to production
./deploy.sh development  # Alternative deployment script
./deploy.sh production   # Alternative deployment script
```

## 🤝 Contributing

This is a learning project. Feel free to:
- Add new features
- Improve error handling
- Add tests
- Enhance documentation

---

**Happy Learning! 🎉**

For questions or issues, refer to the [Sequelize Documentation](https://sequelize.org/docs/v6/) or [Express.js Guide](https://expressjs.com/)
