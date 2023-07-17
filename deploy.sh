#rm package-lock.json
#rm -rf node_modules
#scp -r ./ ubuntu@mrief.tech:./fridsch_api
rsync -rav -e ssh --exclude='node_modules' ./ ubuntu@mrief.tech:./fridsch_api
ssh ubuntu@mrief.tech 'bash -s' <<'ENDSSH'
    cd fridsch_api
    sudo docker stop fridsch
    sudo docker rm fridsch
    sudo docker build . -t fridsch-api
    sudo docker run -d -p 80:3333 --name fridsch fridsch-api
ENDSSH

echo 'all commands executed'