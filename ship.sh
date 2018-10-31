#!/usr/bin/env bash

set -e

git pull -r

npm run compile
npm run lint
npm run test
npm run build

git push