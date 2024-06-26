// ==UserScript==
// @name         Quora Question OP Finder
// @namespace    http://cyberabi.com/
// @version      0.7
// @description  Find the OP of a Quora question from the log page
// @author       Christopher Burke
// @match        https://*.quora.com/*/log
// @icon         https://www.google.com/s2/favicons?sz=64&domain=quora.com
// @updateURL    https://github.com/cyberabi/QuoraOPTamperScript/raw/main/FindQuoraOP.user.js
// @downloadURL  https://github.com/cyberabi/QuoraOPTamperScript/raw/main/FindQuoraOP.user.js
// @require http://code.jquery.com/jquery-latest.js
// ==/UserScript==

$(document).ready(function() {
    'use strict';

    const opMarker1 = 'Question';
    const opRegEx1 = /Question\s*added\s*by\s*/;
    //const opRegEx2 = 'https://www.quora.com/profile/.*';

    // Scroll until we reach the bottom
    var _autoScroller = setInterval(function() {
        // See if what we want is on the page
        var elementsA = document.querySelectorAll('a');
        var found = false;
        elementsA.forEach((child) => {
            if (!found && child.innerText === opMarker1) {
                const parent = child.parentNode;
                var parentText = parent.innerText;
                if (parent.nodeName.toLowerCase() === 'div' && parentText.search(opRegEx1) === 0) {
                    // Found the OP's name and profile link
                    // Make sure it's visible
                    clearInterval(_autoScroller);
                    found = true;
                    window.scrollTo(0, window.scrollY + window.innerHeight);
                    var userName = parentText.split("\n")[1];
                    if (userName === "Quora Prompt Generator") {
                        parentText += "\n(+++ correct spelling +++)";
                    }
                    alert(parentText);
                }
            }
        });
        // Spam scrolling until we reach the bottom
        if (!found) {
            // Load more
            window.scrollTo(0, window.scrollY + window.innerHeight);
        }
    }, 100);
})();
