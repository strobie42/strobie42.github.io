// @ts-check
"use strict";

/** @type {Element[]} */
var sites = [];

// copy initial element references, as collection gets dynamically updated
var elements = document.getElementsByClassName("l2");
for (let i = 0; i < elements.length; i++) {
  sites.push(elements[i]);
}

/**
 * @param {number} day
 * @param {number} hour
 */
function segmentNow() {
  let d = new Date();
  let day = d.getDay(), hour = d.getHours();
  // hard-coding (for now) these time periods:
  // 10:00pm - 03:59am : night
  // 04:00am - 10:59am : breakfast
  // 11:00am - 03:59pm : lunch
  // 04:00pm - 09:59pm : dinner
  if (hour > 21) return day * 4 + 3;
  if (hour > 15) return day * 4 + 2;
  if (hour > 10) return day * 4 + 1;
  if (hour >  3) return day * 4;
  return (day * 4 + 27) % 28;		// previous night
}

let current = segmentNow();

/**
 * @param {number} curr
 */
function mapLabel(curr) {
  // determine label position (side and index)
  return (1 - (curr & 1)) * 14 + (curr >> 1);
}

/**
 * @param {number} inc
 */
function showSite(inc) {
  if (inc != 0) {
    sites[mapLabel(current)].className = "l2"; // remove old highlight
    current = (current + inc + 28) % 28;
  }
  sites[mapLabel(current)].className = "current";
}

showSite(0);

document.addEventListener(
  "visibilitychange", 
  function(ev) {
    if (document.visibilityState != "hidden") {
      showSite(current - segmentNow());
    }
  },
  false
);