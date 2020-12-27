#!/bin/bash
echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
docker tag bouncing-balls smanevski/bouncing-balls:1.2.0
docker push smanevski/bouncing-balls:1.2.0