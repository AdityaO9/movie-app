pipeline {
    agent any
    environment {
        DOCKER_IMAGE = "adityao9/movie-app"
        TEST_PORT = "8081"
    }
    stages {
        stage('Checkout') {
            steps {
                echo 'Fetching project source...'
            }
        }
        stage('Build Docker Image') {
            steps {
                echo 'Building Docker image...'
                bat 'docker build -t %DOCKER_IMAGE% .'
            }
        }
        stage('Run Container (Test)') {
            steps {
                echo 'Cleaning up existing test container...'
                bat 'docker stop movie-app-test 2>nul & exit 0'
                bat 'docker rm movie-app-test 2>nul & exit 0'
                
                echo 'Running container for testing on port %TEST_PORT%...'
                bat 'docker run --name movie-app-test -d -p %TEST_PORT%:80 %DOCKER_IMAGE%'
                
                echo 'Waiting for container to be ready...'
                bat 'ping 127.0.0.1 -n 6 > nul'
                
                echo 'Verifying container is running...'
                bat 'docker ps | findstr movie-app-test'
                
                echo 'Container accessible at http://localhost:%TEST_PORT%'
            }
        }
        stage('Login to Docker Hub') {
            steps {
                echo 'Logging in to Docker Hub...'
                withCredentials([usernamePassword(credentialsId: 'dockerhub', passwordVariable: 'DOCKERHUB_PASS', usernameVariable: 'DOCKERHUB_USER')]) {
                    bat 'echo %DOCKERHUB_PASS% | docker login -u %DOCKERHUB_USER% --password-stdin'
                }
            }
        }
        stage('Push to Docker Hub') {
            steps {
                echo 'Pushing image to Docker Hub...'
                bat 'docker push %DOCKER_IMAGE%'
            }
        }
        stage('Cleanup') {
            steps {
                echo 'Cleaning up test container...'
                bat 'docker stop movie-app-test 2>nul & exit 0'
                bat 'docker rm movie-app-test 2>nul & exit 0'
                bat 'docker image prune -f'
            }
        }
    }
    post {
        always {
            echo 'Performing final cleanup...'
            bat 'docker stop movie-app-test 2>nul & exit 0'
            bat 'docker rm movie-app-test 2>nul & exit 0'
        }
        failure {
            echo 'Build failed. Check logs for details.'
        }
        success {
            echo 'Build succeeded and image pushed to Docker Hub!'
        }
    }
}