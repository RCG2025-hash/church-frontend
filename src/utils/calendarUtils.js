export const addToCalendar = (event) => {
  const { title, date, time, location, description } = event;
  
  // Format date for calendar (YYYYMMDDTHHmmss)
  const formatDate = (dateString, timeString) => {
    const dateObj = new Date(dateString);
    if (timeString) {
      const [time, modifier] = timeString.split(' ');
      let [hours, minutes] = time.split(':');
      
      if (modifier === 'PM' && hours !== '12') {
        hours = parseInt(hours, 10) + 12;
      }
      if (modifier === 'AM' && hours === '12') {
        hours = '00';
      }
      
      dateObj.setHours(parseInt(hours, 10), parseInt(minutes, 10) || 0);
    }
    
    return dateObj.toISOString().replace(/-|:|\.\d+/g, '');
  };

  // Create calendar event in ICS format
  const createICS = () => {
    const start = formatDate(date, time);
    const end = formatDate(date, time); // You can adjust end time if needed
    
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'BEGIN:VEVENT',
      `DTSTART:${start}`,
      `DTEND:${end}`,
      `SUMMARY:${title}`,
      `LOCATION:${location}`,
      `DESCRIPTION:${description}`,
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\n');
    
    return encodeURI(`data:text/calendar;charset=utf-8,${icsContent}`);
  };

  // Create Google Calendar URL
  const createGoogleCalendarURL = () => {
    const startTime = formatDate(date, time);
    const endTime = formatDate(date, time); // Adjust end time as needed
    
    const params = new URLSearchParams({
      action: 'TEMPLATE',
      text: title,
      dates: `${startTime}/${endTime}`,
      details: description,
      location: location
    });
    
    return `https://calendar.google.com/calendar/render?${params}`;
  };

  // Create download link for ICS file
  const downloadICS = () => {
    const link = document.createElement('a');
    link.href = createICS();
    link.download = `${title.replace(/\s+/g, '_')}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return {
    downloadICS,
    googleCalendarURL: createGoogleCalendarURL()
  };
};