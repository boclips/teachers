#!/usr/bin/env bash

set -e

git pull -r
npm run test
npm run build
git push