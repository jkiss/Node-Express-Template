#!/bin/sh

cd `dirname $0`

PROJECT_DIR=`dirname $(pwd)`
echo $PROJECT_DIR

ps -ef|grep redis-server|grep -v grep
if [ $? -ne 0 ]
then
  echo "Start redis"
  redis-server $PROJECT_DIR/config/redisDev.conf
else
  echo "Redis is running..."
fi

ps -ef|grep mongod|grep -v grep
if [ $? -ne 0 ]
then
  echo "Start mongoDB"
  mongod -f $PROJECT_DIR/config/mongodDev.conf
else
  echo "MongoDB is running..."
fi

# echo "PM2 start process"
# sudo pm2 start process.json
