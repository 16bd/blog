# Docker-Compose 部署PostgreSQL

```yml
services:
	pgsql:
		container_name: pgsql
		restart: always
		image: postgres:13.13-bullseye
		ports:
		    - 5432:5432
		environment:
		    TZ: Asia/Shanghai
		    POSTGRES_PASSWORD: postgres_admin
		volumes:
		    - ./data:/var/lib/postgresql/data
```