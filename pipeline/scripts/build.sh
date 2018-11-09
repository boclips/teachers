#!/usr/bin/env bash

set -x -e

npm install
npm run lint
npm run compile
npm run test
npm run build

cp -R dist/ Dockerfile ../dist/
