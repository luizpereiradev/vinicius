const md = new MobileDetect(window.navigator.userAgent);

console.log(md);
console.log(md.mobile());          // 'Sony'
console.log(md.phone());           // 'Sony'
console.log(md.tablet());          // null
console.log(md.userAgent());       // 'Safari'
console.log(md.os());              // 'AndroidOS'
console.log(md.is('iPhone'));      // false
console.log(md.is('bot'));         // false
console.log(md.version('Webkit'));         // 534.3
console.log(md.versionStr('Build'));       // '4.1.A.0.562'
console.log(md.match('playstation|xbox')); // false

const path = window.location.href;

const [, , loc, description, summary, dtstart, dtend] = path.split("#/");

// https://vincoelho.github.io/calendar-event/#/event#/ROD%20MG%2010%20KM%2039%20-%20-%20AEROPORTO%20INT.%20TANCREDO%20NEVES%20-%20CONFIS%20-%20MG#/-%20Retirada:%2017/03/2023%20às%2018:39%0A-%20Devolução:%2018/03/2023%20às%2010:00#/Reserva%20Veículo%20-%20Unidas#/20230622T230000#/20230623T230000

console.log("location", decodeURIComponent(loc));
console.log("description", decodeURIComponent(description));
console.log("summary", decodeURIComponent(summary));
console.log("dtstart", decodeURIComponent(dtstart));
console.log("dtend", decodeURIComponent(dtend));

const encodedSummary = encodeURIComponent(summary);
const encodedLocation = encodeURIComponent(loc);
const encodedDescription = encodeURIComponent(description);
const encodedDTStart = encodeURIComponent(dtstart);
const encodedDTEnd = encodeURIComponent(dtend);

if (md.is('iPhone')) {
  const link = `data:text/calendar;charset=utf-8,BEGIN:VCALENDAR
VERSION:2.0
X-WR-CALNAME:Reserva Veículo
BEGIN:VEVENT
DTSTART:${encodedDTStart}
DTEND:${encodedDTEnd}
LOCATION:${encodedLocation}
SUMMARY:Reserva Veículo Unidas
DESCRIPTION:${encodedDescription}
PRIORITY:3
METHOD:REQUEST
X-APPLE-STRUCTURED-LOCATION;VALUE=URI;X-APPLE-MAPKIT-HANDLE=ABUID:1234567890:placemark:abc123:0:0:0:0:0:0:0.0:0.0:0:ROD MG 10 KM 39 - 0 - AEROPORTO INT. TANCREDO N - CONFINS - MG
END:VEVENT
BEGIN:VALARM
ACTION:DISPLAY
TRIGGER;VALUE=DURATION:-PT20M
DESCRIPTION: Reserva Veículo - Unidas Aluguel de Carros
END:VALARM
END:VCALENDAR`;
  
  window.location.href = link;
} else if (md.mobile()) {
  window.location.href = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${decodeURIComponent(summary)}&dates=${decodeURIComponent(dtstart)}/${decodeURIComponent(dtend)}&details=${decodeURIComponent(description)}&location=${decodeURIComponent(loc)}&sf=true&output=xml`;
}
else {
  const link = `data:text/calendar;charset=utf-8,BEGIN:VCALENDAR%0AVERSION:2.0%0ABEGIN:VEVENT%0ADTSTART:${encodedDTStart}%0ADTEND:${encodedDTEnd}%0ASUMMARY:${encodedSummary}%0ADESCRIPTION:${encodedDescription}%0ALOCATION:${encodedLocation}%0AEND:VEVENT%0AEND:VCALENDAR`;

  window.location.href = link;
}
