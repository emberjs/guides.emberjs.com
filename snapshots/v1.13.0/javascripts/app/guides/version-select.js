var currentRevision="v1.13.0";$.ajax("/versions.json").done(function(n){var e=$(".version-select");e.select2({data:n}),e.select2("val",currentRevision),e.on("change",function(){var n=this.value;window.location="/"+n+"/"})});