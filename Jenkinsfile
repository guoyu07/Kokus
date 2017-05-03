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
        sh '''ls
sh ./Honeybase_deploy'''
      }
    }
  }
}