from urllib.request import Request, urlopen
from os import environ
import json

from http_utils import handle_response


# Api secret and key
headers = {
    "Authorization": "sso-key "
    + environ.get("GODADDY_API_KEY")
    + ":"
    + environ.get("GODADDY_API_SECRET")
}

# Look at testing domain
base_domain = "https://api.godaddy.com"


def get_domains():
    domain_request = Request(
        base_domain + "/v1/domains", None, headers, None, False, "GET"
    )
    domains = urlopen(domain_request)
    return handle_response(domains, True)


def get_all_domain_records(domain):
    domain_detail_request = Request(
        url=base_domain + "/v1/domains/" + domain + "/records",
        headers=headers,
        method="GET",
    )
    domain_details = urlopen(domain_detail_request)
    return handle_response(domain_details, True)


# See https://developer.godaddy.com/doc/endpoint/domains#/v1/recordGet
def get_specific_domain_record(domain, record_type, name):
    domain_record_request = Request(
        url=base_domain
        + "/v1/domains/"
        + domain
        + "/records/"
        + record_type
        + "/"
        + name,
        headers=headers,
        method="GET",
    )
    domain_details = urlopen(domain_record_request)
    return handle_response(domain_details, True)


def update_domain_all_dns(domain, domain_details):
    domain_update_request = Request(
        base_domain + "/v1/domains/" + domain,
        json.dumps(domain_details),
        {**headers, "Content-Type": "application/json"},
        None,
        None,
        "PATCH",
    )
    try:
        domain_update = urlopen(domain_update_request)
        return handle_response(domain_update, False)
    except:
        raise


# See https://developer.godaddy.com/doc/endpoint/domains#/v1/recordReplaceTypeName
def update_single_domain_record(domain, values):
    if not "name" in values or not "data" in values:
        return {
            "success": False,
            "errors": [
                {"message": "name and data are required attributes to update record"}
            ],
        }
    elif not "ttl" in values:
        values["ttl"] = 3600
    elif not "type" in values:
        return {
            "success": False,
            "errors": [{"message": "type is required to update record"}],
        }
    elif values["type"] is not None and values["name"] is not None:
        domain_record_update_request = Request(
            url=base_domain
            + "/v1/domains/"
            + domain
            + "/records/"
            + values["type"]
            + "/"
            + values["name"],
            data=values,
            method="PUT",
            headers=headers,
        )
        domain_record_update = urlopen(domain_record_update_request)
        return handle_response(domain_record_update, False)
    else:
        return {"success": False, "errors": [{"message": "An unknown error occurred"}]}

