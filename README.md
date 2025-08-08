# LightFeather-Coding-Challenge
This project contains a React Typescript frontend and an Express backend. Both are containerized using Docker and can be run together using Docker Compose.

## Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop) installed and running
- [Node.js](https://nodejs.org/) (optional, for local development)

## Project Structure

```
LightFeather-Coding-Challenge/
├── docker-compose.yml
├── server/
│   ├── Dockerfile
│   └── ... (Express backend files)
├── my-app/
│   ├── Dockerfile
│   └── ... (React frontend files)
```

## Build and Run with Docker Compose

1. **Clone the repository:**
   ```sh
   git clone https://github.com/your-username/LightFeather-Coding-Challenge.git
   cd LightFeather-Coding-Challenge
   ```

2. **Build and start the containers:**
- Make sure Docker Desktop is running and you're authenicated before you start.
   ```sh
   docker-compose up --build
   ```

   This will:
   - Build the backend (Node/Express) and frontend (React) containers
   - Start both containers

   - Below is a how a successful console log may look:
   ![Application Screenshot](images/success.png)

3. **Access the application:**
   - Open your browser and go to: [http://localhost:3000](http://localhost:3000)

   - You should see the application with a form similar to this:
![Application Screenshot](images/appform.png)

## Stopping the Application

Press `Ctrl+C` in your terminal, then run:
```sh
docker-compose down
```

## Local Development (Optional)

You can run the backend and frontend separately for development:

1. **Backend:**
   ```sh
   cd server
   npm install
   npm start
   ```

2. **Frontend:**
   ```sh
   cd my-app
   npm install
   npm start
   ```

Access the frontend at [http://localhost:3000](http://localhost:3000).

## Notes

- The backend runs on port `8080` inside the container.
- The frontend runs on port `3000` inside the container.


---

Thank you for taking the time to view my application!

