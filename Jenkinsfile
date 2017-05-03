pipeline {
  agent any
  stages {
    stage('Change dir') {
      steps {
        sh '''# Change to HoneyBase
cd /root/clones/HoneyBase'''
      }
    }
    stage('Stop PM2 Process') {
      steps {
        sh 'pm2 stop HoneyBase # Stop HoneyBase'
      }
    }
    stage('Pull') {
      steps {
        sh '''# Fetch the new changes to master
git fetch --all 
# Something
git reset --hard origin/master '''
      }
    }
    stage('Test') {
      steps {
        sh 'rm dist -r'
        sh '''# Check new dependencies
yarn install 
# Test the build
npm test
'''
      }
    }
    stage('Build ') {
      steps {
        sh '''# Build production version
yarn build '''
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