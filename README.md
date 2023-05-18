# ETABIBO

On the 3Verse marketplace platform, the user can search for and purchase NFTs, such as fused and unfused NFTs, customizations, skins, and other items that can be used in the 3Verse game platform. Users have a variety of purchasing options, including fixed pricing and auction, and they can buy or rent it through the portal. The portal provides a variety of filtering and sorting options for exploring the readily available NFT collections. It also displays some restricted Opensea collections and provides a link to the Opensea platform. The platform allows users to view their personal collections, collections listed for sale or rent, collections they like, and so on.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
**Note: It has sourcemap in it!**

### `npm run build-no-sourcemap`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
**Note: It do not include sourcemap in it!**

### `build:developement`

Builds the app for development to the `build` folder.\
It correctly bundles React in development mode.

The build is minified and the filenames include the hashes.\
App is ready to be deployed on development server!
Accept .env.development file enviornment varibles.

### `build:staging`

Builds the app for development to the `build` folder.\
It correctly bundles React in development mode (stable code).

The build is minified and the filenames include the hashes.\
App is ready to be deployed on staging server!
Accept .env.staging file enviornment varibles.

### `build:production`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
App is ready to be deployed on production server!
Accept .env.production file enviornment varibles.

### `Analyze build`

**STEP_1 :-**

- Run `npm run build:stats`
- It will create production build with webpack config in it.

**STEP_2 :-**

- Run `npm run analyze:webpack`
- It will open webpack analyzer on `http://127.0.0.1:8888`.

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`REACT_APP_ENV_STATUS`

`REACT_APP_IMAGE_UPLOAD_LIMIT`

`REACT_APP_END_POINT_URL`

`REACT_APP_WEBSITE_URL`

`REACT_APP_S3_BUCKET_URL`

**NOTE:- Depending on server on which you are deploying .env filename will change**
