# Docker-Compose 部署ClickHouse

```yml
services:
	clickhouse-server:
		restart: always
		image: yandex/clickhouse-server
		container_name: clickhouse-server
		ulimits:	
		nofile:
		soft: 262144
		hard: 262144
		ports:
			- 8123:8123
			- 9000:9000
			- 9009:9009
		volumes:
			- ./data:/var/lib/clickhouse
			- ./config.xml:/etc/clickhouse-server/config.xml
			- ./users.xml:/etc/clickhouse-server/users.xml
			- ./log:/var/log/clickhouse-server
		healthcheck:
			test: wget --no-verbose --tries=1 --spider localhost:8123/ping || exit 1
			interval: 2s
			timeout: 2s
			retries: 16
```