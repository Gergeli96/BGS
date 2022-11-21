#!/usr/bin/bash

cd bgs-backend

npm install

npm run build

cd ../bgs-frontend

npm install

npm run build

rm -r ../bgs-backend/dist/frontend/*

cp -r ./dist/* ../bgs-backend/dist/frontend
