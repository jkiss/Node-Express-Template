### Node.js Express Template：基于 Node 的 MVC 框架模版

### 特性：

1. ​ 基础架构 **PM2** + **Express** + **Mongodb** + **Redis**;
2. **CORS** 控制；
3. **PM2** 配置管理部署；
4. **Mocha** 单元测试，生成网页报告 /test/reports；
5. **Gzip**；
6. 网页模版使用的 **ejs**；
7. **log4js** 日志系统，统一记录在/logs 文件夹下；
8. 基于 **Passport.js** 的用户注册登陆系统；

### 命令：

```bash
npm start
npm test

# 安装 Mongodb
sudo touch /etc/yum.repos.d/mongodb-org-4.2.repo
    [mongodb-org-4.2]
    name=MongoDB Repository
    baseurl=https://repo.mongodb.org/yum/redhat/$releasever/mongodb-org/4.2/x86_64/
    gpgcheck=1
    enabled=1
    gpgkey=https://www.mongodb.org/static/pgp/server-4.2.asc

sudo yum install -y mongodb-org
# 启动 Mongodb
sudo systemctl start mongod || sudo mongod -f /etc/mongod.conf
# 查看 Mongodb 状态
sudo systemctl status mongod
# 开机启动 Mongodb
sudo systemctl enable mongod
# 停止 Mongodb
sudo systemctl stop mongod || sudo mongod -f /etc/mongod.conf  --shutdown

# 安装最新版Redis
yum install -y http://rpms.famillecollet.com/enterprise/remi-release-7.rpm
yum --enablerepo=remi install redis
# 查看包路径
sudo rpm -ql redis
# 启动 Redis
// sudo redis-server /etc/redis.conf
systemctl start redis
# 开机启动 Redis
systemctl enable redis
# 查看 Redis 状态
systemctl status redis
# 关闭 Redis
redis-cli shutdown
# mac 启动 redis
brew services start redis

# 手动安装rpm
wget https://url/test.rpm
sudo rpm -ivh test.rpm

# CentOS7升级Git（解决pm2 deploy can't fetch latest master code）
yum remove git
yum install -y https://centos7.iuscommunity.org/ius-release.rpm
yum install -y git2u

or

yum -y install https://packages.endpoint.com/rhel/7/os/x86_64/endpoint-repo-1.9-1.x86_64.rpm
yum install git

# 阿里云 CentOS 8: Failed to download metadata for repo 'appstream'
dnf --disablerepo '*' --enablerepo=extras swap centos-linux-repos centos-stream-repos
# 删除原来的repo文件
dnf distro-sync

# pm2 需要安装这个日志插件
pm2 install pm2-logrotate

```

### 配置  

```
mongodb 默认配置就差不多：
    processManagement:
        fork: true

redis 一般涉及到：
    daemonize yes
    maxmemory 100mb
    maxmemory-policy allkeys-lru

具体可参考config文件夹里的内容
```

### 使用 yum 安装 nodejs

```
curl -sL https://rpm.nodesource.com/setup_12.x | sudo bash -

sudo yum install nodejs
```

### let's encrypt your site

[certbot](https://certbot.eff.org/lets-encrypt/centosrhel7-other)

### 压测（Mac）：

```bash
ab -n 1000 -c 100 http://example.com/get-user
```

### 注意事项：

1. PM2 进程管理，实际是单台机器的负载均衡，但是某些共享的有状态的数据（比如第三方获取的 Token）就需要用脚本或单独的进程来维护; 或者将公共状态存储在数据库中进行统一管理；
2. PM2 deploy 如果遇到代码不会更新到最新的变更，尝试升级 server 端的 git；
