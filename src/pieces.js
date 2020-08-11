import { Piece } from './modules/piece.js';
import { sumBy } from 'lodash';

// TODO: Remove extra 2s.

const defaultPieces = [
    [
        [2]
    ],
    [
        [2, 2]
    ],
    [
        [1, 0],
        [2, 1]
    ],
    [
        [1, 2, 1]
    ],
    [
        [2, 2],
        [2, 2]
    ],
    [
        [1, 2, 2, 1]
    ],
    [
        [1, 0, 0],
        [1, 2, 1]
    ],
    [
        [0, 1, 0],
        [1, 2, 1]
    ],
    [
        [1, 2, 0],
        [0, 2, 1]
    ],
    [
        [1, 0, 0, 0, 1],
        [0, 1, 2, 1, 0]
    ],
    [
        [1, 1, 2],
        [0, 1, 1]
    ],
    [
        [1, 1, 2, 1, 1],
    ],
    [
        [0, 0, 1],
        [1, 2, 1],
        [0, 0, 1]
    ],
    [
        [0, 1, 0],
        [1, 2, 1],
        [0, 1, 0]
    ],
    [
        [1, 2, 0, 0],
        [0, 1, 1, 1]
    ],
    [
        [1, 1, 0],
        [0, 2, 0],
        [0, 1, 1]
    ],
    [
        [1, 0, 0, 0],
        [0, 1, 2, 1]
    ],
    [
        [1, 0, 1],
        [1, 2, 1]
    ],
];

const pieces = []
for (let i = 0; i < defaultPieces.length; ++i){
    pieces.push(Piece.createPiece(defaultPieces[i], 0));
}

let pieceColours = new Map();
pieceColours.set(-1, 'white');
pieceColours.set(0, 'grey');
for (let i = 0; i < 2; i++) {
    pieceColours.set(1 + i * 18, 'lightpink');
    pieceColours.set(2 + i * 18, 'lightcoral');
    pieceColours.set(3 + i * 18, 'indianred');
    pieceColours.set(4 + i * 18, 'darkseagreen');
    pieceColours.set(5 + i * 18, 'firebrick');
    pieceColours.set(6 + i * 18, 'mediumseagreen');
    pieceColours.set(7 + i * 18, 'purple');
    pieceColours.set(8 + i * 18, 'dodgerblue');
    pieceColours.set(9 + i * 18, 'lightsteelblue');
    pieceColours.set(10 + i * 18, 'aquamarine');
    pieceColours.set(11 + i * 18, 'maroon');
    pieceColours.set(12 + i * 18, 'green');
    pieceColours.set(13 + i * 18, 'indigo');
    pieceColours.set(14 + i * 18, 'blue');
    pieceColours.set(15 + i * 18, 'cadetblue');
    pieceColours.set(16 + i * 18, 'mediumpurple');
    pieceColours.set(17 + i * 18, 'aquamarine');
    pieceColours.set(18 + i * 18, 'aquamarine');
}

for (let i = 0; i < defaultPieces.length; i++) {
    let row = '<td class="pieceCell"></td>'.repeat(defaultPieces[i][0].length);
    let grid = `<tr>${row}</tr>`.repeat(defaultPieces[i].length);
    document.querySelector('#pieceForm form').innerHTML += `<div class="piece">
        <div id="pieceDescription${i+1}"></div>
        <label for="piece${i+1}">
            <table id="pieceDisplay${i+1}">
                <tbody>${grid}</tbody> 
            </table>
        </label>
        <input id="piece${i+1}" type="number" min=0 value=0>
    </div>`;

    document.getElementById(`pieceDisplay${i+1}`).style.borderCollapse = 'collapse';
    document.getElementById(`pieceDisplay${i+1}`).style.borderSpacing = '0';
    document.getElementById(`pieceDescription${i+1}`).style.paddingRight = '15px';

    for (let j = 0; j < defaultPieces[i].length; j++) {
        for (let k = 0; k < defaultPieces[i][j].length; k++) {
            if (defaultPieces[i][j][k] !== 0) {
                document.getElementById(`pieceDisplay${i+1}`)
                .getElementsByTagName("tr")[j]
                .getElementsByTagName("td")[k].style.background = pieceColours.get(i+1);
            }
        }
    }
}
document.getElementById(`pieceDescription${1}`).innerHTML = '레벨 60';
document.getElementById(`pieceDescription${2}`).innerHTML = '레벨 100';
document.getElementById(`pieceDescription${3}`).innerHTML = '레벨 140 전사/해적';
document.getElementById(`pieceDescription${4}`).innerHTML = '레벨 140 마법사/도적/궁수';
document.getElementById(`pieceDescription${5}`).innerHTML = '레벨 200 전사';
document.getElementById(`pieceDescription${6}`).innerHTML = '레벨 200 궁수';
document.getElementById(`pieceDescription${7}`).innerHTML = '레벨 200 도적';
document.getElementById(`pieceDescription${8}`).innerHTML = '레벨 200 마법사';
document.getElementById(`pieceDescription${9}`).innerHTML = '레벨 200 해적';
document.getElementById(`pieceDescription${10}`).innerHTML = '사용하지 않음';
document.getElementById(`pieceDescription${11}`).innerHTML = '레벨 250 전사';
document.getElementById(`pieceDescription${12}`).innerHTML = '레벨 250 궁수';
document.getElementById(`pieceDescription${13}`).innerHTML = '레벨 250 도적';
document.getElementById(`pieceDescription${14}`).innerHTML = '레벨 250 마법사';
document.getElementById(`pieceDescription${15}`).innerHTML = '레벨 250 해적';
document.getElementById(`pieceDescription${16}`).innerHTML = '레벨 250 제논';
document.getElementById(`pieceDescription${17}`).innerHTML = '사용하지 않음';
document.getElementById(`pieceDescription${18}`).innerHTML = '사용하지 않음';


let currentPieces = 0;
if (localStorage.getItem("currentPieces")) {
    currentPieces = JSON.parse(localStorage.getItem("currentPieces"));
    document.getElementById('currentPieces').innerText = `채울수 있는 개수: ${currentPieces}`;
}

let pieceAmounts = JSON.parse(localStorage.getItem("pieceAmounts"))
if (pieceAmounts) {
    for (let i = 0; i < defaultPieces.length; i++) {
        document.getElementById(`piece${i+1}`).value = pieceAmounts[i];
    }

    updateCurrentPieces();
}

document.getElementById('pieceForm').addEventListener("input", updateCurrentPieces);

function updateCurrentPieces() {
    for (let piece of pieces) {
        piece.amount = parseInt(document.getElementById(`piece${piece.id}`).value) || 0;
    }

    currentPieces = sumBy(pieces, piece => piece.cellCount * piece.amount);

    localStorage.setItem("pieceAmounts", JSON.stringify(pieces.map(piece => piece.amount)));
    localStorage.setItem("currentPieces", JSON.stringify(currentPieces));
    document.getElementById('currentPieces').innerText = `채울수 있는 개수: ${currentPieces}`;
}

document.getElementById("clearPieces").addEventListener("click", clearPieces);

function clearPieces() {
    for (let i = 0; i < defaultPieces.length; i++) {
        document.getElementById(`piece${i+1}`).value = 0;
    }

    updateCurrentPieces();
}

export { pieceColours, pieces };