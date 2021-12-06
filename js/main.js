"use strict";

/********************************************************************************
 *     Adventcalendar
 *
 *     Have a good day Sir!
 *     Please see your map for navigation:
 *
 *     @imports:
 *          Utils:        A collection of several useful methods, used throughout
 *                        the calendar.
 *          ADV_Model:    Managing the API-Communication (there is no API).
 *          ADV_Calendar: Action starts here.
 *
 *     ShaBy - 2020-11-27
 ********************************************************************************/

if('serviceWorker' in navigator) {
    navigator.serviceWorker.register('serviceworker.js?')
        .then(function() {
            console.log('Service Worker Registered');
        });
}

import Shaby_Utils from "./classes/class.utils.js";
import ADV_Model from "./classes/class.model.js";
import ADV_Calendar from "./classes/class.calendar.js";

window.Utils = new Shaby_Utils();
window.Model = new ADV_Model();
window.Calendar = new ADV_Calendar();