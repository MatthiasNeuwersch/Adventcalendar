<!doctype html>
<html lang="de">
<head>
    <link rel="manifest" href="manifest.json?v=2021_nov">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
    <meta name="theme-color" content="#0f5a91"/>
    <link rel="icon" href="favicon.ico" sizes="32x32">
    <link rel="shortcut icon" href="favicon.ico?v=2021">
    <link rel="apple-touch-icon" href="img/apple-touch-icon.png?v=2021_nov">
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Indie+Flower&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="css/advent.css?v=2021_nov"/>
    <meta charset="utf-8"/>
</head>
<body>
<div id="container">
    <div class='row row-0'>
        <div class='window lightgreen day-17 video' data-day='17'>
            <span class='day-number rotate-1'>17</span>
        </div>
        <div class='window darkgreen day-6 audio' data-day='6'>
            <span class='day-number square bo-white rotate-2 ba-lightgreen bo-white'>6</span>
        </div>
        <div class='window day-5 video' data-day='5'>
            <span class='day-number circle ba-green bo-green c-white rotate-3'>5</span>
        </div>
        <div class='window golden day-12 video' data-day='12'>
            <span class='day-number square c-golden rotate-2 bo-green ba-white'>12</span>
        </div>
        <div class='window darkgreen day-22 video' data-day='22'>
            <span class='day-number'>22</span>
        </div>
        <div class='window lightgreen day-4 video' data-day='4'>
            <span class='day-number underline bo-white circle ba-green rotate-1'>4</span
            ></div>
        <div class='window darkgreen day-16 video' data-day='16'>
            <span class='day-number square ba-lightgreen rotate-3'>16</span>
        </div>
        <div class='window lightgreen day-13 game' data-day='13'>
            <span class='day-number square bo-white rotate-1'>13</span>
        </div>
    </div>
    <div class='row row-1'>
        <div class='window darkred day-11 video' data-day='11'>
            <span class='underline rotate-4 day-number'>11</span>
        </div>
        <div class='window darkgreen day-24 video' data-day='24'>
            <span class='day-number'>24</span>
        </div>
        <div class='window day-1 golden video' data-day='1'>
            <span class='day-number underline'>1</span>
        </div>
        <div class='window darkgreen day-3 video' data-day='3'>
            <span class='day-number circle ba-red bo-white c-white rotate-3'>3</span>
        </div>
        <div class='window darkred day-20 video' data-day='20'>
            <span class='day-number square bo-golden underline ba-golden rotate-4'>20</span>
        </div>
        <div class='window golden day-9 game' data-day='9'>
            <span class='day-number underline circle bo-white rotate-1 ba-green'>9</span>
        </div>
        <div class='window lightgreen day-10 video' data-day='10'>
            <span class='day-number circle ba-red c-white'>10</span>
        </div>
    </div>
    <div class='row row-2'>
        <div class='window darkred day-21 video' data-day='21'>
            <span class='day-number'>21</span>
        </div>
        <div class='window day-7 game' data-day='7'>
            <span class='day-number circle bo-red c-red ba-white rotate-2'>7</span>
        </div>
        <div class='window darkred day-18 video' data-day='18'>
            <span class='day-number circle rotate-4 ba-white bo-green c-green'>18</span>
        </div>
        <div class='window day-15 video' data-day='15'>
            <span class='day-number square ba-green bo-green rotate-1 c-white'>15</span>
        </div>
    </div>
    <div class='row row-3'>
        <div class='window darkgreen day-19 video' data-day='19'>
            <span class='day-number circle ba-white c-red rotate-2'>19</span>
        </div>
        <div class='window lightgreen day-14 video' data-day='14'>
            <span class='day-number circle bo-white'>14</span>
        </div>

        <div class='window darkgreen day-2 video' data-day='2'>
            <span class='day-number circle ba-white c-golden bo-golden rotate-4'>2</span>
        </div>
    </div>
    <div class='row row-4'>
        <div class='window golden day-23 video' data-day='23'>
            <span class='day-number circle bo-white rotate-1'>23</span>
        </div>
        <div class='window day-8 video' data-day='8'>
            <span class='day-number square ba-lightgreen rotate-2 bo-green'>8</span>
        </div>
    </div>
</div>
<div id="screen" class="miroslavable">
    <div id="miroslav-close">X</div>
    <div id="player"></div>
    <div id="boomshine" class="miroslavable">
        <canvas id="canvas"></canvas>
        <div id="boomshine_extras">
            <p>Fange <span id="needed">0</span> von <span id="total">0</span> Schneeflocken! Du hast <strong id="clear">0</strong>.</p>
            <p>Level: <span id="level">1</span> Punkte; <span id="score">0</span></p>
        </div>
    </div>
    <div id="memory" class="miroslavable">
        <div id="deck"></div>
        <div id="memory_controls">
            <h2>Gewonnen!</h2>
            <button id="play_again">Nochmal spielen!</button>
        </div>
    </div>
    <div id="guesswhat" class="miroslavable">
        <div id="guesswhat_deck">
            <div id="gw_quests"></div>
            <div id="gw_help">?</div>
            <div id="gw_options"></div>
        </div>
        <div id="guesswhat_controls">
            <h2>Gewonnen!</h2>
            <button id="play_guesswhat_again">Nochmal spielen!</button>
        </div>
    </div>
</div>
<div id="dwarfonize">
    <div class="inner">
        <h2>Bist du ein echter Zwerg?</h2>
        <p>Dann sag mir, bei wem konntest du als Kind ohne Geld einkaufen?</p>
        <div>
            <input id="phone"/>
            <button id="dwarfme">Ich bin ein Zwerg!</button>
        </div>
    </div>
</div>
<!--<script type="text/javascript" src="advent.js?v=2021_0412"></script>-->
<script type="module"" src="/js/main.js"></script>
</body>
</html>