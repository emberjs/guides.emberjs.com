window.GUIDE_VERSIONS = {
    current: null,
    latest: null,
    available: [],

    onReady: function(callback) {
        if (this._ready) {
            callback(this);
        } else {
            this._callbacks.push(callback);
        }
    },

    urlFor: function(version) {
        return window.location.href.replace(this.current, version);
    },

    _callbacks: [],

    _setData: function(available) {
        function parseVersion(version) {
            var match = version.match(/^v(\d+)\.(\d+)\.(\d+)$/);
            if (match) {
                return {
                    major: match[1],
                    minor: match[2],
                    patch: match[3]
                };
            }
        }

        function compareVersions(a, b) {
            a = parseVersion(a);
            b = parseVersion(b);

            if (a.major !== b.major) { return a.major - b.major; }
            if (a.minor !== b.minor) { return a.minor - b.minor; }
            return a.patch - b.patch;
        }

        // Sort versions and make latest appear first
        this.available = available.sort(compareVersions).reverse();

        // @TODO: have to work through how this gets populated when we're using a global js include on an older version of Ember
        this.current = 'CURRENT_REVISION_WILL_APPEAR_HERE_WHEN_DEPLOYED';
        this.latest = this.available[0];
        this._ready = true;

        var self = this;
        $.each(this._callbacks, function(idx, callback) {
            callback(self);
        });
    }
};

$.ajax('/versions.json')
    .done(function(data) {
        window.GUIDE_VERSIONS._setData(data);
    });

window.GUIDE_VERSIONS.onReady(function(e){var n=$(".version-select");n.select2({data:e.available});var a=e.current;n.val(a).change(),n.on("change",function(){var n=this.value;window.location=e.urlFor(n)});var i=$('pre:contains("install -g ember-cli")');if("C"!==a.slice(0,1)){var l=e.current.slice(1).split(".").slice(0,2).join(".");i.text("npm install -g ember-cli@"+l)}}),function(){var t=document.createElement("script");t.type="text/javascript",t.async=!0,t.src="//cdn.jsdelivr.net/docsearch.js/1/docsearch.min.js";var e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(t,e)}(),window.GUIDE_VERSIONS.onReady(function(t){var e=t.current,n="70c6f2593b56f14e561a361d1b787a1e",r="#search-input",i="emberjs",o=10,s="(tags:"+e+",tags:api)";$(window).load(function(){docsearch({apiKey:n,indexName:i,inputSelector:r,algoliaOptions:{hitsPerPage:o,facetFilters:s}})})}),

window.GUIDE_VERSIONS.onReady(function(r){if(-1!==$.inArray(r.current,r.available)&&r.current!==r.available[0]){var e=r.urlFor(r.latest),a=['<div class="old-version-warning">','<i class="icon-attention-circled"></i>',"<strong>Old Guides - </strong>","You are viewing the guides for Ember "+r.current+".",'<a href="'+e+'" class="btn">',"VIEW "+r.latest,"</a>","</div>"].join("");$(".chapter").prepend(a)}});

// @TODO: do we have to pull this in as well due to the use of window.GUIDE_VERSIONS, which won't have been defined in our common-modern setup which gets called before this?
$(function(){$(".toc-level-0 .toc-level-0 > a").click(function(){return $(this).parent().find("> ol").slideToggle(200),!1}),$('label[for="toc-toggle"]').click(function(){$(".toc-container").slideToggle(500)}),$(function(){$(".anchorable-toc").each(function(){var t=$(this),e=t.attr("id"),n="#"+e,r='<a class="toc-anchor" href="'+n+'"></a>';t.prepend(r)})})}),window.GUIDE_VERSIONS.onReady(function(t){var e=$(".version-select");e.select2({data:t.available});var n=t.current;e.val(n).change(),e.on("change",function(){var e=this.value;window.location=t.urlFor(e)})});