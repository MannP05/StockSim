# https://www.youtube.com/watch?v=Hncp0mPfUvk - python web server tutorial

import socket
import time

SERVER_HOST = "0.0.0.0"
SERVER_PORT = 8080

server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM) # IPv4 TCP socket object
server_socket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1) # allows server socket to reuse address
# server_socket.setblocking(True) # set to blocking mode, default is True

server_socket.bind((SERVER_HOST, SERVER_PORT))

server_socket.listen(5)
print(f"Listening on port {SERVER_PORT}")

while True:
    client_socket, client_address = server_socket.accept() # blocks and waits for a connection from the client
    request = client_socket.recv(1024).decode() #receive request from the client of 1024 bytes
    print(f"{request}")
    headers = request.split('\n')
    first_header_components = headers[0].split()
    
    http_method = first_header_components[0]
    path=first_header_components[1]
    if http_method == "GET":
        if path == "/":
            fin = open('test.html')
            content = fin.read()
            fin.close()
            response = 'HTTP/1.1 200 OK\n\n' + content
        else:
            response = 'HTTP/1.1 404 Not Found\n\n The requested resource was not found.'
    else:
        response = 'HTTP/1.1 405 Method Not Allowed\n\n Allow: GET'
    client_socket.sendall(response.encode())
    client_socket.close()
    # print(headers[0])




