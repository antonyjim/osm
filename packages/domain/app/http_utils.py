"""
Provide utilities for handling and parsing http client requests
"""

from json import loads, dumps

# Format errors
def handle_response(response, expect_body=False):
    status = response.code
    if status == 200 and expect_body:
        return {"success": True, "body": loads(response.read())}
    elif status == 200 and expect_body is not True:
        return {"success": True}
    elif status == 400:
        return {"success": False, "error": loads(response.read())}
    elif status == 401:
        return {
            "success": False,
            "error": {"code": "401", "message": "Invalid credentials provided"},
        }
    elif status == 403:
        return {
            "success": False,
            "error": {
                "code": "403",
                "message": "User does not have access to requested resource",
            },
        }
    elif status == 404:
        return {
            "success": False,
            "error": {
                "code": "404",
                "message": response.url + " was not located on GoDaddy server",
            },
        }
    elif status == 422:
        return {"success": False, "error": loads(response.read())}
    elif status == 429:
        return {
            "success": False,
            "error": {
                "code": "429",
                "message": "Too many requests received within interval, retry after "
                + loads(response.read())["retryAfterSec"]
                + " seconds",
            },
        }
    elif status == 500:
        return {
            "success": False,
            "error": {
                "code": "500",
                "message": "Error contacting GoDaddy server. Please try again at another time",
            },
        }
    else:
        return {
            "success": False,
            "error": {
                "code": "0000",
                "message": "Error processing request. Please view system logs for more details",
            },
        }
