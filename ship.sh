#!/usr/bin/env bash

set -e

git pull -r

pushd app
    npm run compile
    npm run lint
    npm run test
    npm run build
popd

git push