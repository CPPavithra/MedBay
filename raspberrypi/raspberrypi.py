import socket 
s = socket.socket()
port = 8000
s.connect(('192.168.207.151', port))
print(s.recv(1024).decode())
s.close()
