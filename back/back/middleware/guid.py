from typing import Callable
from django.http import HttpRequest, HttpResponse
from back.models import User
import logging
import uuid

class GuidMiddleware:
    cookie_name = 'userid'
    expiration = 10 * 365 * 24 * 60 * 60  # 10 years

    def __init__(self, get_response: Callable[[HttpRequest], HttpResponse]):
        self.get_response = get_response

    def __call__(self, request: HttpRequest):
        userid = request.session.get("userid")
        if userid is None:
            userid = str(uuid.uuid4())
            logging.info(f"New user visit {userid}.")
            request.session.set_expiry(30*24*60*60)
            request.session["userid"] = userid
            User.objects.create(userid=userid)
        else:
            logging.info(f"Existing user visit {userid}.")
            
        response = self.get_response(request)
        return response