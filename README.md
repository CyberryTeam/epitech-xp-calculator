# epitech-xp-calculator

This program help the students of Epitech to know how many XP they have acquired on their year at Epitech.
The XP is needed to validate a module of discovery and experimentation outside of the classes at Epitech.

## How to use

First of all you will need an autologin link, this can be acquired in the Epitech Intranet:

Once your connected to the intranet you must follow the following steps:

- Go to the Administration part, the fifth icon next to the E-Learning icon
- Then in the list of options select: [Generate auto login link](https://intra.epitech.eu/admin/autolog)
- Copy the link showed in the screen and keep it for the next steps.

Once you have your autologin link, in the `.env` file, next to the variable: `AUTO_LOGIN` paste the link you copied previously.

Save the file an then install all the needed dependencies with:

`npm install`

And run the app with:

`node index.js`

Wait a few seconds for the API to get all the classes and it will show you the list number of credits and the number of activities you do for each activity type.

## Use it with Docker

To use it with docker you have three different tags:

- `tek1` it corresponds to the start date of the Tek1
- `tek2` it corresponds to the start date of the Tek2
- `tek3` it corresponds to the start date of the Tek3

Once you choose your corresponding image you can run the docker with following command:

`docker run --rm -e AUTO_LOGIN='your-autologin-link' colcolt/epi-xp-calculator:the_tag_choosen`

## Environment varaibles

The list of environment variables you can use:

- `AUTO_LOGIN` is where you have to add your auto login link
- `START_DATE` is by default 2020-01-01 but you can put another date in the format: `yyyy-mm-dd`

## Contributors

- Special thanks to @Madfish who add the support of activities organization in the counting of XP's.

