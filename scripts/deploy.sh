mkdir -p ~/.ssh
echo -e "${SSH_KEY}" > ~/.ssh/id_rsa
chmod 600 ~/.ssh/id_rsa

ssh-keyscan -H ${SSH_HOST} >> ~/.ssh/known_hosts

export PATH=$PATH:/usr/bin

which rsync || ( apt-get update -y && apt-get install rsync -y )
