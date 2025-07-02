# Docker PS 格式化

```bash
vi ~/.docker/config.json

{
	"psFormat": "table {{.ID}}\\t{{.Names}}\\t{{.Image}}\\t{{.Status}}\\t{{.Ports}}"
}
```