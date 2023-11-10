from typing import Callable
from django.http import HttpRequest, HttpResponse
from back.models import User
import logging
import datetime
import uuid

class GuidMiddleware:
    cookie_name = 'userid'
    expiration = 10 * 365 * 24 * 60 * 60  # 10 years

    def __init__(self, get_response: Callable[[HttpRequest], HttpResponse]):
        self.get_response = get_response

    def update_user(self, userid: str) -> bool:
        user = User.objects.get(userid=userid)
        user.lastvisit = datetime.datetime.utcnow()
        user.save()

    def create_user(self) -> str:
        userid = str(uuid.uuid4())
        date = datetime.datetime.utcnow()

        User.objects.create(userid=userid, lastvisit =date)
        logging.info(f"Created a new user {userid}.")

        return userid

    def __call__(self, request: HttpRequest):
        print(request.get_raw_uri(), request.COOKIES)
        userid = ""
        cookie_attach = False
        if self.cookie_name in request.COOKIES:
            userid = request.COOKIES.get(self.cookie_name)
            self.update_user(userid)
        else:
            userid = self.create_user()
            cookie_attach = True     
        
        request.userid = userid

        response = self.get_response(request)

        if cookie_attach:
            response.set_cookie(self.cookie_name, userid, domain=None, samesite='None', secure=False)

        return response