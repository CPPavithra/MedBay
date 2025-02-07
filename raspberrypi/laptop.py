import socket
s = socket.socket()
print("Socket created successfully")
port = 8000
s.bind(('192.168.207.151', port))
print("socket has been binded to port 8000")
s.listen(5)
while True:
    c, addr = s.accept()
    print("got connection from ", addr)
    c.send("hehe".encode())
    break
c.close()

