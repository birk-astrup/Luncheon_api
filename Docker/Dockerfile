FROM python:3.7-slim-buster as base

WORKDIR /luncheon

COPY requirements.txt .

RUN pip install -r requirements.txt

COPY . .

EXPOSE 80

CMD ["gunicorn", "-b", "0.0.0.0:80", "-w", "4", "--threads", "4", "wsgi:app"]
