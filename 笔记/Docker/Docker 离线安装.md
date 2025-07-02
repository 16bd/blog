# Docker 离线安装

## 下载地址

https://download.docker.com/linux/static/stable/

```bash
# 下载对应版本安装包
wget https://download.docker.com/linux/static/stable/aarch64/docker-24.0.7.tgz

# 解压
tar -zxvf docker-24.0.7.tgz

# 移动解压的二进制文件
mv docker/* /usr/bin/

# 如果提示权限不够请给权限
chmod +x /usr/bin/dockerd
chmod +x /usr/bin/docker-proxy
chmod +x /usr/bin/containerd
chmod +x /usr/bin/containerd-shim-runc-v2
chmod +x /usr/bin/ctr
chmod +x /usr/bin/docker
chmod +x /usr/bin/docker-init
chmod +x /usr/bin/runc
```
