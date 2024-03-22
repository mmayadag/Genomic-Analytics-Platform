#!/bin/bash

while ! nc -z localhost 27017; do
  echo "MongoDB waiting <<<<<<<<<<"

  sleep 1
done

make run-data-seeder