import os

from flask import Flask, send_from_directory

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
STATIC_DIR = os.path.join(BASE_DIR, "static")

app = Flask(__name__, static_folder="static", static_url_path="")

CSP = (
    "default-src 'self'; "
    "script-src 'self' https://unpkg.com; "
    "style-src 'self'; "
    "img-src 'self' data:; "
    "font-src 'self'; "
    "connect-src 'self'; "
    "object-src 'none'; "
    "base-uri 'self'; "
    "form-action 'none'; "
    "frame-ancestors 'none'; "
    "upgrade-insecure-requests"
)

SECURITY_HEADERS = {
    "Content-Security-Policy": CSP,
    "X-Frame-Options": "DENY",
    "X-Content-Type-Options": "nosniff",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "Permissions-Policy": "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
    "X-XSS-Protection": "1; mode=block",
    "Cross-Origin-Opener-Policy": "same-origin",
    "Cross-Origin-Resource-Policy": "same-origin",
}


@app.after_request
def apply_security_headers(response):
    for key, value in SECURITY_HEADERS.items():
        response.headers.setdefault(key, value)
    return response


@app.route("/")
def index():
    return send_from_directory(STATIC_DIR, "index.html")


@app.errorhandler(404)
def not_found(_error):
    return send_from_directory(STATIC_DIR, "404.html"), 404


if __name__ == "__main__":
    app.run(debug=False)