# Cloud-Native Expense Tracker

A full-stack, cloud-native Expense Tracker application built using Spring Boot, React, and MySQL with automated CI/CD deployment using Jenkins, Docker, Kubernetes, and AWS EKS.

The project demonstrates modern DevOps practices including containerization, Kubernetes orchestration, automated deployments, and cloud-native infrastructure management.

---

## 🚀 Features

* Secure JWT-based Authentication & Authorization
* Expense Management with CRUD Operations
* Interactive Dashboard & Analytics
* RESTful API Architecture
* Responsive React Frontend
* Dockerized Frontend & Backend
* Automated CI/CD Pipeline using Jenkins
* Kubernetes-based Cloud Deployment
* AWS LoadBalancer Integration
* Multi-Pod Scalable Deployment

---

## 🛠️ Technology Stack

### Frontend

* React
* Vite
* Axios
* React Router DOM
* Recharts

### Backend

* Java 21
* Spring Boot 3
* Spring Security
* Spring Data JPA
* JWT Authentication
* Maven

### Database

* MySQL

### DevOps & Cloud

* Jenkins
* Docker
* Docker Hub
* Kubernetes
* AWS EKS
* kubectl
* AWS CLI
* GitHub

---

## 🏗️ Architecture

The application follows a cloud-native deployment architecture:

```text
Developer
   ↓
GitHub Repository
   ↓
Jenkins CI/CD Pipeline
   ↓
Maven Build
   ↓
Docker Image Build
   ↓
DockerHub Push
   ↓
AWS EKS Kubernetes Cluster
   ↓
Frontend / Backend / MySQL Pods
   ↓
AWS LoadBalancer
   ↓
Public Application
```

---

## ⚙️ CI/CD Workflow

The Jenkins pipeline automates:

* Maven build and packaging
* Docker image creation
* DockerHub image push
* Kubernetes deployment
* AWS EKS integration

Pipeline stages are configured in the `Jenkinsfile`.

---

# 🐳 Docker Setup

## Build Backend Image

```bash
docker build -t your-dockerhub-username/expense-tracker:v1 .
docker push your-dockerhub-username/expense-tracker:v1
```

## Build Frontend Image

```bash
cd expense-tracker-ui

docker build -t your-dockerhub-username/expense-tracker-ui:v1 .
docker push your-dockerhub-username/expense-tracker-ui:v1
```

---

# ☸️ Kubernetes Deployment

## Deploy MySQL

```bash
kubectl apply -f mysql-deployment.yaml
kubectl apply -f mysql-service.yaml
```

## Deploy Backend

```bash
kubectl apply -f deployment.yaml
kubectl apply -f service.yaml
```

## Deploy Frontend

```bash
kubectl apply -f expense-tracker-ui/frontend-deployment.yaml
kubectl apply -f expense-tracker-ui/frontend-service.yaml
```

## Verify Deployments

```bash
kubectl get pods
kubectl get svc
```

---

# ☁️ AWS EKS Setup

## Create Cluster

```bash
eksctl create cluster ^
--name expense-tracker-cluster ^
--region us-east-1 ^
--nodegroup-name workers ^
--node-type t3.medium ^
--nodes 2
```

## Configure kubectl

```bash
aws eks update-kubeconfig --region us-east-1 --name expense-tracker-cluster
```

---

# 📌 Project Highlights

* Implemented end-to-end CI/CD automation using Jenkins
* Containerized applications using Docker
* Deployed scalable applications using Kubernetes on AWS EKS
* Managed Docker image versioning and deployments
* Configured Kubernetes Deployments, Services, and LoadBalancers
* Integrated frontend, backend, and database into cloud-native infrastructure
* Solved real-world DevOps deployment and orchestration issues

---

# 👨‍💻 Author

Lalith Kumar J
