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
   - Check if `NODE_ENV=test` is set
   - Verify migration files are correct

3. **Port Already in Use**
   - Change PORT in `app.js` or kill existing process

## 📄 Scripts

```bash
npm run dev     # Start development server with nodemon
npm start       # Start production server
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
