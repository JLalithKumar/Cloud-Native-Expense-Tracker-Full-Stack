pipeline {
agent any

environment {
    DOCKERHUB_CREDENTIALS = credentials('dockerhub-creds')
    AWS_ACCESS_KEY_ID = credentials('aws-access-key') 
    AWS_SECRET_ACCESS_KEY = credentials('aws-secret-key') 
    AWS_DEFAULT_REGION = 'us-east-1'
}

stages {

    stage('Build Backend') {
        steps {
            bat 'mvn clean package'
        }
    }

    stage('Build Backend Docker Image') {
        steps {
            bat 'docker build -t lalithkumarj/expense-tracker:v4 .'
        }
    }

    stage('Push Backend Docker Image') {
        steps {
            bat 'docker login -u %DOCKERHUB_CREDENTIALS_USR% -p %DOCKERHUB_CREDENTIALS_PSW%'
            bat 'docker push lalithkumarj/expense-tracker:v4'
        }
    }

    stage('Build Frontend Docker Image') {
        steps {
            dir('expense-tracker-ui') {
                bat 'docker build -t lalithkumarj/expense-tracker-ui:v3 .'
            }
        }
    }

    stage('Push Frontend Docker Image') {
        steps {
            bat 'docker push lalithkumarj/expense-tracker-ui:v3'
        }
    }

    stage('Configure Kubernetes') {
        steps {
            bat 'aws eks update-kubeconfig --region us-east-1 --name expense-tracker-cluster'
        }
    }

    stage('Deploy MySQL to Kubernetes') {
       steps {
bat 'kubectl apply -f mysql-deployment.yaml'
bat 'kubectl apply -f mysql-service.yaml'
}
}

    stage('Deploy Backend to Kubernetes') {
        steps {
            bat 'kubectl apply -f deployment.yaml'
            bat 'kubectl apply -f service.yaml'
        }
    }

    stage('Deploy Frontend to Kubernetes') {
        steps {
            dir('expense-tracker-ui') {
                bat 'kubectl apply -f frontend-deployment.yaml'
                bat 'kubectl apply -f frontend-service.yaml'
            }
        }
    }
}
    
}
