# Docker-Compose 部署Redis

```yml
services:
	redis:
		image: redis:6.2.7
		container_name: redis
		restart: always
		ports:
		    - 6379:6379
		volumes:
		    - ./data:/usr/local/redis/data
		    - ./conf/redis.conf:/usr/local/etc/redis/redis.conf
		    - ./logs/redis.log:/usr/local/redis/redis.log
		command: redis-server /usr/local/etc/redis/redis.conf
```