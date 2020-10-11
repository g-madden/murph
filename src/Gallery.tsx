import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import file from './assets/IMG_4502.jpg';
import file2 from './assets/IMG_4549.jpg';
import file3 from './assets/IMG_4550.jpg';
import file4 from './assets/IMG_4487.jpg';
//import { gapi } from 'gapi-script';
import { Carousel } from './Carousel';

export interface Props {}

export const Gallery = () => {
  // Array of API discovery doc URLs for APIs used by the quickstart
  const DISCOVERY_DOCS = [
    'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest',
  ];

  // Authorization scopes required by the API; multiple scopes can be
  // included, separated by spaces.
  //const SCOPES = 'https://www.googleapis.com/auth/drive.metadata.readonly';
  const API_KEY = 'AIzaSyBxEbC2XlipD4Cg6PU6Loeu04hXetLxCf8';
  //const CLIENT_ID='114005418106-mnb7ril3vihvqin5uc5qiks7qahc5h6q.apps.googleusercontent.com'

  /* const updateSigninStatus = (isSignedIn:boolean) => {
  if (isSignedIn) {
    // Set the signed in user
    setSignedInUser(gapi.auth2.getAuthInstance().currentUser.je.Qt);
    setIsLoadingGoogleDriveApi(false);
    // list files if user is authenticated
    listFiles();
  } else {
    // prompt user to sign in
    handleAuthClick();
  }
};  */

  /* const listFiles = (searchTerm = null) => {
  setIsFetchingGoogleDriveFiles(true);
  gapi.client.drive.files
    .list({
      pageSize: 10,
      fields: 'nextPageToken, files(id, name, mimeType, modifiedTime)',
      q: searchTerm,
    })
    .then(function (response) {
      setIsFetchingGoogleDriveFiles(false);
      setListDocumentsVisibility(true);
      const res = JSON.parse(response.body);
      setDocuments(res.files);
    });
}; */

  /* function initClient() {
    gapi.client
      .init({
        apiKey: API_KEY,
        // clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        // scope: SCOPES
      })
      .then(function () {
        return gapi.client.request({
          path:
            'https://people.googleapis.com/v1/people/me?requestMask.includeField=person.names',
        });
      })
      .then(
        function (response: any) {
          console.log(response.result);
        },
        function (reason: any) {
          console.log('Error: ' + reason.result.error.message);
        },
      );
  } */
  // 1. Load the JavaScript client library.
  //gapi.load('client', initClient);

  /* useEffect(() => {
    gapi.load('script', initClient);
  }); */

  return (
    <Carousel>
      <img src={file} width="1209" height="806" />
      <img src={file2} width="1209" height="806" />
      <img src={file3} width="1209" height="806" />
      <img src={file4} width="806" height="1209" />
    </Carousel>
  );
};
