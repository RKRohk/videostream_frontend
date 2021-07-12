pipeline {
    agent {
        docker { image 'node:14-alpine' }
    }
    stages {
        stage('Pull') {
            scm checkout
        }
        stage('Build') {
            steps {
              step([$class: 'DockerBuilderPublisher', cleanImages: false, cleanupWithJenkinsJobDelete: false, cloud: 'docker', dockerFileDirectory: '.', fromRegistry: [], pushCredentialsId: 'dockerrohan', pushOnSuccess: true, tagsString: 'rkrohk/videostream_frontend:fromcd'])
            }
        }
    }
}