import { template } from "./template.js";
import { getFromLocalStorage, saveToLocalStorage } from "./localStorage.js";
import { STORAGE_KEY, START_HOUR, END_HOUR } from "./config.js";

$(function () {
  startClock();
  const data = getFromLocalStorage(STORAGE_KEY) || {};
  render(data);

  function render(data) {
    for (let hour = START_HOUR; hour <= END_HOUR; hour++) {
      const hr_12 = hour % 12 || 12; // if 0 fallback to 12

      const id = `hour-${hour}`;
      const title = `${hr_12} ${hour < 12 ? "AM" : "PM"}`;
      const text = data[id];

      const timeBlock = $(template());

      // add data
      timeBlock.attr("id", id);
      timeBlock.children("div.hour").text(title);
      timeBlock.children("textarea.description").val(text);

      // add to document
      $("body").append(timeBlock);
    }
    addStyles();
    addListeners(data);
  }

  // setup interval to update time on page
  // updates every second
  function startClock() {
    const clockEl = $("#current-day");
    (function _update() {
      const time = dayjs().format("dddd, MMMM D, YYYY hh:mm:ss A");
      clockEl.text(time);
      setTimeout(_update, 1000);
    })();
  }

  // setup interval to apply past/present/future classes to time blocks
  // updates styles every minute
  function addStyles() {
    (function _update() {
      const currentHour = dayjs().hour();

      $(".time-block").each(function () {
        const timeBlock = $(this);
        const id = timeBlock.attr("id");
        const hour = parseInt(id.split("-")[1]);

        timeBlock.removeClass("past present future");
        if (currentHour < hour) {
          timeBlock.addClass("future");
        } else if (currentHour > hour) {
          timeBlock.addClass("past");
        } else {
          timeBlock.addClass("present");
        }
      });

      setTimeout(_update, 60000);
    })();
  }

  function addListeners(data) {
    $(".save-btn").on("click", handleSave(data));
  }

  function handleSave(data) {
    return function () {
      const btn = $(this);
      const key = btn.parent().attr("id");
      const val = btn.siblings("textarea.description").val();
      data[key] = val;
      saveToLocalStorage(STORAGE_KEY, data);
    };
  }
});
