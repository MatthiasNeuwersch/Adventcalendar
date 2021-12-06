<?php
header('Content-Type: application/json');

/********************************************************************************
 *     API
 *
 *     The most simple form of an API. It decides by the given $_POST["param"]
 *     what to do with the request (see switch-case in decide()) and whether
 *     or not to grant access.
 *
 *
 *     ShaBy - 2020-11-27
 ********************************************************************************/

class API{
    function __construct(){
        $this->params = json_decode(file_get_contents('php://input'), true);
        $this->content = [];
        $this->decide();
    }

    private function decide(){
        switch($this->params["task"]){
            case "getContent":
                $this->getContent();
                break;
            case "getAnimals":
                $this->getAnimals();
                break;
            case "getMemoir":
                $this->getMemoir();
                break;
            default: break;
        }
        $this->send();
    }

    private function getContent(){
        $this->content = [
            "access"=>"granted",
            "content" => [
                "1"=>["type"=>"video", "src"=>"3Hg_Fw7y_yY"],
                "2"=>["type"=>"video", "src"=>"IyXJAfnCOj4"],
                "3"=>["type"=>"video", "src"=>"Rr98KZze9LY"],
                "4"=>["type"=>"video", "src"=>"CeHF7KERnSY"],
                "5"=>["type"=>"video", "src"=>"VyDFPtk4bsk"],
                "6"=>["type"=>"audio", "src"=>["audio"=>"https://advent.neuwersch.eu/audio/nikolaus.mp3", "img"=>"https://advent.neuwersch.eu/img/nikolaus.jpg"]],
                "7"=>["type"=>"game", "src"=>"guesswhat"],
                "8"=>["type"=>"video", "src"=>"95ewCbbrTP8"],
                "9"=>["type"=>"game", "src"=>"boomshine"],
                "10"=>["type"=>"game", "src"=>"memory"],
                "11"=>["type"=>"video", "src"=>"JLd0PV7kwTY"],
                "12"=>["type"=>"video", "src"=>"emcqKebm5Gg"],
                "13"=>["type"=>"game", "src"=>"memory"],
                "14"=>["type"=>"video", "src"=>"0VJWY8wFGx8"],
                "15"=>["type"=>"video", "src"=>"MJTeTPZ-PeI"],
                "16"=>["type"=>"image", "src"=>"https://advent.neuwersch.eu/img/Mandala.png"],
                "17"=>["type"=>"video", "src"=>"IbmZHpOefaQ"],
                "18"=>["type"=>"video", "src"=>"UqWByyOEMx8"],
                "19"=>["type"=>"video", "src"=>"jk7D69ufx_c"],
                "20"=>["type"=>"video", "src"=>"4eON1DU083g"],
                "21"=>["type"=>"video", "src"=>"qpaYC9UWuyc"],
                "22"=>["type"=>"image", "src"=>"https://advent.neuwersch.eu/img/Kripperl.png"],
                "23"=>["type"=>"video", "src"=>"_o7nc4BxbAI"],
                "24"=>["type"=>"video", "src"=>"AQ-dgBb5I0I"],
            ]];
    }

    private function getAnimals(){
        $this->content = [
            "access"=>"granted",
            "animals" => ["ente", "vanja","esel", "tiger","hahn","schwein","henne","schlange","hund","schaf","katze","pferd","kraehe","kueken","kuh"]
        ];
    }

    private function getMemoir(){
        //TODO: Cardbacks still have their names from 2020 - find a general naming pattern!
        $this->content = [
            "access"=>"granted",
            "cardbacks" => [
                "https://advent.neuwersch.eu/img/memoir/dommerl.jpg",
                "https://advent.neuwersch.eu/img/memoir/fraunz.jpg",
                "https://advent.neuwersch.eu/img/memoir/hias.jpg",
                "https://advent.neuwersch.eu/img/memoir/lion.jpg",
                "https://advent.neuwersch.eu/img/memoir/lissy.jpg",
                "https://advent.neuwersch.eu/img/memoir/ls.jpg",
                "https://advent.neuwersch.eu/img/memoir/opa-curt.jpg",
                "https://advent.neuwersch.eu/img/memoir/vincenzo.jpg",
                "https://advent.neuwersch.eu/img/memoir/trudl.jpg",

                "https://advent.neuwersch.eu/img/memoir/dommerl.jpg",
                "https://advent.neuwersch.eu/img/memoir/fraunz.jpg",
                "https://advent.neuwersch.eu/img/memoir/hias.jpg",
                "https://advent.neuwersch.eu/img/memoir/lion.jpg",
                "https://advent.neuwersch.eu/img/memoir/lissy.jpg",
                "https://advent.neuwersch.eu/img/memoir/ls.jpg",
                "https://advent.neuwersch.eu/img/memoir/opa-curt.jpg",
                "https://advent.neuwersch.eu/img/memoir/vincenzo.jpg",
                "https://advent.neuwersch.eu/img/memoir/trudl.jpg"
            ]];
    }

    private function send(){
        if(strtolower($this->params["dwarfonize"]) == "heidi" || $this->params["dwarfonize"] == "master"){
            echo json_encode($this->content);
        } else
            echo json_encode(["access"=>"denied", "content"=>""]);
    }
}

$advent = new API();

/* 2020

"content" => [
    "1"=>["type"=>"video", "src"=>"KtH1VMXduKE"],
    "2"=>["type"=>"image", "src"=>"https://neuwersch.eu/bdvent/img/Lebkuchenmann.png"],
    "3"=>["type"=>"game", "src"=>"boomshine"],
    "4"=>["type"=>"video", "src"=>"ClVeY30-r_w"],
    "5"=>["type"=>"audio", "src"=>["audio"=>"https://advent.neuwersch.eu/audio/knechtruprecht.mp3", "img"=>"https://advent.neuwersch.eu/img/knechtruprecht.jpg"]],
    "6"=>["type"=>"audio", "src"=>["audio"=>"https://advent.neuwersch.eu/audio/nikolaus.mp3", "img"=>"https://advent.neuwersch.eu/img/nikolaus.jpg"]],
    "7"=>["type"=>"image", "src"=>"https://advent.neuwersch.eu/img/Nikolo.png"],
    "8"=>["type"=>"video", "src"=>"ARKpodvyW-w"],
    "9"=>["type"=>"video", "src"=>"BcEFyHKfuyc"],
    "10"=>["type"=>"video", "src"=>"dUdXqHlSw58"],
    "11"=>["type"=>"video", "src"=>"K_sALMFSxT8"],
    "12"=>["type"=>"video", "src"=>"_H-LUob86XQ"],
    "13"=>["type"=>"game", "src"=>"memory"],
    "14"=>["type"=>"video", "src"=>"Hnpv-LjzeeY"],
    "15"=>["type"=>"video", "src"=>"z1J9HK8q34o"],
    "16"=>["type"=>"image", "src"=>"https://advent.neuwersch.eu/img/Mandala.png"],
    "17"=>["type"=>"video", "src"=>"zx-_m2AVmBs"],
    "18"=>["type"=>"audio", "src"=>["audio"=>"https://advent.neuwersch.eu/audio/schnee_an_weihnachten.mp3", "img"=>"https://advent.neuwersch.eu/img/christkind.jpg"]],
    "19"=>["type"=>"video", "src"=>"jk7D69ufx_c"],
    "20"=>["type"=>"video", "src"=>"jGfOkWTPOfw"],
    "21"=>["type"=>"video", "src"=>"lp_4TwSB51A"],
    "22"=>["type"=>"image", "src"=>"https://advent.neuwersch.eu/img/Kripperl.png"],
    "23"=>["type"=>"video", "src"=>"_o7nc4BxbAI"],
    "24"=>["type"=>"video", "src"=>"AQ-dgBb5I0I"],
]];
*/