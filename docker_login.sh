#!/bin/bash

DOCKER_ACCESS_TOKEN=dckr_pat_sIXcCD6nYlEUXHWpKt9Tu0nDG00
DOCKER_USERNAME=nysgoth

echo $DOCKER_ACCESS_TOKEN | docker login -u $DOCKER_USERNAME --password-stdin
