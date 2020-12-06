# InstaMatch
A social app to manage matchmaking and connection between friends!

## Starting Guide
1. Install Expo CLI
    - Can be installed with `npm install --global expo-cli`
    - More info can be found [here](https://docs.expo.io/get-started/installation/)
2. Install Expo client for iOS
    - Expo client can be found [here](https://itunes.com/apps/exponent)

## Running the app
1. Clone the app with `git clone gitlab@gitlab.cse.unsw.EDU.AU:z5165218/instamatch.git`
2. Navigate to the expo project with `cd instamatch/instamatch`
3. Install all the necessary dependencies with `expo install`
4. Run the expo app with `expo start`
5. Connect to the project through the iOS expo client as per the instructions [here](https://docs.expo.io/get-started/create-a-new-app/)

\* Note: While our app is compatible with both iOS and Android, testing was conducted on iOS, and we cannot guarantee performance on Android will be comparable.

## Technical Specifications
Our application consists of a React Native mobile app, as well as a Python API.
- Our mobile app can be found at `./instamatch`
- Our Python API can be found at `./backend` and has been deployed [here](https://instamatch-api.herokuapp.com/)
