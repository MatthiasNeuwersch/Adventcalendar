"use strict";

import ADV_Memory from "../games/game.memory.js?v=220103_01";
import ADV_Boomshine from "../games/game.boomshine.js?v=220103_01";
import ADV_Guesswhat from "../games/game.guesswhat.js?v=220103_01";

/********************************************************************************
 *     Adventcalendar Windows
 *
 *     Extend by Games as pleased. Games are declared as static members
 *     of the ADV_Window class, since they can be accessed by windows only,
 *     and not directly or elsewhere.
 *
 *     @param:
 *             day:  Provide number of day.
 *                   Matches markup-window and sets it as its own (this.)element.
 *
 *
 *     ShaBy - 2020-11-27
 ********************************************************************************/

const SCREEN = document.getElementById("screen");
const PLAYER = document.getElementById("player");
class ADV_Window{
    static MEMORY = new ADV_Memory();
    static BOOMSHINE = new ADV_Boomshine();
    static GUESSWHAT = new ADV_Guesswhat();

    constructor(day){
        this.today = new Date();
        this.day = day;
        this.opened = false;
        this.element = document.querySelector(".window[data-day='"+day+"']");
        this.element.addEventListener("click", this.click.bind(this));
    }

    click(e){
        e.preventDefault();
        //Hide in Langley:
        // ((this.today.getMonth() != 11 || this.today.getDate() < this.day) ) ? window.Utils.shake(this.element) : this.open();
        this.open();
    }

    open(){
        if(!this.opened){
            this.element.classList.add("opened");
            if (window.Calendar.visitedWindows.indexOf(this.day) == -1) {
                window.Calendar.visitedWindows.push(this.day)
                window.Utils.setCookie("visitedWindows",window.Calendar.visitedWindows.join(),30);
            }
        }
        SCREEN.classList.add("active");
        let todaysContentSource = window.Calendar.content[this.day].src;
        switch(window.Calendar.content[this.day].type){
            case "video":
                this.handleVideo(todaysContentSource);
                break;
            case "image":
                this.handleImage(todaysContentSource);
                break;
            case "game":
                this.play(todaysContentSource);
                break;
            case "audio":
                this.handleAudio(todaysContentSource);
                break;
            default:
                break;
        }
    }

    handleVideo(source){
        SCREEN.classList.add("video");
        PLAYER.innerHTML = "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/"+source+"\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>";0
    }

    handleImage(source){
        SCREEN.classList.add("image");
        PLAYER.style.backgroundImage = "url('"+source+"')";
    }

    /********************************************************************************
     *   Method: handleAudio
     *
     *   Opens the screen, beautifies the player with a given background-image and
     *   plays the audio-file provided in the source. Audio will >>pause<< when
     *   miroslav-close hits a goal. It will resume, once the window is reopened
     *   as long as window.Calendar.mainAudio source did not change meanwhile.
     *
     *  @param:
     *          source: Array consisting of
     *          ["audio"] = soundfile-source and
     *          ["img"] = backgroundimage-source to be shown while audio is playing.
     *
     *******************************************************************************/
    handleAudio(source){
        SCREEN.classList.add("audio");
        SCREEN.classList.add("image");
        PLAYER.style.backgroundImage = "url('"+source.img+"')";
        window.Calendar.mainAudio = source.audio;
        window.Calendar.mainAudio.play();
    }

    play(game){
        switch(game){
            case "boomshine":
                ADV_Window.BOOMSHINE.play();
                break;
            case "guesswhat":
                ADV_Window.GUESSWHAT.play();
                break;
            case "memory":
                ADV_Window.MEMORY.play();
                break;
            default:
                break;
        }
    }

    static declareVisitedWindows(){
        let visitedWindows = window.Utils.getCookie("visitedWindows") == null ? [] : window.Utils.getCookie("visitedWindows").split(",");
        for(const visited of visitedWindows)
            document.querySelector(".day-"+visited).classList.add("opened");
    }

}
export default ADV_Window;
