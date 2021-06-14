# url-shortener-server

## Project setup
```
npm install
```

### Start Redis
```
docker run -p 6379:6379 --name url-shortener-redis -d redis
```

### Start server
```
node index.js
```

### Info

URLs are persisted using Redis.\
The shortened URL is used as a key and the original URL is the value.\
Accessing a saved URL takes `O(1)`

Only one version of a shortened URL is ever created preventing duplicates.\
When creating a URL a check is made to see if the shortened URL is already saved.\
I've chosen to trade space for time here by creating a second entry where the key is the original URL and the value is the shortened URL so the check takes `O(1)`
