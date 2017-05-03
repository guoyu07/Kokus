pipeline {
  agent any
  stages {
    stage('Deploy? ') {
      steps {
        git(url: 'https://github.com/coworkingplus/HoneyBase', branch: 'master')
      }
    }
    stage('Er') {
      steps {
        sh 'sh ./Honeybase_deploy /root/node_apps/HoneyBase'
      }
    }
  }
}