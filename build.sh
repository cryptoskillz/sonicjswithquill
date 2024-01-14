wipeOutOldBuild () {
    echo 'Wiping out old build directory'
    rm -rf ./_site/**
}

#delete the files in the site dir
wipeOutOldBuild

npx @11ty/eleventy 

echo "killing rouge wrangler"

PORT=8788

# Find and kill the Node.js process using port 8789
NODE_PID=$(lsof -i :$PORT -sTCP:LISTEN -t)
if [ -z "$NODE_PID" ]; then
  echo "No Node.js process found on port $PORT"
else
  # Forcefully terminate the Node.js process
  echo "Killing Node.js process with PID $NODE_PID"
  kill -9 "$NODE_PID"
fi

echo "starting wrangler"


#run eleventy
npx wrangler pages dev _site --port 8788
