# READ-ONLY READ-ONLY READ-ONLY

This repo is a READ-ONLY repo. It contains the built output of the content
from https://github.com/emberjs/guides. If you would like to make corrections
or additions to a guide, please open a pull request at
https://github.com/emberjs/guides.

## Publishing
### General Contributors

### Release Team
These instructions are for publishing a new version of the site at http://guides.emberjs.com.

You should already have followed the directions at https://github.com/emberjs/guides for building
a new version of the guides and have moved the output of this process into `./snapshots`

This section is intended for members of the Ember.js release team or those contributors wishing to augment or
change or publication process. If you want to publish your own version of the guides, see ### General Contributors
above.

### Github
When ready for a new release, make sure your latest content is pushed to https://github.com/emberjs/guides and tagged with a verison number:

```
git tag <revision number>
git push --tags
```

For `<revision number>` we use the following format `v<major version>.<minor version>.<patch>`, so
`v1.10.0` is correct but `1.9.1` is not.

### Site
The site can be published via the Divshot cli:

```shell
divshot push
```

Verify that the content looks good at:

http://development.ember-guides.divshot.io/<revision number>

If there are no obvious defects, promote the assets in the development environment to production


```shell
divshot promote development production
```

### Search
Publish the searchable content of the revison you are publshing:

```shell
node tasks/publish-search --revision <revision number>
                  --environment <staging|production>
                  --api-key <API_KEY>
                  --engine <engine name>
# e.g.
node tasks/publish-search --revision v1.1.1 --environment staging --api-key SUPERSECRETBROCOMMON --engine ember
```

### Versions

To update the list of versions run the following:

```shell
node tasks/update-versions.js
```
