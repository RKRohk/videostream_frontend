pipeline {
    agent {
        any { image 'node:14-alpine' }
    }
    stages {
        stage('Pull') {
            steps {
                scm checkout
            }
        }
        stage('Build') {
            steps {
              step([$class: 'DockerBuilderPublisher', cleanImages: false, cleanupWithJenkinsJobDelete: false, cloud: 'docker', dockerFileDirectory: '.', fromRegistry: [], pushCredentialsId: 'dockerrohan', pushOnSuccess: true, tagsString: 'rkrohk/videostream_frontend:fromcd'])
            }
        }
    }
}
