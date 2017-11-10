// const API_KEY = 'AIzaSyCFxZuzNM9dQI2FdXkgdmwnntfnCz3vGso'
// const CLIENT_ID = 'ace-orb-182006'

// declare const gapi: any

// export function getVideos() {
//   console.log('getting videos.......')

//   // 1. Load the JavaScript client library.
//   gapi.load('client', function() {
//     // 2. Initialize the JavaScript client library.
//     gapi.client.init({
//       'apiKey': API_KEY,
//       // Your API key will be automatically added to the Discovery Document URLs.
//       'discoveryDocs': ['https://people.googleapis.com/$discovery/rest'],
//       // clientId and scope are optional if auth is not required.
//       'clientId': CLIENT_ID + '.apps.googleusercontent.com',
//       'scope': 'profile'
//     }).then(function() {
//       // 3. Initialize and make the API request.
//       return gapi.client.buildApiRequest('GET',
//                       '/youtube/v3/channels',
//                       {'forUsername': 'GoogleDevelopers',
//                        'part': 'snippet,contentDetails,statistics'});
//       // return gapi.client.people.people.get({
//       //   'resourceName': 'people/me',
//       //   'requestMask.includeField': 'person.names'
//       // });
//     }).then(function(response) {
//       console.log(response.result);
//     }, function(reason) {
//       console.log('Error: ' + reason.result.error.message);
//     });
//   });

// }
