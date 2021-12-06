"use strict";

/********************************************************************************
 *     ADV_Memoir
 *
 *     Decent little Memory with humble animations. Content comes disguised
 *     via some PHP-Resource.
 *
 *
 *     ShaBy - 2020-11-27
 ********************************************************************************/

class ADV_Memory{
    constructor(){
        window.memory = this;
        this.cardbacks = [];
        this.opened = {
            src: "",
            element: null
        };
        this.match = 0;
        this.deck = document.getElementById("deck");
        this.controls = document.getElementById("memory_controls");
        this.memory = document.getElementById("memory");
        this.restart = document.getElementById("play_again");
        this.restart.addEventListener("click", this.initMemory.bind(this));
        this.delay = 1200;
    }

    play() {
        let self = this;
        window.Model.fetchTemplate("getMemoir")
            .then(function(data){
                if(data.access == "granted"){
                    self.cardbacks = data.cardbacks;
                    self.memory.classList.add("active");
                    self.initMemory();
                } else
                    window.Calendar.askForDwarfonize();
            });
    }

    initMemory(){
        let cards = window.Utils.shuffle(this.cardbacks);
        this.deck.innerHTML = "";
        this.controls.classList.remove("active");
        this.match = 0;

        for(let i = 0; i < cards.length; i++){
            let bingo = document.createElement("div");
            bingo.classList.add("memory_card");
            let cardInner = document.createElement("div");
            cardInner.classList.add("card_inner");

            let cardFront = document.createElement("div");
            cardFront.classList.add("card_front");
            cardInner.appendChild(cardFront);

            let cardBack = document.createElement("div");
            cardBack.classList.add("card_back");
            cardBack.style.backgroundImage = "url('"+cards[i]+"')";
            cardInner.appendChild(cardBack);

            cardInner.appendChild(cardFront);
            cardInner.appendChild(cardBack);
            bingo.appendChild(cardInner);

            bingo.setAttribute("data-bg", cards[i]);
            this.deck.appendChild(bingo);
        }
        let cardElements = document.getElementsByClassName("memory_card");
        for(const cardElement of cardElements)
            cardElement.addEventListener("click", this.flipCard);
    }

    flipCard(){
        if(this.classList.contains("solved") || this.classList.contains("opened")){
            window.Utils.shake(this);
            return;
        }
        this.classList.add("opened");
        let self = this;
        window.setTimeout(function(){
            if(window.memory.opened.src.length){
                if(self.getAttribute("data-bg") == window.memory.opened.src){
                    self.classList.add("solved");
                    window.memory.opened.element.classList.add("solved");
                    window.memory.match++;
                    if(window.memory.match == window.memory.cardbacks.length/2)
                        window.memory.endMemory();
                } else{
                    window.Utils.shake(self);
                    window.Utils.shake(window.memory.opened.element);
                    self.classList.remove("opened");
                    window.memory.opened.element.classList.remove("opened");
                }
                window.memory.opened = {src: "", element: null};
            } else{
                window.memory.opened.src = self.getAttribute("data-bg");
                window.memory.opened.element = self;
            }
        }, window.memory.delay);
    }

    endMemory(){
        this.controls.classList.add("active");
    }
}
export default ADV_Memory;