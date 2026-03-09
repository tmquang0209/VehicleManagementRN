const { withProjectBuildGradle, withAppBuildGradle, withAppDelegate, withPlugins, withPodfile } = require('@expo/config-plugins');

const googleServicesClassPath = 'com.google.gms:google-services';
const googleServicesVersion = '4.4.4'; // Matches versions in @react-native-firebase/app package.json
const googleServicesPlugin = 'com.google.gms.google-services';

const withAndroidBuildscript = (config) => {
	return withProjectBuildGradle(config, (config) => {
		if (config.modResults.language === 'groovy') {
			let contents = config.modResults.contents;

			// Inject classpath
			if (!contents.includes(googleServicesClassPath)) {
				contents = contents.replace(
					/dependencies\s?{/,
					`dependencies {
        classpath '${googleServicesClassPath}:${googleServicesVersion}'`,
				);
			}

			// Inject ext block for react-native-text-recognition and general versions
			if (!contents.includes('TextRecognition_compileSdkVersion')) {
				const extBlock = `
    ext {
        buildToolsVersion = "35.0.0"
        minSdkVersion = 24
        compileSdkVersion = 35
        targetSdkVersion = 35
        ndkVersion = "27.1.12297006"
        kotlinVersion = "2.0.21"
        TextRecognition_compileSdkVersion = 35
        TextRecognition_targetSdkVersion = 35
        TextRecognition_buildToolsVersion = "35.0.0"
        TextRecognition_minSdkVersion = 24
    }
`;
				// Insert before repositories
				if (contents.includes('repositories {')) {
					contents = contents.replace('repositories {', `${extBlock}\n    repositories {`);
				} else if (contents.includes('buildscript {')) {
					contents = contents.replace('buildscript {', `buildscript {${extBlock}`);
				}
			}

			config.modResults.contents = contents;
		}
		return config;
	});
};

const withAndroidAppPlugin = (config) => {
	return withAppBuildGradle(config, (config) => {
		if (config.modResults.language === 'groovy') {
			if (!config.modResults.contents.includes(`apply plugin: '${googleServicesPlugin}'`)) {
				config.modResults.contents += `\napply plugin: '${googleServicesPlugin}'\n`;
			}
		}
		return config;
	});
};

const withIosFirebaseAppDelegate = (config) => {
	return withAppDelegate(config, (config) => {
		if (config.modResults.language === 'objcpp') {
			const contents = config.modResults.contents;

			// Add import
			if (!contents.includes('#import <Firebase.h>')) {
				config.modResults.contents = contents.replace(
					/#import "AppDelegate.h"/,
					`#import "AppDelegate.h"
#import <Firebase.h>`,
				);
			}

			// Add configure
			if (!config.modResults.contents.includes('[FIRApp configure]')) {
				config.modResults.contents = config.modResults.contents.replace(/didFinishLaunchingWithOptions[\s\S]*?return/, (match) => {
					return match.replace(
						'{',
						`{
  [FIRApp configure];`,
					);
				});
			}
		} else if (config.modResults.language === 'swift') {
			const contents = config.modResults.contents;

			// Add import
			if (!contents.includes('import Firebase')) {
				config.modResults.contents = `import Firebase\n${contents}`;
			}

			// Add configure
			if (!config.modResults.contents.includes('FirebaseApp.configure()')) {
				config.modResults.contents = config.modResults.contents.replace(/(didFinishLaunchingWithOptions[\s\S]*?\{)/, (match) => {
					return `${match}\n    FirebaseApp.configure()`;
				});
			}
		}
		return config;
	});
};

const withIosPodfile = (config) => {
	return withPodfile(config, (config) => {
		let podfileContents = config.modResults.contents;

		// Remove global use_modular_headers! if present (cleanup)
		podfileContents = podfileContents.replace(/^use_modular_headers!/gm, '');

		// Add modular headers for GoogleUtilities inside the target block
		// We look for "use_expo_modules!" which is standard in Expo Podfiles inside the target
		if (!podfileContents.includes("pod 'GoogleUtilities', :modular_headers => true")) {
			podfileContents = podfileContents.replace(/use_expo_modules!/, `use_expo_modules!\n  pod 'GoogleUtilities', :modular_headers => true\n  pod 'FirebaseCore', :modular_headers => true`);
		}

		config.modResults.contents = podfileContents;
		return config;
	});
};

const withFirebasePlugin = (config) => {
	// return withPlugins(config, [withAndroidBuildscript, withAndroidAppPlugin, withIosFirebaseAppDelegate, withIosPodfile]);
	return withPlugins(config, [withAndroidBuildscript, withAndroidAppPlugin, withIosFirebaseAppDelegate, withIosPodfile]);
};

module.exports = withFirebasePlugin;
