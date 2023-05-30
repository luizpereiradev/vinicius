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

// Extract event details from the pathname
const [, , loc, description, summary, dtstart, dtend] = path.split("#/");

console.log("location", decodeURIComponent(loc));
console.log("description", decodeURIComponent(description));
console.log("summary", decodeURIComponent(summary));
console.log("dtstart", decodeURIComponent(dtstart));
console.log("dtend", decodeURIComponent(dtend));

if (md.is('iPhone')) {
  const encodedSummary = encodeURIComponent(summary);
  const encodedLocation = encodeURIComponent(loc);
  const encodedDescription = encodeURIComponent(description);
  const encodedDTStart = encodeURIComponent(dtstart);
  const encodedDTEnd = encodeURIComponent(dtend);

  const link = `data:text/calendar;charset=utf-8,BEGIN:VCALENDAR%0AVERSION:2.0%0ABEGIN:VEVENT%0ADTSTART:${encodedDTStart}%0ADTEND:${encodedDTEnd}%0ASUMMARY:${encodedSummary}%0ADESCRIPTION:${encodedDescription}%0ALOCATION:${encodedLocation}%0AEND:VEVENT%0AEND:VCALENDAR`;
  
  window.location.href = link;
} else {
  window.location.href = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${decodeURIComponent(summary)}&dates=${decodeURIComponent(dtstart)}/${decodeURIComponent(dtend)}&details=${decodeURIComponent(description)}&location=${decodeURIComponent(loc)}&sf=true&output=xml`;
}
