#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
Listen on /api/domains from the main app server
"""

from typing import Any, Dict, Optional

from flask import Flask, Response

from godaddy_domains import (
    get_domains,
    get_all_domain_records,
    get_specific_domain_record,
)


def create_app(config: Optional[Dict[str, Any]] = None) -> Flask:
    app = Flask(__name__)

    # Get started with routes
    @app.route("/api/domains", methods=["GET"])
    def get_all_domains():
        return get_domains()

    @app.route("/api/domain/<domain_name>", methods=["GET"])
    def get_domain(domain_name: str):
        return get_all_domain_records(domain_name)

    @app.route("/api/domain/<domain_name>/records/<rec_type>/<rec_name>")
    def get_specific_record(domain_name, rec_type, rec_name):
        return get_specific_domain_record(domain_name, rec_type, rec_name)

    return app


if __name__ == "__main__":
    app = create_app()
    app.run(port=8080)
