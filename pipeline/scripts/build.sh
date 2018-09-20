#!/usr/bin/env bash

set -x -e

app=source
(
cd ${app}/app
npm i
npm run compile
npm run lint
npm run test
npm run build
)

cp -R ${app}/dist/ ${app}/Dockerfile dist/

(
cd ${app}/boclips-react-player
npm install
npm run test
)