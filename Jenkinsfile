pipeline {
  agent any
  stages {
    stage('Change dir') {
      steps {
        dir(path: '/root/clones/scripts')
      }
    }
    stage('Stop PM2 Process') {
      steps {
        sh 'sh ./Honeybase_deploy'
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