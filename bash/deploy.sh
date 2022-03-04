#!/bin/sh

WEB_PATH='/home/user/project'
WEB_USER='user'
WEB_USERGROUP='user'

echo "Start deployment"
cd $WEB_PATH

echo "Adding id_rsa"
eval "$(ssh-agent -s)"
ssh-add /home/user/.ssh/id_rsa

echo "Pulling source code..."
git pull

# echo "Changing permissions..."
# sudo chown -R $WEB_USER:$WEB_USERGROUP $WEB_PATH

echo "Finished!"