pipeline {
  agent any
  stages {
    stage('Deploy? ') {
      steps {
        git(url: 'https://github.com/coworkingplus/HoneyBase', branch: 'master')
      }
    }
    stage('') {
      steps {
        sh 'sh ./Honeybase_deploy'
      }
    }
  }
}