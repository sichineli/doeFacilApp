/**
 * @format
 */


import {AppRegistry,YellowBox,} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

    YellowBox.ignoreWarnings = ([
      'Encountered an error loading page',    // WebView uri: result.url and url failing to load - "bloomberg suneq" https://github.com/facebook/react-native/issues/7839#issuecomment-224111608
      'Deprecation warning: moment construction falls back to js Date. This is discouraged and will be removed in upcoming major release. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.',
      'Task orphaned for request ',
      'Remote debugger is in a background tab which may cause apps to perform slowly',
    ])
    console.disableYellowBox = true



AppRegistry.registerComponent(appName, () => App);
