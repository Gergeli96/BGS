#!/usr/bin/bash

cd bgs-backend

npm install

npm run build

cd ../bgs-angular

npm install

npm run build

# cd ../bgs-backend/dist

# node main.js
