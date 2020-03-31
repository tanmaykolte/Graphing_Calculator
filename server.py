import http.server
import socketserver

PORT = 5000
Handler = http.server.SimpleHTTPRequestHandler

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print("serving at port", PORT)
    print(f"website running at http://localhost:{PORT}")
    print("^C to stop server.")
    httpd.serve_forever()
