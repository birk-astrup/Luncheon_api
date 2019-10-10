
# Introduction
 
This application is being built to digitalize the payment process for employees and finance department in Netcompany Norway.  
The client-side of the application is being built using react-native.

We chose to use react-native to reach out to every user within the company without the usage of a web-application.  
Per today, signing up for lunch requires each individual to write their name on a paper, and later collected by finance.  
Therefore finance requires to count each individual, and manually input these numbers for the system.

# Pre-requisites

The solution is build with react-native.  
This project is using version 0.60 and above, therefore no module linking is required.  

Installation guide for react-native: [here](https://facebook.github.io/react-native/docs/getting-started)  
When developing this product, we used react-native cli instead of expo.

# Installation

This will show the easy steps how to install the application.

```
navigate  /client
```

Installation of packages required
```
yarn install / npm install
```

Run the application as iOS or Android
```
yarn android / npm run android
yarn ios / npm run ios
```

# Usage

To make use of the full application, you will be required to run the backend  
The documentation for this can be found [here]()

### Using a local server

When using a local development server, you as the user need to "reverse" / open a port through the phone.  
For Android development, this can be done by using ADB:
```
adb reverse tcp:PORT tcp:PORT
```
PORT signifies the port your development server is running on.

# Deployment

Coming soon tm