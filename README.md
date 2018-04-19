# READ-ONLY READ-ONLY READ-ONLY

This repo is a READ-ONLY repo used for deploying the Guides. 
It contains the built output of the content
from https://github.com/emberjs/guides. If you would like to make corrections
or additions to a guide, please open a pull request at
https://github.com/emberjs/guides.

## Publishing

These instructions are for publishing a new version of the site at http://guides.emberjs.com. This section is intended for members of the Ember.js release team.

For `<version number>` we use the following format `v<major version>.<minor version>.<patch>`, so
`v1.10.0` is correct but `1.9.1` is not.

### Automatic publishing (recommended)

Ensure your `guides` repo is a sibling directory with this repo (`guides.emberjs.com`)

Run the release script with the new version number (v2.17.0 in our example).
This will build the app for deployment.

```shell
VERSION=<version number> sh release.sh
```

Check the diff against master to make sure that 
`snapshot/_redirects` and `snapshots/version.json`
reflect the new version number.

Push the changes, and Netlify will deploy the update.

```
git push
```

### Continuous Deploy Setup

Our main repo (https://github.com/emberjs/guides) is setup to auto-deploy to Netlify on every commit to `master` (as seen at https://github.com/emberjs/guides/blob/master/.travis/continuous-delivery.sh#L42). This uses a Netlify access token tied to the `ember-guides-deploy-bot` user account.  If you need to generate a new Netlify access token (which requires Github access to that account), please contact @wifelette, @locks or @acorncom for the credentials.

### Manual Deploy Setup

Publishing this repo manually isn't needed at this point, as it's handled by our main `emberjs/guides` repo.

The site is hosted on Netlify. If you don't have `netlify-cli` installed, do so with `npm install netlify-cli -g`.

If there are no obvious defects, you're ready to publish the site content:

```shell
netlify deploy -s ca5334ce-40e8-4c25-a26a-0d1e36e609c2 -p . -t $NETLIFY_ACCESS_TOKEN
```
