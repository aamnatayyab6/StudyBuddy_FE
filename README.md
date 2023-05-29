# StudyBuddy Mobile Application [[Download] ](https://expo.dev/artifacts/eas/ng8GY8bBaAD6gXzhV4b33t.apk)

This is the implementation of the StudyBuddy Mobile Application Frontend developed using [ReactNative](https://reactnative.dev/docs/getting-started) and [Expo](https://docs.expo.dev/overview/). For backend implementation, you can check the backend [repository](https://github.com/mastertimisensei/StudyBuddyBE.git).
For more information on StudyBuddy, the documentation is available [here](https://github.com/aamnatayyab6/ELTE-IK-Thesis/blob/main/Documentation.pdf).

# Getting Started

## Requirements

- You project should build against Android 5.0 (API level 21) SDK at least.
- StudyBuddy works only with devices running Android 5.0 (API level 21) or higher.

## Installation

Install with [npm](https://www.npmjs.com/):

```sh
$ npm install
```

## Run

To run the app on the device or emulator:

```sh
$ npx expo start
```

## Building APK

- To build APK [EAS](https://docs.expo.dev/build/introduction/) is needed:

```sh
$ npm install -g eas-cli
```

- Log in to your Expo account:

```sh
$ eas login
```

- Create a configuration file:

```sh
$ eas build:configure
```

- Add preview:

```jsonl
{
  "preview": {
    "android": {
      "buildType": "apk"
    }
  }
}
```

- Run build:

```sh
$ eas build -p android --profile preview
```

### Developer

**Aamna Tayyab**

- [github/aamnatayyab6](https://github.com/aamnatayyab6)
- [linkedin](https://www.linkedin.com/in/aamna-tayyab-10465b1a0/)
