mkdir -p ~/.ssh
echo -e "${SSH_KEY}" > ~/.ssh/id_rsa
chmod 600 ~/.ssh/id_rsa

ssh-keyscan -H ${SSH_HOST} >> ~/.ssh/known_hosts

rsync -avz ./dist/ ${SSH_USER}@${SSH_HOST}:/home/backend/relicario-api/dist/
