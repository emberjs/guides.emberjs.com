# READ-ONLY READ-ONLY READ-ONLY

This repo is a READ-ONLY repo. It contains the built output of the content
from https://github.com/emberjs/guides. If you would like to make corrections
or additions to a guide, please open a pull request at
https://github.com/emberjs/guides.

## Publishing

These instructions are for publishing a new version of the site at http://guides.emberjs.com. This section is intended for members of the Ember.js release team.

To avoid repetitive typing, set the version number as an environmental variable:

```shell
VERSION=<version number>
```

_NOTE: Historically, this version number was the new one (i.e. a new release of 2.4 would have meant building 2.4
files and putting them here). With our CD process running smoothly, we don't tend to refresh our old version of the guides until release. When doing the below release, we need to do these instructions twice (once for 2.12 and again for 2.13, as the current 2.12 folder will be about 5-6 weeks out of date with the "built-on-the-fly" version of the 2.12 guides)_

For `<version number>` we use the following format `v<major version>.<minor version>.<patch>`, so
`v1.10.0` is correct but `1.9.1` is not.

### Build the guides

In the [main guides repo](https://github.com/emberjs/guides), make a branch with the version number:

```shell
git checkout -b $VERSION
git push
```

Next, build a new snapshot:

```shell
bundle exec middleman build
```

### Update the guides site repo

Move the build to the guides _site_ repo (this repo):

```shell
mv guides/build guides.emberjs.com/snapshots/$VERSION
```

Now, change directories into the guides site repo. Update the list of versions:

```shell
node tasks/update-versions
```

_The above step swaps out some constants that are part of our built files_

Now update the `snapshots/version.json` file to have a new version at the end.  You'll also
need to update `snapshots/_redirects` to redirect to the new current version.

Then commit and push this repo:

```shell
git add --all
git commit -m "Add snapshot for Ember.js revision $VERSION"
git push
```

Once those changes have hit Github, rebuilding the latest Travis build of the `emberjs/guides` repo will re-deploy
guides with the new version.

### Continuous Deploy Setup

Our main repo (https://github.com/emberjs/guides) is setup to auto-deploy to Netlify on every commit to `master` (as seen at https://github.com/emberjs/guides/blob/master/.travis/continuous-delivery.sh#L42). This uses a Netlify access token tied to the `ember-guides-deploy-bot` user account.  If you need to generate a new Netlify access token (which requires Github access to that account), please contact @wifelette, @locks or @acorncom for the credentials.

### Manual Publishing

Publishing this repo manually isn't needed at this point, as it's handled by our main `emberjs/guides` repo.

The site is hosted on Netlify. If you don't have `netlify-cli` installed, do so with `npm install netlify-cli -g`.

If there are no obvious defects, you're ready to publish the site content:

```shell
netlify deploy -s ca5334ce-40e8-4c25-a26a-0d1e36e609c2 -p . -t $NETLIFY_ACCESS_TOKEN
```
