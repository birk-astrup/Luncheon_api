FROM python:3.7-alpine

WORKDIR /luncheon

RUN pip install pipenv

COPY . .

RUN pipenv install && pipenv install gunicorn

EXPOSE 80

CMD ["gunicorn", "-b", "0.0.0.0:80", "run:app"]
