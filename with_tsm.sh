#!/bin/bash

yarn tsm &
PID=$!

$@

kill -9 $PID
