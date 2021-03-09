#!/bin/bash
cp .env.staging.getme .env.staging
docker build -t dunghv/getme-api -f Dockerfile.staging .
docker volume create getme-data
docker run -p 8000:5000 -d -v getme-data:/data dunghv/getme-api
