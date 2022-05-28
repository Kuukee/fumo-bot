#!/bin/bash

while true
do
    python copy.py
    node main.js
    echo "Restarting"
    sleep 2
done