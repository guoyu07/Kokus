pipeline {
  agent any
  stages {
    stage('Stop PM2 Process') {
      steps {
        sh 'pwd'
      }
    }
    stage('Pull') {
      steps {
        git(url: 'https://github.com/coworkingplus/HoneyBase.git', branch: 'master')
      }
    }
    stage('Start HoneyBase') {
      steps {
        sh '''# Attempt to start it
pm2 start dist/index.js --name "HoneyBase" 
# Save the process
pm2 save '''
      }
    }
  }
}