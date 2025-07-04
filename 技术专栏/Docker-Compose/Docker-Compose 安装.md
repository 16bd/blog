# Docker-Compose 安装

安装Docker时一般都以插件的形式安装了，下面介绍下离线安装的方式

```bash
# 下载对应系统docker-compose文件
sudo curl -L "https://github.com/docker/compose/releases/download/v2.38.1/docker-compose-$(uname -s)-$(uname -m)" -o /usr/bin/docker-compose

# 赋权限
sudo chmod +x /usr/bin/docker-compose

```