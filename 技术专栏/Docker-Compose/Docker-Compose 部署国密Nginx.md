# Docker-Compose 部署Nginx

下载国密Nginx对应版本：

[https://www.gmssl.cn/gmssl/index.jsp](https://www.gmssl.cn/gmssl/index.jsp)

```yaml
services:
	gmssl_nginx:
		image: centos:centos7
		container_name: gmssl_nginx
		volumes:
		    - ./nginx:/usr/local/nginx
		ports:
		    - "80:80"
		    - "443:443"
		command: ["/usr/local/nginx/sbin/nginx", "-g", "daemon off;"]
		environment:
		    - "TZ=Asia/Shanghai"
```

