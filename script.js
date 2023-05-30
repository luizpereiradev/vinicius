function download(data) {
  const file = new Blob([data], { type: 'text/calendar;charset=utf-8' });

  const a = document.createElement("a");
  const url = URL.createObjectURL(file);

  a.href = url;
  a.target = '_blank';
  a.rel = 'noopener noreferrer'; // Para segurança
  a.download = "reserva-unidas.ics";

  document.body.appendChild(a);

  a.click();

  setTimeout(function () {
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }, 0);
}

function mobileCheck() {
  let check = false;
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
const [, , loc, description, summary, dtstart, dtend] = path.split("#/");

https://luizpereiradev.github.io/vinicius/#/event#/LOCAL#/DESCRIÇÂO#/SUMARIO#/DTSTART#/DTEND

console.log("location", decodeURIComponent(loc));
console.log("description", decodeURIComponent(description));
console.log("summary", decodeURIComponent(summary));
console.log("dtstart", decodeURIComponent(dtstart));
console.log("dtend", decodeURIComponent(dtend));


download(
`BEGIN:VCALENDAR
VERSION:1.0
BEGIN:VEVENT
DTSTART:${decodeURIComponent(dtstart)}
DTEND:${decodeURIComponent(dtend)}
LOCATION:${decodeURIComponent(loc)}
DESCRIPTION:${decodeURIComponent(description)}
SUMMARY:${decodeURIComponent(summary)}
PRIORITY:3
END:VEVENT
BEGIN:VALARM
ACTION:DISPLAY
TRIGGER;VALUE=DURATION:-PT20M
END:VALARM
END:VCALENDAR`
)

// }else{
//     window.location.href = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${decodeURIComponent(summary)}&dates=${decodeURIComponent(dtstart)}/${decodeURIComponent(dtend)}&details=${decodeURIComponent(description)}&location=${decodeURIComponent(loc)}&sf=true&output=xml`
// }