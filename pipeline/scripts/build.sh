#!/usr/bin/env bash

set -x -e

SENTRY_RELEASE="teachers-$(cat ../version/tag)"
export SENTRY_RELEASE

echo "Adding bit.dev to npm registry"
echo "always-auth=true" >> ~/.npmrc
echo "@bit:registry=https://node.bit.dev" >> ~/.npmrc
echo "//node.bit.dev/:_authToken={$BIT_TOKEN}" >> ~/.npmrc
echo "Completed adding bit.dev to npm registry"
npm -v
npm ci
npm run build:ci

cp -R application.conf dist/ Dockerfile ../dist/
