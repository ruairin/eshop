# About

This directory (/eshop/eshop/) contains the frontend app for the project. See the [top-level README](../README.md) in the root of the repository for an overview of the project. 

The front end app was created with the following technologies:

- [React.js](https://react.dev/) - Javascript framework for user interfaces
- [React router](https://reactrouter.com/) - Client-side page routing 
- [Zustand](https://www.npmjs.com/package/zustand) - State management
- [Tailwind](https://tailwindcss.com/) - CSS framework
- [Create React App](https://create-react-app.dev/) - Build setup
- [JSDoc](https://jsdoc.app/) - Generation of docs

The following are also used
- Icons
  - [mui-core](https://mui.com/core/) - Icons and selected UI components
  - [Geek Icon Pack](https://www.iconfinder.com/iconsets/geek-3) - Dummy product images
- Fonts
  - [Manolo Mono](https://www.cufonfonts.com/font/manolo-mono) - Page title font


# Setup

The following steps are required to set up the app. 
Note: it is assumed that you have [Node.js](https://nodejs.org/en) installed. Node.js version 18.16 was used for development. 

1. Open a terminal and clone the repository (`$ git clone https://github.com/ruairin/eshop.git`)

2. Change into the eshop sub-directory (where this README is located) `($ cd eshop/eshop)`

3. Run `($ npm install)` to download the required packages

4. .env file: 
    - Rename the provided .env.sample file to .env and set the environment variable REACT_APP_API_URL to the URL where the backend API is running. For example, if the API is running on the local machine on post 3000, set REACT_APP_API_URL=http://localhost:3000
    - Refer to the separate [backend README](../eshop-api/README.md) for instructions on how to setup the backend API.

5. Run `($ npm start)`. Note: the backend API must be running for the app to work.

6. Open a web browser to view the app at the URL shown on the terminal, e.g. http://localhost:3001/eshop/


# Source Structure

The source structure for the most important parts of the React app is summarised below

```
/eshop/eshop/
| -- /public/
| -- /src/
|     - /api/
|     - /components/
|     - /containers/
|     - /fonts/
|     - /store/
|     - index.jsx
| -- .env.example
| -- package.json
| -- README.md

```

| Directory         | Description |
| ---               | --- |
| /public/          | contains the index.html file and static content |
| /src/api/         | modules which fetch data from the backend API |
| /src/components/  | the react components which make up the interface, e.g. banner, product cards, product pages, menus |
| /src/containers/  | high-level components that call up other components, e.g. the Root component which describes the basic page layout. |
| /src/store/       | The zustand store for app state management |
| .env.example      | Sample environment file. This must be renamed to .env and configured as decribed in the setup section before using the app. |
| package.json      | Package file for npm. |
| README.md         | This readme file |


# Additional Scripts

In addition to the standard npm scripts provided by create-react-app, the following are available:

## npm run deploy
Deploy the react app to Github pages. Refer to this [guide](https://create-react-app.dev/docs/deployment/#github-pages) for instructions on how to deploy to your own github pages site.

## npm run docs
Uses JSDoc to generate documentation in html format based on the code comments.
