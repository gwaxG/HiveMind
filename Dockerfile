FROM python:3.11

WORKDIR /back

COPY back/ .

RUN pip install .

CMD ["uvicorn", "--bind", "0.0.0.0:8000", "back.asgi:application"]

EXPOSE 8000