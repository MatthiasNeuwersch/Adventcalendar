"use strict";

import ADV_Window from "./class.window.js?v=211209";

/********************************************************************************
 *     ADV_Calendar
 *
 *     Masterclass for this PWA. Handles authorization and keeps track of
 *     already visited ADV_Windows. And of course, Miroslav lives here :}.
 *
 *     @imports:
 *          ADV_Window:   ADV_Calendar provides 24 ADV_Window-Objects, as soon
 *                        as user is granted access.
 *
 *     ShaBy - 2020-11-27
 ********************************************************************************/

class ADV_Calendar{
    constructor(){
        this.windows = [];
        this.content = [];
        this.mainAudio = undefined;
        this.init();
        this.visitedWindows = window.Utils.getCookie("visitedWindows") == null ? [] : window.Utils.getCookie("visitedWindows").split(",");
        window.Utils.getCookie("dwarfonize") == null ? this.askForDwarfonize() : this.fetchContent();
    }

    init(){
        this.initDwarfme();
        this.initMiroslav();
    }

    initDwarfme() {
        let self = this;
        let dwarfme = document.getElementById("dwarfme");
        dwarfme.addEventListener("click", function () {
            window.Utils.setCookie("dwarfonize", document.getElementById("phone").value, 30);
            document.getElementById("dwarfonize").className = "";
            self.fetchContent();
        });
    }

    initMiroslav(){
        let self = this;
        document.getElementById("miroslav-close").addEventListener("click", function(){
            let player = document.getElementById("player");
            let miroslavables = document.querySelectorAll(".miroslavable");
            player.innerHTML = "";
            player.style.backgroundImage = "url('')";
            for(const miroslavable of miroslavables)
                miroslavable.className="miroslavable";
            self.mainAudio.pause();
        });
    }

    fetchContent(){
        let self = this;
        window.Model.fetchTemplate("getContent")
            .then(function(data){
                if(data.access == "granted"){
                    self.content = data.content;
                    for(const node of document.querySelectorAll(".audio"))
                        self.content[node.dataset.day].src.audio = new Audio(self.content[node.dataset.day].src.audio)
                    self.render();
                } else
                    self.askForDwarfonize();
            });
    }

    render() {
        for (let i = 1; i <= 24; i++)
            this.windows[i] = new ADV_Window(i);
        ADV_Window.declareVisitedWindows();
    }

    askForDwarfonize(){
        document.getElementById("phone").value = window.Utils.getCookie("dwarfonize");
        document.getElementById("dwarfonize").classList.add("active");
    }

}
export default ADV_Calendar;