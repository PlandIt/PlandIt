// Helper functions
var $ = function(id) { return document.getElementById(id); };
var pad = function(n) { return String(n).padStart(2, '0'); };
var toKey = function(d) { 
    return d.getFullYear() + '-' + pad(d.getMonth()+1) + '-' + pad(d.getDate()); 
};
var getStore = function(k, f) { 
    return JSON.parse(localStorage.getItem(k) || JSON.stringify(f)); 
};

var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
             'August', 'September', 'October', 'November', 'December'];
var DOW = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function renderHomeCalendar() {
    const today = new Date();
    const events = getStore('plandit_events_v2', []);
    const calendarPreview = $('calendar-preview');
    
    calendarPreview.innerHTML = '';
    
    var header = document.createElement('div');
    header.className = 'calendar-header';
    header.textContent = MONTHS[today.getMonth()] + ' ' + today.getFullYear();
    calendarPreview.appendChild(header);
    
    var dowRow = document.createElement('div');
    dowRow.className = 'calendar-dow';
    for (var i = 0; i < DOW.length; i++) {
        var dayElem = document.createElement('div');
        dayElem.textContent = DOW[i];
        dowRow.appendChild(dayElem);
    }
    calendarPreview.appendChild(dowRow);
    
    var grid = document.createElement('div');
    grid.className = 'calendar-grid';
    
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    
    for (var i = 0; i < firstDay.getDay(); i++) {
        grid.appendChild(document.createElement('div'));
    }
    
    for (var day = 1; day <= lastDay.getDate(); day++) {
        var cell = document.createElement('div');
        cell.className = 'calendar-day';
        cell.textContent = day;
        
        var cellDate = new Date(today.getFullYear(), today.getMonth(), day);
        var cellKey = toKey(cellDate);
        
        if (day === today.getDate()) {
            cell.classList.add('today');
        }
        
        var dayEvents = events.filter(function(e) { 
            return e.date === cellKey; 
        });
        
        if (dayEvents.length > 0) {
            var indicator = document.createElement('span');
            indicator.className = 'event-indicator';
            indicator.textContent = dayEvents.length;
            cell.appendChild(indicator);
        }
        
        grid.appendChild(cell);
    }
    
    calendarPreview.appendChild(grid);
    
    var viewFullBtn = document.createElement('a');
    viewFullBtn.href = 'calendar.html';
    viewFullBtn.className = 'view-full-calendar';
    viewFullBtn.textContent = 'View Full Calendar';
    calendarPreview.appendChild(viewFullBtn);
}

window.onload = renderHomeCalendar;
