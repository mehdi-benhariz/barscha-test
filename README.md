# Barscha Test

A project designed to demonstrate best practices in NestJS and Prisma integration, with API documentation and Docker support for seamless deployment. Was done as part of a Technical Test for Barscha.

## Table of Contents

- [Setup and Installation](#setup-and-installation)
- [Running the Project](#running-the-project)
  - [Locally](#locally)
  - [With Docker](#with-docker)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)

---

## Setup and Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/mehdi-benhariz/barscha-test.git
   cd barscha-test
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up the environment variables:

   - Create a `.env` file in the root directory.
   - Add the following variables (replace with your actual values):
     ```
     DATABASE_URL=postgresql://user:password@localhost:5432/database
     ```

4. Run the docker container for the database:

   ```bash
   docker-compose up -d
   ```

5. Run Prisma migrations to set up the database schema:
   ```bash
   npm run migrate
   ```

---

## Running the Project

### Locally

1. Start the development server:

   ```bash
   npm run start:dev
   ```

2. Access the API at `http://localhost:3000`.

### With Docker

1. Ensure Docker is installed and running on your machine.

2. Build and start the container:

   ```bash
   docker-compose up --build
   ```

3. Access the API at `http://localhost:3000`.

---

## API Documentation

The API is documented using **Swagger**.

1. Start the project (locally or with Docker).
2. Navigate to `http://localhost:3000/api-docs` to view the Swagger UI.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

---

## License

This project is licensed under the [MIT License](LICENSE).

---

Let me know if you'd like adjustments or specific additions!
