FROM python:3.7-alpine as base


FROM base as builder

RUN pip install pipenv

COPY . .

RUN pipenv install

EXPOSE 80

CMD ["gunicorn", "-w 2", "run:app"]
