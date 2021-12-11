bionic-serial-chat-meteor
=========================

Prerequisites
1. Meteor
2. Android SDK

Run on Device:
`meteor run android-device --mobile-server http://10.42.0.5:3000`

Run in emulator
`meteor run android`


Depends on:
- https://github.com/TechplexEngineer/Cordova-Plugin-Bionic-BluetoothSerial



## OSX


`brew install android-commandlinetools`
for SdkManager

`sdkmanager --install "build-tools;30.0.3"`
`sdkmanager --install "platforms;android-30"`

to find path for sdk root
`sdkmanager --list_installed --verbose`
setup env var
`export ANDROID_SDK_ROOT=/usr/local/share/android-commandlinetools`
Need gradle to build
`brew install gradle`

list devices
`/usr/local/share/android-commandlinetools/platform-tools/adb devices`
```
List of devices attached
R9JR808ES7J	device
```


`meteor run android-device --mobile-server http://<host computer ip>:3000`