#!/bin/bash
python3 automate.py
nohup node node-server.js </dev/null &>/dev/null &
