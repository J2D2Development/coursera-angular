'use strict';
/*
This should
    1) Get letters from input field
    2) convert to ascii
    3) calculate total of those numbers
    4) print to output
*/

function main() {
    const input = document.querySelector('#tight');
    const output = document.querySelector('#output');
    // let total = 0;

    function getLettersToArray(evt) {
        return evt.target.value.split('');
    }

    function convertToAscii(letter) {
        return letter.charCodeAt(0);
    }

    function updateOutput(total) {
        output.innerText = total;
    }

    function calculateTotal(evt) {
        let total = getLettersToArray(evt)
            .map(letter => {
                return convertToAscii(letter);
            })
            .reduce((total, next) => {
                return total += next;
            }, 0);

        return total;
    }

    function getResult(evt) {
        let total = calculateTotal(evt);
        updateOutput(total);
    }

    input.addEventListener('keyup', getResult, false);
}

window.addEventListener('DOMContentLoaded', main, false);