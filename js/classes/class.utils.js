"use strict";

/******************************************************
 *  Shaby_Utils
 *
 *  A collection of several useful methods. Enjoy :}
 *
 *  ShaBy, 2019-04-20, v0.1
 ******************************************************/

class Shaby_Utils {
    constructor() {}

    isEmpty(variable) {
        if (Array.isArray(variable))
            return (variable.length == 0);
        else if (typeof variable === "object")
            return (Object.entries(variable).length === 0 && variable.constructor === Object);
        else
            return (typeof variable === "undefined" || variable == null || variable == "");
    };

    //Name = programm ;)
    getIndexOfObjectInArrayByPropertyvalue(array, attr, value) {
        for (let i = 0; i < array.length; i++) {
            if (array[i][attr] === value)
                return i;
        }
        return -1;
    };

    setCookie(name, value, days) {
        let expires;
        if (days) {
            let date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toGMTString();
        } else
            expires = "";
        document.cookie = name + "=" + value + expires + "; path=/";
    };

    getCookie(name) {
        let nameEQ = name + "=",
            ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1, c.length);
            }
            if (c.indexOf(nameEQ) === 0)
                return c.substring(nameEQ.length, c.length);
        }
        return null;
    };

    deleteCookie(name) {
        this.setCookie(name, "", -1);
    };

    getOS() {
        let device = "Unknown Device";
        if (navigator.appVersion.indexOf("Win") != -1) device = "Windows";
        if (navigator.appVersion.indexOf("Mac") != -1) device = "MacOS"; //iPad Pro & iPhone 6 :)
        if (navigator.appVersion.indexOf("Android") != -1) device = "Android";
        if (navigator.appVersion.indexOf("iOS") != -1) device = "iOS";
        return device;
    }

    shuffle(array) {
        let currentIndex = array.length, temporaryValue, randomIndex;
        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    }

    shake(element){
        element.classList.add("shake");
        window.setTimeout(function(){
            element.classList.remove("shake");
        },500);
    }
}

export default Shaby_Utils;