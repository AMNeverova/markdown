import './src/styles/style.scss';

let markdownArea = document.querySelector('.textarea');
let previewArea = document.querySelector('.processed-text');

const handler = function () {
    let currentText = markdownArea.value;
    const regExpForPound = /^#.+$/gm;
    const regExpForPoundReplace = /#\s?/;
    const regExpForBug = /\*{2}((.+?)|((.+?)((?<=\\)\*)(.+?)))\*{2,3}/gm;
    const regExpForBugReplace = /((^\*\*)|(\*\*$)|((?<!\\)\*)|((?<!\\)\\))/gm;
    const replace = function(regExpToMatch, regExpToReplace, tag) {
        let matches = Array.from(currentText.matchAll(regExpToMatch));
        if (!matches.length) {
            previewArea.innerHTML = currentText;
        } else {
            for (let match of matches) {
                let textToPaste = match[0].replace(regExpToReplace, '');
                currentText = currentText.replace(match[0], `<${tag}>${textToPaste}</${tag}>`)
                previewArea.innerHTML = currentText;
            }    
        }
    }
    replace(regExpForPound, regExpForPoundReplace, 'h1');
    replace(regExpForBug, regExpForBugReplace, 'b');
}

markdownArea.addEventListener('input', handler);
