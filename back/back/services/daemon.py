from multiprocessing import Process
import time 
import datetime 
from django.db import connection

class Daemon:
    def __init__(self):
        print("Init of Refiller")
    
    def work(self):
        try:
            pass
        except Exception as e:
            print(f"An error occurred: {e}")
        finally:
            connection.close()

    def run(self):
        while True:
            print(datetime.datetime.utcnow())
            time.sleep(5)
