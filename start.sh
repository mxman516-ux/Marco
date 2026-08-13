#!/bin/bash

echo "[+] Starting Guild Boost API (spam.py)..."
cd GUILD-BOOST
python spam.py &
API_PID=$!

sleep 2

echo "[+] Starting Web UI (index.php)..."
cd ..
php -S 127.0.0.1:8000

# जब PHP बंद हो, Python भी बंद
kill $API_PID