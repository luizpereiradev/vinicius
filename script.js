function download(data, filename, type) {
  const file = new Blob([data], { type: type });

  if (window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveOrOpenBlob(file, filename);
    return;
  }

  const a = document.createElement("a");
  const url = URL.createObjectURL(file);

  a.href = url;
  a.download = filename;

  document.body.appendChild(a);

  a.click();

  setTimeout(function () {
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }, 0);
}

function detectar_mobile() {
  var check = false;
  (function (a) {
    if (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
        a.substr(0, 4)
      )
    )
      check = true;
  })(navigator.userAgent || navigator.vendor || window.opera);
  return check;
}

const path = window.location.href;

// Extract event details from the pathname
const [, , loc, description, summary] = path.split("#/");

console.log("location", decodeURIComponent(loc));
console.log("description", decodeURIComponent(description));
console.log("summary", decodeURIComponent(summary));

download(
`
BEGIN:VCALENDAR
VERSION:1.0
BEGIN:VEVENT
DTSTART:20230622T180000
DTEND:20230622T230000
LOCATION:${decodeURIComponent(loc)}
DESCRIPTION:${decodeURIComponent(description)}
SUMMARY:${decodeURIComponent(summary)}
PRIORITY:3
END:VEVENT
BEGIN:VALARM
ACTION:DISPLAY
TRIGGER;VALUE=DURATION:-PT20M
END:VALARM
END:VCALENDAR
`,
"event.ics",
"text/calendar"
);
