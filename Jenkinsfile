pipeline {
    agent {
        docker {
            image 'node:lts-bullseye-slim' 
            args '-p 3000:3000' 
        }
    }
    stages {
        stage('Build') { 
            steps {
                sh 'npm install' 
            }
        }
        stage('Seed database') { 
              steps {
                  sh 'npm run seed' 
              }
          }
        stage('Start the nodejs app') { 
            steps {
                sh 'npm start' 
            }
        }
    }
}
