#!/bin/bash

nohup npx hardhat run scripts/run_block_chk.js \--network matic > runblock.out & 
