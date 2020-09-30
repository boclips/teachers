#!/usr/bin/env bash

set -x -e

echo "hello world"

private_key_path=/tmp/private_key

echo "$PRIVATE_KEY" > "$private_key_path"
chmod 0600 "$private_key_path"

export GIT_COMMITTER_NAME=DependabotTest
export GIT_COMMITTER_EMAIL=engineering@boclips.com
export GIT_SSH_COMMAND="ssh -i $private_key_path"

mkdir --parents ~/.ssh
touch ~/.ssh/known_hosts

if ! grep -q github.com ~/.ssh/known_hosts
then
    ssh-keyscan github.com \
        >> ~/.ssh/known_hosts \
        2> /dev/null
fi


echo "$GITHUB_TOKEN"

apt update
apt-key adv --keyserver keyserver.ubuntu.com --recv-key C99B11DEB97541F0
apt-get install software-properties-common -y
apt-add-repository https://cli.github.com/packages
apt update
apt install gh

gh version

gh pr list --state open

gh pr list -l dependencies | grep -oE '^\s*[0-9]+' >> prlist.txt
#read -r PR_NUMBER < prlist.txt

while read -r PR_NUMBER
do
  echo "$PR_NUMBER"
done <prlist.txt

