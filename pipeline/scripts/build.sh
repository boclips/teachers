#!/usr/bin/env bash

set -x -e

app=source
(
cd ${app}/boclips-react-player
npm i
npm run test
)

(
cd ${app}/app
npm i
npm run lint
npm run compile
npm run test
npm run build
)

cp -R ${app}/app/dist/ ${app}/Dockerfile dist/

