#!/bin/bash

while true
do
    py copy.py
    node main.js
    echo "Restarting"
    sleep 2
done