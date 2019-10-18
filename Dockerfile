FROM python:3.7-slim-buster as base

WORKDIR /luncheon

COPY requirements.txt .

RUN pip install -r requirements.txt

COPY . .

RUN useradd -m myuser

USER myuser

CMD gunicorn -b 0.0.0.0:$PORT -w 4 --threads 4 wsgi:app
