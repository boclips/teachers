#!/usr/bin/env bash

set -e

git pull -r

pushd boclips-react-player
    npm run test
popd

pushd app
    npm run compile
    npm run lint
    npm run test
    npm run build
popd

git push