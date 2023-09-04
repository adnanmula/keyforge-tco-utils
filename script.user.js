// ==UserScript==
// @name         TCO Utils
// @author       adnanmula
// @namespace    adnanmula
// @version      0.1
// @match        https://thecrucible.online/play
// @icon         https://www.google.com/s2/favicons?sz=64&domain=thecrucible.online
// @grant        none
// ==/UserScript==

loadExtensionButton();

function loadExtensionButton() {
    if (null === document.querySelector('.chat')) {
        setTimeout(() => {loadExtensionButton();}, 1000);
        return;
    } else {
        document.querySelectorAll('.game-board > .panel.player-stats .state')[14].innerHTML += '<button class="btn btn-default btn-stretch" title="" id="addExtensionElementsButton">Load extension</button>';
        loadExtension();
    }
}

function loadExtension() {
    document.getElementById('addExtensionElementsButton').onclick=function() {
        if (null === document.querySelector('.chat')) {
            alert('Game not started');
            return;
        }

        const dokWeb = 'https://decksofkeyforge.com/decks/';
        const messages = document.querySelector('.messages.panel').children[0].children;
        const yourDeck = messages[0].children[2].attributes.href.value.substring(42,78);
        const opponentDeck = messages[1].children[2].attributes.href.value.substring(42,78);

        messages[0].children[2].setAttribute('href', dokWeb + yourDeck);
        messages[1].children[2].setAttribute('href', dokWeb + opponentDeck);

        document.getElementById('addExtensionElementsButton').disabled = true;
        document.getElementById('addExtensionElementsButton').innerText = 'Extension loaded';

        document.querySelectorAll('.game-board > .panel.player-stats .state')[14].innerHTML += '<button class="btn btn-default btn-stretch" id="copyGameToClipboard">Copy result to clipboard</button>';
        document.getElementById('addExtensionElementsButton').style.display = 'none';

        document.getElementById('copyGameToClipboard').onclick=function(){
            const dokWeb = 'https://decksofkeyforge.com/decks/';
            const messages = document.querySelector('.messages.panel').children[0].children;
            const yourDeck = messages[0].children[2].attributes.href.value.substring(34,70);
            const yourDeckName = messages[0].children[2].innerText;
            const opponentDeck = messages[1].children[2].attributes.href.value.substring(34,70);
            const opponentDeckName = messages[1].children[2].innerText;
            const firstPlayer = document.querySelectorAll('.other-player')[0].children[0].innerText.trim();
            const player = document.querySelectorAll('.player-info')[1].children[1].innerText;
            const opponentPlayer = document.querySelectorAll('.player-info')[0].children[1].innerText;
            const yourScore = document.querySelectorAll('.game-board > .panel.player-stats .state .forged-key').length;
            const opponentScore = document.querySelectorAll('.stats-top .panel.player-stats .state .forged-key').length;

            console.log(player + ': (' + yourDeck + ')' + ' ' + yourDeckName);
            console.log(opponentPlayer + ': (' + opponentDeck + ')' + ' ' + opponentDeckName);
            console.log(yourScore + '-' + opponentScore);
            console.log('First turn: ' + firstPlayer);

            window.prompt("Copy to clipboard: Ctrl+C, Enter", player + '|' + yourDeck + '|' + opponentPlayer + '|' + opponentDeck + '|' + yourScore + '|' + opponentScore + '|' + firstPlayer);
        }
    }
}
