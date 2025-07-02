# Docker 命令

Docker信息：docker _cmd

- info — 显示 Docker 系统信息，包括镜像和容器数
- version — 显示 Docker 版本信息

容器命令：docker _cmd

- create — 从镜像中创建一个容器
- start — 启动一个已有的容器
- restart — 重启容器
- stop — 优雅停止正在运行的容器
- pause — 暂停容器中所有的进程
- unpause — 暂停容器中所有的进程
- exec — 进入容器，在运行的容器中执行命令
- run — 创建一个新的容器并且启动它
- kill — 立即停止容器中的主要进程
- rm — 删除已经停止的容器

- ps — 列出正在运行的容器
- inspect — 查看关于容器的信息
- top — 查看容器中运行的进程信息，支持 ps 命令参数
- attach — 连接到正在运行中的容器
- events — 从服务器获取实时事件
- logs — 打印日志
- wait — 阻塞运行直到容器停止，然后打印出它的退出代码
- export — 将文件系统作为一个tar归档文件导出到STDOUT
- port — 列出指定的容器的端口映射，或者查找将PRIVATE_PORT NAT到面向公众的端口

- commit — 从容器创建一个新的镜像
- cp — 用于容器与主机之间的数据拷贝
- diff — 检查容器里文件结构的更改

镜像命令：docker _cmd

- login — 登陆到一个Docker镜像仓库，如果未指定镜像仓库地址，默认为官方仓库 Docker Hub
- logout — 登出一个Docker镜像仓库，如果未指定镜像仓库地址，默认为官方仓库 Docker Hub
- pull — 从镜像仓库中拉取或者更新指定镜像
- push — 将本地的镜像上传到镜像仓库,要先登陆到镜像仓库
- search — 从Docker Hub查找镜像

- images — 列出本地镜像
- tag — 标记本地镜像，将其归入某一仓库
- build — 命令用于使用 Dockerfile 创建镜像
- save — 将指定镜像保存成 tar 归档文件
- load — 导入使用 docker save 命令导出的镜像
- history — 查看指定镜像的创建历史
- import — 从归档文件中创建镜像
- rmi — 删除本地一个或多少镜像

网络命令：docker network _cmd

- connect 将某个容器连接到一个docker网络
- create 创建一个docker局域网络
- disconnect 将某个容器退出某个局域网络
- inspect 显示某个局域网络信息
- ls 显示所有docker局域网络
- prune 删除所有未引用的docker局域网络
- rm 删除docker网络

运维命令：

- docker info | grep"Docker Root Dir" 查看docker工作目录
- du -hs /var/lib/docker/ 查看docker磁盘占用情况
- docker system df 查看磁盘使用情况
- docker system prune -a 清除所有无用容器