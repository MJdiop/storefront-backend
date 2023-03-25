# Storefront backend

## Installation

```bash
$ yarn
```

## Running the app

```bash
# development
$ yarn start:dev

# prettier
$ yarn format

# linter
$ yarn lint

# production mode
$  yarn start
```

Our server is listen at port:

    localhost:3001

and our database listen at port:

    localhost:5432

## API Endpoints

#### Users

- Create http://localhost:3001/api/users/ , {email, userName, firstName, lastName, password}
- Login http://localhost:3001/api/users/login, {email, password}
- Get all users http://localhost:3001/api/users
- get single user http://localhost:3001/api/users/1 , (require Auth)
- Update http://localhost:3001/api/users/1 , {email, userName, firstName, lastName, password}, (require Auth)
- Delete http://localhost:3001/api/users/2 , (require Auth)

#### Products

- add product http://localhost:3001/api/products/, (require Auth)
- get all product http://localhost:3001/api/products/, (require Auth)
- get single http://localhost:3001/api/products/1, (require Auth)

#### Orders

- Create http://localhost:3001/api/orders/1/create, (require Auth)
- Get http://localhost:3001/api/orders/1/find, (require Auth)
- Get by Status http://localhost:3001/api/orders/1/find-by-status?status=active, (require Auth)
- Create orders product http://localhost:3001/api/orders/1/create-product, (require Auth)

## Test

```bash
# unit tests
$ yarn test
```

## Database migrations

If there is any database chanes you could access the migrations and edit the SQL files then use the following commands:

    npx db-migrate down
    npx db-migrate up

### ENV Variables:

    PORT
    POSTGRES_HOST
    POSTGRES_DB
    POSTGRES_USER
    POSTGRES_PASSWORD
    POSTGRES_PORT
    BCRYPT_PASSWORD
    SALT_ROUNDS
    TOKEN_SECRET
