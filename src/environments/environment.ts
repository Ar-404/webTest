// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyDsEEwhwj5WooB-CZ4p-mrYdjwrd19q6d8",
    authDomain: "webtest-206d2.firebaseapp.com",
    projectId: "webtest-206d2",
    storageBucket: "webtest-206d2.appspot.com",
    messagingSenderId: "178433889182",
    appId: "1:178433889182:web:6036d3576817663e687c8f"
  },
  email_pattern: '^[a-z0-9]+([.]?[a-z0-9])+@[a-z0-9]+\\.[a-z]+([.]?[a-z]{1,15})$',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
