const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
const {withNativeWind} = require('nativewind/metro');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {};

const metroConfig = mergeConfig(
  withNativeWind(getDefaultConfig(__dirname), {input: './global.css'}),
  config,
);

module.exports = metroConfig;
