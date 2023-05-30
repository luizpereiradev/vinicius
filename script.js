function copyToClipboard(text) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.setAttribute('readonly', '');
  textarea.style.position = 'absolute';
  textarea.style.left = '-9999px';
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
}

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
  const fileContent = `BEGIN:VCALENDAR
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
    END:VCALENDAR`;

  copyToClipboard(fileContent);
  alert('O conteúdo do arquivo .ics foi copiado para a área de transferência. Por favor, cole-o em seu aplicativo de calendário.');

} else {
  window.location.href = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${decodeURIComponent(summary)}&dates=${decodeURIComponent(dtstart)}/${decodeURIComponent(dtend)}&details=${decodeURIComponent(description)}&location=${decodeURIComponent(loc)}&sf=true&output=xml`;
}
