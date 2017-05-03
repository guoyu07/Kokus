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
        sh '''chmod +x Honeybase_deploy
sh ./Honeybase_deploy'''
      }
    }
  }
}