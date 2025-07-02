# Podman 安装

## Ubuntu 安装

```bash
sudo apt-get update
sudo apt-get -y install podman

sudo apt-get -y install podman-compose
```

## 修改镜像加速

```bash
vi /etc/containers/registries.conf

unqualified-search-registries = ["docker.1ms.run","docker.1panel.live"]
```