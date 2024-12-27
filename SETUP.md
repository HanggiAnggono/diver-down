This is a basic react-native project (without framework) so the setup should be simple and can be done mostly by following the guide from https://reactnative.dev/docs/getting-started and https://reactnative.dev/docs/set-up-your-environment

In order to run this application you need to make sure that Node.js is installed on your system and the Node.js version should be at least 18.

After cloning this repository into your local machine, make sure to run

```bash
npm install --legacy-peer-deps
```

For iOS you need to run the following command

```bash
npx pod-install ios
```

Then you need to start the metro server by running the following command
```bash
npm run start
```

After the metro server is running, you can start another terminal instance and then run the following command depending on which platform you are going to run the application on.

```bash
npm run android
```

```bash
npm run ios
```