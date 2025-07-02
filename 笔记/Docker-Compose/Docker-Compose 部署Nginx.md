# Docker-Compose 部署Nginx

```yaml
services:
  nginx:
    image: nginx
    container_name: nginx
    restart: always
    ports:
      - 80:80
      - 443:443
    networks:
      - net_db
    volumes:
      #- ./conf.d:/etc/nginx/conf.d
      - ./log:/var/log/nginx
      #- ./nginx.conf:/etc/nginx/nginx.conf:ro
    environment:
      - "TZ=Asia/Shanghai"
```

```bash
# 拷贝出来文件
docker cp nginx:/etc/nginx/nginx.conf nginx.conf
docker cp nginx:/etc/nginx/conf.d/default.conf conf.d
# 放开yaml文件中注释内容，再重新执行docker-compose up -d
```
