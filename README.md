# epitech-xp-calculator

Epitech XP calculator for the Hub module

## Table of Contents

- [About](#about)
  - [Built with](#built-with)
- [Getting started](#getting-started)
  - [Using Docker](#using-docker)
    - [Prerequisites](#prerequisites)
  - [Using Node.js](#using-nodejs)
    - [Prerequisites](#prerequisites-1)
    - [Installation](#installation)
- [Using](#using)
  - [Docker](#docker)
  - [Node.js](#nodejs)
- [Contributing](#contributing)
- [License](#license)

## About

This program allows Epitech students to know how many XPs they have acquired during their year at Epitech. The XP is necessary to validate a module of discovery and experimentation outside of the courses at Epitech.

### Built with

- [Docker](https://www.docker.com/)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [fetch-cookie](https://www.npmjs.com/package/fetch-cookie)
- [node-fetch](https://www.npmjs.com/package/node-fetch)

## Getting started

### Using Docker

#### Prerequisites

1. [Install Docker](https://docs.docker.com/get-docker/)

### Using Node.js

#### Prerequisites

1. [Install Node.js](https://nodejs.org/en/download/package-manager/)

#### Installation

1. Clone the repository:

```shell script
git clone https://github.com/CyberryTeam/epitech-xp-calculator.git
cd epitech-xp-calculator
```

2. Install Node.js packages:

```shell script
npm install --production
```

## Using

- Generate and retrieve [your auto-login link](https://intra.epitech.eu/admin/autolog).

### Docker

```shell script
docker run --rm -e AUTO_LOGIN=<auto-login> cyberryteam/epitech-xp-calculator:<tag>
```

Replace `<auto-login>` by your auto-login link.

Replace `<tag>` by one of the following:

- `tek1`: Start date for Tek1
- `tek2`: Start date for Tek2
- `tek3`: Start date for Tek3

**Note**: You can also define the start date by setting the `START_DATE` variable via the `-e` option with a value of format `yyyy-mm-dd`.

### Node.js

- Set `AUTO_LOGIN` variable in the `.env` file to your auto-login link.
- Start the program:

```shell script
npm start
```

**Note**: You can also define the start date by setting the `START_DATE` variable in the `.env` file with a value of format `yyyy-mm-dd`.

## Contributing

Bug reports, feature requests, other issues and pull requests are welcome.
See [`CONTRIBUTING.md`](CONTRIBUTING.md) for more information.

**Special thanks:**
- [Madfish5415](https://github.com/Madfish5415): Organization support in XPs counting

## License

Distributed under the [MIT](https://spdx.org/licenses/MIT.html) License.
See [`LICENSE`](LICENSE) for more information.
