var mobile = (/iphone | ipad | ipod | android | blackberry | mini | windows\sce | palm/i.test(navigator.userAgent
    .toLowerCase()));
var showingSourceCode = false;
var isInEditMode = true;
var DarkMode = false;
var colorPickerisHidden = true;
const pr = require('electron-prompt');






if (mobile) {

    document.getElementById('titolo').style.visibility = "hidden";
    document.getElementById('titolo').style.visibility = "hidden";

} else {
}


function ChangeMode() {
    var x = document.querySelectorAll("button");

    if (!DarkMode) {
        document.getElementsByTagName('body')[0].style.backgroundColor = "#18205F";
        document.getElementsByTagName('iframe')[0].style.backgroundColor = "white";
        document.getElementsByTagName('footer')[0].style.color = "white";
        for (var i = 0; i < x.length; i++) {
            x[i].style.backgroundColor = "white";
        }
        document.getElementById('titolo').style.color = "white";
        DarkMode = true;


    } else if (DarkMode) {

        document.getElementsByTagName('body')[0].style.backgroundColor = "#EFD6AC";
        document.getElementsByTagName('iframe')[0].style.backgroundColor ="#EFD6AC";
        document.getElementsByTagName('footer')[0].style.color = "black";
        document.getElementById('titolo').style.color = "black";
        var j;
        for (j = 0; j < x.length; j++) {
            x[j].style.backgroundColor = "transparent";
        }
        DarkMode = false;
    }

}

function enableEditMode() {
    richTextField.document.designMode = 'On';
}

function execCmd(command) {
    richTextField.document.execCommand(command, false, null);
}

function execCommandWithArg(command, arg) {
    richTextField.document.execCommand(command, false, arg);
}

function toggleSource() {
    if (showingSourceCode) {
        richTextField.document.getElementsByTagName('body')[0].innerHTML = richTextField.document
            .getElementsByTagName('body')[0].textContent;
        showingSourceCode = false;
    } else {
        richTextField.document.getElementsByTagName('body')[0].textContent = richTextField.document
            .getElementsByTagName('body')[0].innerHTML;
        showingSourceCode = true;
    }
}

function printContent() {
    document.getElementById('campotesto').contentWindow.print();
}

function toggleEdit() {
    if (isInEditMode) {
        richTextField.document.designMode = 'Off';
        isInEditMode = false;
    } else {
        richTextField.document.designMode = 'On';
        isInEditMode = true;
    }
}

var as = window.setInterval(function autoSave() {
    localStorage.setItem("content", document.getElementById('campotesto').contentWindow.document.body.innerHTML.toString())
}, 10000);


function displayHighlightColorPicker() {
    if (colorPickerisHidden) {
        document.getElementById('highLighSection').style.display = "inline";
        colorPickerisHidden = false;
    } else if (!colorPickerisHidden) {
        document.getElementById('highLighSection').style.display = "none";
        colorPickerisHidden = true;
    }

}


function getColorPickerValue() {
    return document.getElementById("colorPicker").value;
}

function saveTextAsFile(textToWrite) {
    var textFileAsBlob = new Blob([textToWrite], {type: 'text/plain'});
    var fileNameToSaveAs = "file.txt"; //filename.extension

    var downloadLink = document.createElement("a");
    downloadLink.download = fileNameToSaveAs;
    downloadLink.innerHTML = "Download File";
    if (window.webkitURL != null) {
        downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
    } else {
        downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
        downloadLink.onclick = destroyClickedElement;
        downloadLink.style.display = "none";
        document.body.appendChild(downloadLink);
    }

    downloadLink.click();
}

var button = document.getElementById('save');
button.addEventListener('click', saveTextAsFile);

function destroyClickedElement(event) {
    // remove the link from the DOM
    document.body.removeChild(event.target);
}

function insertURL() {

    pr({
        title: 'Inserisci un url',
        label: 'URL:',
        value: 'http://example.org',
        inputAttrs: {
            type: 'text'
        },
        type: 'input'
    })
        .then((r) => {
            if(r === null) {
                console.log('user cancelled');
            } else {
                console.log(r);
                richTextField.document.execCommand('createLink',false,r)
            }
        })
        .catch(console.error);

}

function insertImageURL() {

    pr({
        title: "Inserisci un'immagine",
        label: 'URL:',
        value: 'example.jpg',
        inputAttrs: {
            type: 'text'
        },
        type: 'input'
    })
        .then((r) => {
            if(r === null) {
                console.log('user cancelled');
            } else {
                console.log(r);
                richTextField.document.execCommand('insertImage',false,r)
            }
        })
        .catch(console.error);

}