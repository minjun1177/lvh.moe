#!/usr/bin/env bash

docker build . -t lvh-moe-frontend
docker image tag lvh-moe-frontend:latest registry.walruslab.org/pub/lvh-moe-frontend:latest
docker push registry.walruslab.org/pub/lvh-moe-frontend:latest
