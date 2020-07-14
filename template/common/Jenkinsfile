pipeline{
	parameters {
	   string(name: 'version', defaultValue: '1.0.0-SNAPSHOT', description: '版本号')
	   string(name: 'isDeploy', defaultValue: 'Y', description: '是否部署到测试环境,可选值：Y,N')
	   string(name: 'devEmail', defaultValue: 'xuhao@hd123.com', description: '开发者邮箱')
	}
	agent{
        docker {
            image 'harbor.qianfan123.com/base/node:v8.9.4'
            args '-v /var/run/docker.sock:/var/run/docker.sock -v /usr/bin/docker:/usr/bin/docker'
        }
    }
    stages{
        stage('npm build'){
            steps{
                echo "编译版本号是:  ${params.version} "
                sh 'npm install'
                sh 'npm run build:h5'
            }
            post {
                success{
                    build job: 'lh_baas_remote_image_env', parameters: [string(name: 'DNET_PROFILE', value: 'integration_test'), text(name: 'image', value: 'lhlc-h5'), text(name: 'imageVersion', value: "${params.version}")]
                }
                failure{
                    sh 'git log --pretty=format:"%ae" -1 > git.log'
					script{
					    env.devmail = readFile "git.log"
					    mail to: "${env.devmail}", subject: "编译失败: ${currentBuild.fullDisplayName}", body: "更多失败信息参见： ${env.BUILD_URL}"
					}
                }
            }
        }
        stage('docker build'){
            steps{
                sh 'tar -czf tower-build.tar.gz -C dist/build/h5/ .'
                sh "docker build -t harbor.qianfan123.com/baas/lhlc-h5:${params.version} ."
                sh 'docker login -u scm -p jbCnYs3hP9uej74G harbor.qianfan123.com'
                sh "docker push harbor.qianfan123.com/baas/lhlc-h5:${params.version}"
            }
            post {
             failure{
				    mail to: "${env.devmail}", subject: "lhlc-h5 执行 docker build 失败: ${currentBuild.fullDisplayName}", body: "更多失败信息参见： ${env.BUILD_URL}"
                }
            }
        }
        stage('部署'){
		    when {
			    expression {'Y' == "${params.isDeploy}"}
			}
			steps{
			    build job: 'LH_BAAS_TEST_Deploy_remote', parameters: [string(name: 'DNET_PROFILE', value: 'integration_test'), string(name: 'subsystem', value: 'lhlc_h5'), string(name: 'GIT_BRANCH', value: 'develop'), string(name: 'upurl', value: 'None'), string(name: 'PRESET_IMAGE_VERSION', value: 'None')]
			}
		}
    }
}
