# Klubby React App

At the core of this project is a webapp that uses the react framework. Ionic Capacitor is cross-platform deployment solution that is then used to deploy the react app to native iOS and Android code. 

DevOps best practices are in place to automate the deployment of this application. Examples include:
- IAC
- CICD Deployment Pipelines (Webapp, iOS, and Android)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Git Practice

This project uses [Gitflow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow) with long term strategy of using [Trunk Based Deployments](https://trunkbaseddevelopment.com/).

## CI/CD
The main and dev branches have cicd in place to automate the following:

- Webapp Deployment
- iOS Deployment
- Android Deployment