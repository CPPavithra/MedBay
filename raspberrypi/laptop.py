import socket 
s = socket.socket()
port = 8000
s.connect(('127.0.0.1', port))

while True:
    print(s.recv(1024).decode())
    s.close()
