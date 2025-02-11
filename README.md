# Klubby React App

At the core of this project is a webapp that uses the react framework. [Ionic Capacitor](https://capacitorjs.com/) is cross-platform deployment solution that is then used to deploy the react app to native iOS and Android code.

DevOps best practices are in place to automate the deployment of this application. Examples include:
- IAC
- CICD Deployment Pipelines (Webapp, iOS, and Android)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## React Architecture
In the src/ folder your will find the code for the Klubby Application. This folder follows standard react layout. The main entry point is index.js/App.js, from there...

- redux
- routes
- single page application approach
- styling
- components


## Git Practice

This project uses [Gitflow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow) with long term strategy of using [Trunk Based Deployments](https://trunkbaseddevelopment.com/).

## Deployment 

### CI/CD
The main and dev branches have cicd in place to automate the following:

- Webapp Deployment
- iOS Deployment
- Android Deployment

### Manual Deployment

- Webapp


npm install
npm build
#TODO add commands


- iOS

npm install -g @ionic/cli

npm install
npm build
npm install -g @ionic/cli
npm install @capacitor/core --save # this is in project, not needed
npm install @capacitor/cli --save # this is in project, not needed
ionic capacitor add ios
npx cap sync
npx cap run ios

- Android