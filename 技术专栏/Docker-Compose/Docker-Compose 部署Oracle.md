# Docker-Compose 部署Oracle

```yml
services:
	oracle:
		image: heartu41/oracle19c
		container_name: oracle19c
		restart: always
		ports:
		    - 1521:1521
		environment:
		    - TZ=Asia/Shanghai
		    - ORACLE_SID=ORCL
		    - ORACLE_PDB=ORCLPDB1
		    - ORACLE_BASE=/opt/oracle
		    - ORACLE_HOME=/opt/oracle/product/19c/dbhome_1
		    - PATH=/opt/oracle/product/19c/dbhome_1/bin:/opt/oracle/product/19c/dbhome_1/OPatch/:/usr/sbin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin
		volumes:
		    - /home/oracle19c/oradata:/opt/oracle/oradata
```

