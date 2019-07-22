function getParameterByName(name) {
  var name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
  var results = regex.exec(location.search);

  return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function setCookie(name, value, options) {
  options = options || {};

  var expires = options.expires;

  if (typeof expires == "number" && expires) {
    var d = new Date();
    d.setTime(d.getTime() + expires * 1000);
    expires = options.expires = d;
  }
  if (expires && expires.toUTCString) {
    options.expires = expires.toUTCString();
  }

  value = encodeURIComponent(value);

  var updatedCookie = name + "=" + value;

  for (var propName in options) {
    updatedCookie += "; " + propName;
    var propValue = options[propName];
    if (propValue !== true) {
      updatedCookie += "=" + propValue;
    }
  }

  document.cookie = updatedCookie;
}

(function utmToCookie() {
  var utmNameList = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];

  utmNameList.forEach(function(name) {
    var value = getParameterByName(name);
    var dayExpires = (function() {
      var date = new Date;

      date.setDate(date.getDate() + 1);

      return date.toUTCString()
    })()

    if (value) {
      setCookie(
        name,
        value,
        {
          expires: dayExpires,
          path: '/'
        }
      )
    }
  })
})()
