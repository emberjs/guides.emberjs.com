$.ajax("/versions.json").done(function(n){var o=$(".version-select");o.select2({data:n});var a=window.location.href.split("/"),e=a[3];o.val(e).change(),o.on("change",function(){var n=this.value;window.location=window.location.href.replace(e,n)})});