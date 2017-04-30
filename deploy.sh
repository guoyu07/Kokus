cd ~/clones/HoneyBase/
pm2 stop HoneyBase # Stop HoneyBase
git fetch --all # Fetch the new changes to master
git reset --hard origin/master # Something
rm dist -r
yarn install # Check new dependencies
yarn build # Build production version
pm2 start dist/index.js --name "HoneyBase" # Attempt to start it
pm2 save # Save the process

