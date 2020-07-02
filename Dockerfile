FROM node:14.5.0-alpine3.12

ARG IMAGE_CREATION
ARG IMAGE_VERSION

LABEL fr.cyberry.image.created=${IMAGE_CREATION}
LABEL fr.cyberry.image.authors="Cyberry Team <team@cyberry.fr> (@CyberryTeam)"
LABEL fr.cyberry.image.url="https://hub.docker.com/r/cyberryteam/epitech-xp-calculator"
LABEL fr.cyberry.image.source="https://github.com/CyberryTeam/epitech-xp-calculator"
LABEL fr.cyberry.image.version=${IMAGE_VERSION}
LABEL fr.cyberry.image.vendor="Cyberry"
LABEL fr.cyberry.image.licenses="MIT"
LABEL fr.cyberry.image.title="Epitech XP calculator"
LABEL fr.cyberry.image.description="Epitech XP calculator for the Hub module"

ENV APP_DIRECTORY="/usr/src/app"

WORKDIR ${APP_DIRECTORY}

COPY . .

RUN npm install --production

CMD [ "npm", "start" ]
