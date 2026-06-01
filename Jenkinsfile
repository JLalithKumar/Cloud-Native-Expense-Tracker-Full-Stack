pipeline {
agent any

environment {
    DOCKERHUB_CREDENTIALS = credentials('dockerhub-creds')
}

stages {

    stage('Clone Repository') {
        steps {
            git 'https://github.com/JLalithKumar/Expense-Tracker-Full-Stack.git'
        }
    }

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

    stage('Deploy Backend to Kubernetes') {
        steps {
            bat 'kubectl apply -f deployment.yaml'
            bat 'kubectl apply -f service.yaml'
        }
    }

    stage('Deploy Frontend to Kubernetes') {
        steps {
            bat 'kubectl apply -f expense-tracker-ui/frontend-deployment.yaml'
            bat 'kubectl apply -f expense-tracker-ui/frontend-service.yaml'
        }
    }
}

}
