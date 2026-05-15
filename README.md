# Expense Tracker

A full-stack, cloud-native Expense Tracker application designed to help users manage and analyze their personal finances securely. The application features user authentication, comprehensive expense management, and interactive dashboard analytics.

The project is built with a modern technology stack and is fully containerized and orchestrated for deployment on cloud platforms like AWS EKS.

## 🚀 Key Features

*   **User Authentication:** Secure signup and login flows utilizing stateless JWT (JSON Web Tokens) to protect user data and ensure data isolation.
*   **Expense Management:** Create, read, update, and delete daily expenses with categorization.
*   **Interactive Dashboard:** Visual analytics and charts (powered by Recharts) to track spending habits over time.
*   **Responsive UI:** A premium, dynamic user interface built with React.
*   **Cloud-Native Deployment:** Fully containerized backend and frontend services, orchestrated via Kubernetes with AWS LoadBalancer configurations for scalable public access.

## 🛠️ Technology Stack

*   **Frontend:** React 19, Vite, React Router DOM, Axios, Recharts
*   **Backend:** Java 21, Spring Boot 3, Spring Security, Spring Data JPA, JWT
*   **Database:** MySQL
*   **DevOps & Deployment:** Docker, Docker Hub, Kubernetes (kubectl), AWS EKS, LoadBalancers

## 🏗️ Architecture

The application follows a standard Client-Server architecture:
1.  **Client:** A React SPA that communicates with the backend via RESTful APIs, passing JWTs in the Authorization header for protected routes.
2.  **Server:** A monolithic Spring Boot REST API that handles business logic, security filtering, and interacts with the database via Hibernate ORM.
3.  **Infrastructure:** Both the application and the MySQL database can be deployed as multi-container orchestrated pods in a Kubernetes cluster.

## 💻 Local Development Setup

### Prerequisites
*   Java Development Kit (JDK) 21
*   Node.js (v18+) and npm
*   MySQL Server (or Docker to run MySQL)
*   Maven (optional, wrapper provided)

### 1. Database Setup
1. Create a MySQL database for the application (e.g., `expense_tracker`).
2. Update the `src/main/resources/application.properties` in the backend with your local MySQL credentials.

### 2. Backend Setup
Navigate to the root directory and run the Spring Boot application using the Maven wrapper:
```bash
./mvnw spring-boot:run
```
The backend API will be available at `http://localhost:8080`. Swagger documentation is accessible at `http://localhost:8080/swagger-ui.html`.

### 3. Frontend Setup
Open a new terminal, navigate to the frontend directory, install dependencies, and start the development server:
```bash
cd expense-tracker-ui
npm install
npm run dev
```
The frontend UI will be available at `http://localhost:5173`.

## 🐳 Docker & Kubernetes Deployment

The application is configured for seamless deployment using Docker and Kubernetes.

### Docker
To build and run the application using Docker, refer to the provided `Dockerfile`. You can build the image and push it to Docker Hub for Kubernetes to pull.
```bash
# Build the backend image
docker build -t your-dockerhub-username/expense-tracker-backend:latest .
docker push your-dockerhub-username/expense-tracker-backend:latest
```

### Kubernetes (AWS EKS)
The root directory contains Kubernetes manifest files to deploy the application and database.
1. `mysql-deployment.yaml` & `mysql-service.yaml`: Deploys the MySQL database and an internal service.
2. `deployment.yaml` & `service.yaml`: Deploys the backend API and configures an AWS LoadBalancer to expose the service publicly.

**Prerequisite: Configure AWS CLI & kubectl**
Before deploying, ensure your AWS CLI is configured and update your `kubectl` context to connect to your EKS cluster:
```bash
aws configure
aws eks update-kubeconfig --region <your-region> --name <your-cluster-name>
```

To deploy to your active Kubernetes cluster:
```bash
# Apply MySQL resources
kubectl apply -f mysql-deployment.yaml
kubectl apply -f mysql-service.yaml

# Apply App resources
kubectl apply -f deployment.yaml
kubectl apply -f service.yaml

# Verify deployments
kubectl get pods
kubectl get svc
```
Once the LoadBalancer is provisioned by AWS, you can use its external IP/DNS to access the backend services.
