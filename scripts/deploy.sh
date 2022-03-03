mkdir -p ~/.ssh
echo -e "${SSH_KEY}" > ~/.ssh/id_ed25519
chmod 600 ~/.ssh/id_ed25519

ssh-keyscan -p 22 -t ed25519 josematias.dev 2>&1 >> ~/.ssh/known_hosts
