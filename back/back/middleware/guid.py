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
        try:
            user = User.objects.get(userid=userid)
            user.lastvisit = datetime.datetime.utcnow()
            user.save()
            return True
        except User.DoesNotExist:
            logging.info(f"Need to create a new user, {userid} not found.")
            return False

    def create_user(self) -> str:
        userid = str(uuid.uuid4())
        date = datetime.datetime.utcnow()

        User.objects.create(userid=userid, lastvisit =date)
        logging.info(f"Created a new user {userid}.")

        return userid

    def __call__(self, request: HttpRequest):
        updated = False
        
        if self.cookie_name in request.COOKIES:
            cookie = request.COOKIES.get(self.cookie_name)
            updated = self.update_user(cookie)
            
        response = self.get_response(request)

        if not updated:
            userid = self.create_user()

            response.set_cookie(
                self.cookie_name,
                userid,
                max_age=self.expiration,
                path='/',  # cookie will be available for the whole site
                domain=None,  # cookie available for the current domain
                secure=False,  # cookie will be sent only over HTTPS if True
                httponly=True  # cookie cannot be accessed by JS if True (recommended)
            )
        return response