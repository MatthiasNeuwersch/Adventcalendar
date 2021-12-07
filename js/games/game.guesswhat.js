"use strict";

/********************************************************************************
 *     ADV_Guesswhat
 *
 *     Have n pairs of sounds and images. A click on a sound (left-hand side)
 *     plays the sound and starts a quest. While the quest is open, it is
 *     highlighted, and the help-button is activated.
 *     After clicking an option (right-hand side), ADV_Guesswhat compares the
 *     pair and visualizes, whether or not the pair is a match. After matching
 *     all pairs, users can replay the game.
 *
 *     Additionally: A solved quest clicked again also plays the solution sound.
 *     Just like a click on the helper would.
 *
 *     ShaBy - 2021-12-06
 ********************************************************************************/

class ADV_Guesswhat{
    constructor(){
        window.guesswhat = this;
        this.animals = [];
        this.opened = {
            src: "",
            element: null
        };
        this.match = 0;
        this.guesswhat = document.getElementById("guesswhat");
        this.quests = document.getElementById("gw_quests");
        this.options = document.getElementById("gw_options");
        this.controls = document.getElementById("guesswhat_controls");
        this.restart = document.getElementById("play_guesswhat_again");
        this.restart.addEventListener("click", this.initGuesswhat.bind(this));
        this.helper = document.getElementById("gw_help");
        this.helper.addEventListener("click", this.hint.bind(this));
    }

    play(){
        let self = this;
        window.Model.fetchTemplate("getAnimals")
            .then(function(data){
                if(data.access == "granted"){
                    self.animals = data.animals;
                    self.guesswhat.classList.add("active");
                    self.initGuesswhat();
                } else
                    window.Calendar.askForDwarfonize();
            });
    }

    initGuesswhat(){
        this.quests.innerHTML = "";
        this.options.innerHTML = "";
        this.controls.classList.remove("active");
        this.match = 0;

        this.buildQuests();
        this.buildOptions();
    }

    startQuest(){
        if(this.classList.contains("solved")){
            new Audio("https://advent.neuwersch.eu/audio/guesswhat/q_"+this.getAttribute("data-bg")+".mp3").play();
        } else{
            document.getElementById("gw_help").classList.add("active");
            if(window.guesswhat.opened.src.length)
                window.guesswhat.opened.element.classList.remove("opened");
            this.classList.add("opened");
            new Audio("https://advent.neuwersch.eu/audio/guesswhat/"+this.getAttribute("data-bg")+".mp3").play();
            window.guesswhat.opened.src = this.getAttribute("data-bg");
            window.guesswhat.opened.element = this;
        }
    }

    chooseOption(){
        document.getElementById("gw_help").classList.remove("active");
        if(this.classList.contains("solved") || this.classList.contains("opened") || !window.guesswhat.opened.src.length ){
            window.Utils.shake(this);
            return;
        }
        this.classList.add("opened");
        let self = this;
        if(window.guesswhat.opened.src.length){
            if(self.getAttribute("data-bg") == window.guesswhat.opened.src){
                self.classList.add("solved");
                window.guesswhat.opened.element.classList.add("solved");
                window.guesswhat.match++;
                if(window.guesswhat.match == window.guesswhat.animals.length)
                    window.guesswhat.endGuesswhat();
            } else{
                window.Utils.shake(self);
                window.Utils.shake( window.guesswhat.opened.element);
                self.classList.remove("opened");
                window.guesswhat.opened.element.classList.remove("opened");
            }
            window.guesswhat.opened = {src: "", element: null};
        }
    }

    endGuesswhat(){
        this.controls.classList.add("active");
    }

    buildQuests(){
        let animals = window.Utils.shuffle(this.animals);
        for(let i = 0; i < animals.length; i++){
            let quest = document.createElement("div");
            quest.classList.add("gw_quest");
            quest.classList.add("guesswhat_card");

            quest.appendChild(this.buildCard(animals, i));
            quest.setAttribute("data-bg", animals[i]);
            this.quests.appendChild(quest);

            let questCards = document.getElementsByClassName("gw_quest");
            for(const questCard of questCards)
                questCard.addEventListener("click", this.startQuest);
        }
    }

    buildOptions(){
        let animals = window.Utils.shuffle(this.animals);
        for(let i = 0; i < animals.length; i++){
            let option = document.createElement("div");
            option.classList.add("gw_option");

            option.appendChild(this.buildCard(animals, i));
            option.setAttribute("data-bg", animals[i]);
            this.options.appendChild(option);

            let optionCards = document.getElementsByClassName("gw_option");
            for(const optionCard of optionCards)
                optionCard.addEventListener("click", this.chooseOption);
        }
    }

    buildCard(animals, i){
        let cardInner = document.createElement("div");
        cardInner.classList.add("card_inner");

        let cardFront = document.createElement("div");
        cardFront.classList.add("card_front");
        cardInner.appendChild(cardFront);

        let cardBack = document.createElement("div");
        cardBack.classList.add("card_back");
        cardBack.style.backgroundImage = "url('img/guesswhat/"+animals[i]+".png')";
        cardInner.appendChild(cardBack);
        return cardInner;
    }

    hint(){
        if(this.opened.src.length)
            new Audio("https://advent.neuwersch.eu/audio/guesswhat/q_"+this.opened.element.getAttribute("data-bg")+".mp3").play();
    }


}
export default ADV_Guesswhat;