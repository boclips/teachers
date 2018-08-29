#!/usr/bin/env bash

set -x -e

app=source
(
cd ${app}
npm i
npm run compile
npm run lint
npm run test
npm run build
)

cp -R ${app}/dist/ ${app}/Dockerfile dist/
