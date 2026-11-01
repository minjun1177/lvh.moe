#!/usr/bin/env bash

docker build . -t lvh-moe-backend
docker image tag lvh-moe-backend:latest registry.walruslab.org/pub/lvh-moe-backend:latest
docker push registry.walruslab.org/pub/lvh-moe-backend:latest
