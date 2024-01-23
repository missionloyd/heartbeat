const crypto = require('crypto-js');

function checkCache(cache, cacheTTL) {
  return (req, res, next) => {
    // Generate the cache key based on the request
    const cacheKey = generateCacheKey(req);

    // Check if the response is cached and not expired
    const cachedData = checkCachedData(cache, cacheKey, cacheTTL);

    if (cachedData) {
      // If data is found in the cache, send it as the response
      console.log("Cache hit:", cacheKey);
      res.json(cachedData);
    } else {
      // If data is not found in the cache, proceed to the next middleware
      res.cacheKey = cacheKey; // Attach the cacheKey to the response object
      next();
    }
  };
}

function setCache(cache, cacheKey, responseData) {
  // Cache the response with the generated cache key and current timestamp
  cache[cacheKey] = {
    data: responseData,
    timestamp: Date.now(),
  };

  return;
}

function generateCacheKey(req) {
  // Include relevant request information in the cache key
  const keyParts = {
    // url: req.url,
    // method: req.method,
    body: JSON.stringify(req.body),
  };
  
  const hash = crypto.MD5(JSON.stringify(keyParts)).toString(crypto.enc.Hex);
  return `cache:${hash}`;
}

function checkCachedData(cache, cacheKey, cacheTTL) {
  // Check if the response is cached and not expired
  const cachedEntry = cache[cacheKey];

  if (cachedEntry && Date.now() - cachedEntry.timestamp < cacheTTL) {
    console.log("Cache hit:", cacheKey);
    return cachedEntry.data;
  }

  return false;
}

module.exports = { checkCache, setCache };
