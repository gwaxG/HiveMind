from django.apps import AppConfig
from django.core.signals import request_finished
from threading import Thread
import os 
from back.background import Jobs

class BackConfig(AppConfig):
    name = 'back'

    def ready(self):
        if os.environ.get('RUN_MAIN', None) == 'true':
            Thread(target=Jobs().run).start()