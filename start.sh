#!/bin/bash
dir=$(cd -P -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd -P)
make build-local
make start-local
