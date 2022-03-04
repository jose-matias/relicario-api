mkdir -p ~/.ssh
echo -e "${SSH_KEY}" > ~/.ssh/id_rsa
chmod 600 ~/.ssh/id_rsa

ssh-keyscan -H josematias.dev >> ~/.ssh/known_hosts
