const APP_KEY = 'day-planner';

$(main);

function main() {
  const data = getFromLocalStorage(APP_KEY) || {};
  $('.saveBtn').on('click', handleSave(data));
  initText(data);
  initStyles();
  initTime();
}

function handleSave(data) {
  return function () {
    const btn = $(this);
    const key = btn.parent().attr('id');
    const val = btn.siblings('textarea.description').val();
    data[key] = val;
    saveToLocalStorage(APP_KEY, data);
  };
}

// update test boxes with data from local storage
function initText(data) {
  $('.time-block').each(function () {
    const timeBlock = $(this);
    const id = timeBlock.attr('id');
    timeBlock.children('textarea.description').val(data[id]);
  });
}

// setup interval to apply past/present/future classes to time blocks
// updates styles every minute
function initStyles() {
  (function _update() {
    const currentHour = dayjs().hour();

    $('.time-block').each(function () {
      const timeBlock = $(this);
      const id = timeBlock.attr('id');
      const hour = parseInt(id.split('-')[1]);

      timeBlock.removeClass('past present future');
      if (currentHour < hour) {
        timeBlock.addClass('future');
      } else if (currentHour > hour) {
        timeBlock.addClass('past');
      } else {
        timeBlock.addClass('present');
      }
    });

    setTimeout(_update, 60000);
  })();
}

// setup interval to update date & time in header
function initTime() {
  (function _update() {
    const time = dayjs().format('dddd, MMMM D, YYYY h:mm:ss A');
    $('#current-day').text(time);
    setTimeout(_update, 1000);
  })();
}

// local storage helpers

function getFromLocalStorage(key) {
  const data = localStorage.getItem(key);
  return JSON.parse(data);
}

function saveToLocalStorage(key, value) {
  const json = JSON.stringify(value);
  localStorage.setItem(key, json);
}
