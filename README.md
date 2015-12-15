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
middleman build
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

Publish the searchable content with the new revision:

```shell
node tasks/publish-search --engine ember-guides --environment production --revision $VERSION --api-key $API_KEY
```

Then commit and push this repo:

```shell
git add --all
git commit -m "Add snapshot for Ember.js revision $VERSION"
git push
```

### Publish

The site is hosted on Firebase. If you don't have firebase-tools installed, do so with `npm install firebase-tools -g`.

Publish this repo to the Firebase staging environment:

```shell
firebase deploy -f ember-guides-staging
```

Verify that the content looks good at https://ember-guides-staging.firebaseapp.com/.

If there are no obvious defects, you're ready to publish the site content:

```shell
firebase deploy
```
