# Docker-Compose 部署MySQL

## 创建目录：

```bash
mkdir log
mkdir data
mkdir conf
```

## 配置文件：vi my.cnf

```conf
[mysqld]
pid-file = /var/run/mysqld/mysqld.pid
socket = /var/run/mysqld/mysqld.sock
datadir = /var/lib/mysql
lower_case_table_names=1 #实现mysql不区分大小（开发需求，建议开启）
# By default we only accept connections from localhost
#bind-address = 127.0.0.1
# Disabling symbolic-links is recommended to prevent assorted security risks
default-time_zone = '+8:00'
# 更改字符集 如果想Mysql在后续的操作中文不出现乱码,则需要修改配置文件内容
symbolic-links=0
character-set-server=utf8mb4

[client]
default-character-set=utf8mb4

[mysql]
default-character-set=utf8mb4
```

## docker-compose.yml文件：

```yaml
services:
	mysql:
		restart: always
		image: mysql:5.7.21
		container_name: mysql
		volumes:
		    - ./log:/var/log/mysql
		    - ./data:/var/lib/mysql
		    - ./conf/my.cnf:/etc/mysql/my.cnf
		environment:
		    - "MYSQL_ROOT_PASSWORD=123456"
		    - "TZ=Asia/Shanghai"
		ports:
		    - 3306:3306
```

## 开启远程：

``` bash
CREATE USER '用户名'@'%' IDENTIFIED BY '密码';
GRANT ALL PRIVILEGES ON *.* TO '用户名'@'%' WITH GRANT OPTION;
```