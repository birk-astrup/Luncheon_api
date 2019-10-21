FROM python:3.7-slim-buster

COPY requirements.txt /tmp/requirements.txt

RUN pip install -r /tmp/requirements.txt && useradd -m myuser

USER myuser

WORKDIR /opt/luncheon

COPY . .

ENV MONGO_URI $MONGO_URI

ENV DOMAIN $DOMAIN

ENV AUDIENCE $AUDIENCE

ENV ALGORITHM $ALGORITHM

CMD gunicorn -b 0.0.0.0:$PORT -w 4 --threads 4 wsgi:app