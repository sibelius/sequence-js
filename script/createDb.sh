#!/usr/bin/env bash
aws --profile dummy dynamodb create-table --cli-input-json file://sequence3.json --endpoint-url http://localhost:8888
