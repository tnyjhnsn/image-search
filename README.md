# image-search
FCC - API Projects - Image Search Abstraction Layer

* I can get the image URLs, alt text and page urls for a set of images relating to a given search string.
* I can paginate through the responses by adding a ?offset=n parameter to the URL.
* I can get a list of the most recently submitted search strings.

Further details about the request and response for the Google custom search API can be found at `https://developers.google.com/custom-search/json-api/v1/reference/cse/list`

#### Usage
http://www.tosp.net.au:3002/  
http://www.tosp.net.au:3002/imagesearch/lolcat?offset=5  
http://www.tosp.net.au:3002/latest
