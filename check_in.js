'use strict';

let html5QrcodeScanner = new Html5QrcodeScanner(
        "reader",
        { fps: 10, qrbox: {width: 600, height: 400} },
        /* verbose= */ false);
    html5QrcodeScanner.render(onScanSuccess, onScanFailure);

// Create a new Audio object with the sound file path
const sound = new Audio('scan.mp3');

async function queryDB(string){

    try {
        //const response = await fetch('./api/test?string=' + string + '&key='+document.getElementById("apikey").value);
        const response = await fetch('./api/check_in/index.php?id=' + string);
        const data = await response.json(); // or .json() if JSON
        console.log(data);
        return data;
    } catch (error) {
        console.error('Error:', error);
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function onScanSuccess(decodedText, decodedResult) {
    try { html5QrcodeScanner.pause(true); } catch {}
    
    document.querySelector("#colorfeedback").classList.add("pause");
    document.querySelector("#overlay").classList.remove("hidden");
    
    sound.play();

    console.log(`Code matched = ${decodedText}`, decodedResult);

    let overlay = document.querySelector("#overlay-content");

    try{
        let objectList = await queryDB(decodedText);

		// evtl. auch forEach mit <template>
		let obj = objectList[0];
        overlay.querySelector("h1").textContent = obj.groups;
        overlay.querySelector(".meta").textContent = obj.details;
        overlay.querySelector(".debug").textContent = obj.debug;


        let hint = document.querySelector("#hint");
        hint.querySelector(".group").textContent = obj.group;
        hint.classList.remove("scan-group");
        hint.classList.add("scan-item");

    }catch (error) {
        console.error('Error:', error);
    }
}

function onScanFailure(error) {
    console.warn(`Code scan error = ${error}`);
}

document.querySelector("#close-overlay").onclick = () => {
    document.querySelector("#overlay").classList.add("hidden");
    document.getElementById("colorfeedback").classList.remove("pause");
    html5QrcodeScanner.resume();
};
