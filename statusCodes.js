errorCodes = {
  "OK": {
    "code": 200,
    "description": "OK",
    "details": "The request was successful."
  },
  "CREATED": {
    "code": 201,
    "description": "Created",
    "details": "The request was successful, and a new resource was created."
  },
  "NO_CONTENT": {
    "code": 204,
    "description": "No Content",
    "details": "The request was successful, but there is no additional content to send in the response."
  },
  "OUT_OF_STOCK" : {
    "code" : 205,
    "description" : "Out of Stock",
    "details" : "The requested product is currently out of stock."
  },
  "BAD_REQUEST": {
    "code": 400,
    "description": "Bad Request",
    "details": "The server could not understand the request due to invalid syntax."
  },
  "UNAUTHORIZED": {
    "code": 401,
    "description": "Unauthorized",
    "details": "The client must authenticate to get the requested response."
  },
  "FORBIDDEN": {
    "code": 403,
    "description": "Forbidden",
    "details": "The client does not have the necessary permission for the resource."
  },
  "NOT_FOUND": {
    "code": 404,
    "description": "Not Found",
    "details": "The server can't find the requested resource."
  },
  "UNPROCESSABLE_ENTITY": {
    "code": 422,
    "description": "Unprocessable Entity",
    "details": "The request was well-formed but was unable to be followed due to semantic errors."
  },
  "INTERNAL_SERVER_ERROR": {
    "code": 500,
    "description": "Internal Server Error",
    "details": "The server encountered an unexpected condition that prevented it from fulfilling the request."
  },
  "SERVICE_UNAVAILABLE": {
    "code": 503,
    "description": "Service Unavailable",
    "details": "The server is not ready to handle the request. Common causes are a server that is down for maintenance or is overloaded."
  },
  "BAD_GATEWAY": {
    "code": 502,
    "description": "Bad Gateway",
    "details": "The server, while acting as a gateway or proxy, received an invalid response from an inbound server it accessed while attempting to fulfill the request."
  },
  "REQUEST_TIMEOUT": {
    "code": 408,
    "description": "Request Timeout",
    "details": "The server did not receive a complete request message within the time that it was prepared to wait."
  },
  "CONFLICT": {
    "code": 409,
    "description": "Conflict",
    "details": "The request could not be completed due to a conflict with the current state of the target resource."
  },
  "GONE": {
    "code": 410,
    "description": "Gone",
    "details": "The target resource is no longer available at the origin server, and this condition is likely to be permanent."
  },
  "LENGTH_REQUIRED": {
    "code": 411,
    "description": "Length Required",
    "details": "The server refuses to accept the request without a defined Content-Length."
  },
  "PRECONDITION_FAILED": {
    "code": 412,
    "description": "Precondition Failed",
    "details": "One or more conditions given in the request header fields evaluated to false when tested on the server."
  },
  "PAYLOAD_TOO_LARGE": {
    "code": 413,
    "description": "Payload Too Large",
    "details": "The server is refusing to process a request because the request payload is larger than the server is willing or able to process."
  },
  "URI_TOO_LONG": {
    "code": 414,
    "description": "URI Too Long",
    "details": "The server is refusing to service the request because the request-target is longer than the server is willing to interpret."
  },
  "UNSUPPORTED_MEDIA_TYPE": {
    "code": 415,
    "description": "Unsupported Media Type",
    "details": "The origin server is refusing to service the request because the payload is in a format not supported by this method on the target resource."
  },
  "UPGRADE_REQUIRED": {
    "code": 426,
    "description": "Upgrade Required",
    "details": "The server refuses to perform the request using the current protocol but might be willing to do so after the client upgrades to a different protocol."
  },
  "TOO_MANY_REQUESTS": {
    "code": 429,
    "description": "Too Many Requests",
    "details": "The user has sent too many requests in a given amount of time."
  },
  "NO_RESULTS_FOUND" : {
    "code": 404,
    "description": "No Results Found",
    "details": "The server can't find the requested resource."
  },
  }
  // Add more status codes as needed


  module.exports = errorCodes;