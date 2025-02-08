import socket 
s = socket.socket()
port = 8000
s.connect(('192.168.207.102', port))
def detect_accident():
    while True:
        status = s.recv(1024).decode()
        print(status)
        if status == 'ALERT: EMERGENCY':
            return 1
def main():
    check = detect_accident()
    if check == 1:
        print("ACCIDENT OCCURED")
if __name__ == "__main__":
    main()

