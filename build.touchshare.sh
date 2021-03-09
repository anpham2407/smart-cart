#!/bin/bash
cp .env.staging.touchshare .env.staging
docker build -t dunghv/touchshare-api -f Dockerfile.staging .
docker volume create touchshare-data
docker run -p 6000:5000 -d -v touchshare-data:/data dunghv/touchshare-api
