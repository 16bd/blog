
# Docker 镜像加速


```bash
sudo mkdir -p /etc/docker 
sudo tee /etc/docker/daemon.json <<-'EOF' 
{   
	"registry-mirrors": [
	  	"https://docker.1ms.run",
	    "https://docker.1panel.live"
	] 
} 
EOF 
sudo systemctl daemon-reload 
sudo systemctl restart docker
```