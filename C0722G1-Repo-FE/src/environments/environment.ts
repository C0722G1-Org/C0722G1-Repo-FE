// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  customerURL: 'http://localhost:8080/api/customer/create',
  detailCustomerURL: 'http://localhost:8080/api/customer',
  firebaseConfig: {
    apiKey: 'AIzaSyDzyfWa2xaavBCzThSeDFQi1g9SwyDxHJ4',
    authDomain: 'file-8a68b.firebaseapp.com',
    projectId: 'file-8a68b',
    storageBucket: 'file-8a68b.appspot.com',
    messagingSenderId: '195564391460',
    appId: '1:195564391460:web:d6becb3313c6ff22fd5cb1'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
