import socket 
def initialize_laptop():
    s = socket.socket()
    port = 8000
    s.connect(('192.168.53.102', port))
    return s
def detect_accident(s):
    while True:
        status = s.recv(1024).decode()
        print(status)
        if status == 'ALERT: EMERGENCY':
            return 1
def main():
    s = initialize_laptop()
    check = detect_accident(s)
    if check == 1:
        print("EMERGENCY DETECTED: ALERTING POLICE FORCE")
if __name__ == "__main__":
    main()

