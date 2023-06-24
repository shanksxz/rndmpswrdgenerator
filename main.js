
// for showing the actual length
const lenvalue = document.querySelector("#lengthvalue");
const leninput = document.querySelector("#lengthinput");
let passwordlength = 10;
const min = leninput.min;
const max = leninput.max;
leninput.value = passwordlength;
lenvalue.innerText = passwordlength;
lenvalue.textContent = leninput.value;
leninput.addEventListener("input", (event) => {
  lenvalue.textContent = event.target.value;
});

const passworddisplay = document.getElementById('todisplay');
const uppercasecheck = document.getElementById("uppercase");
const lowercasecheck = document.getElementById("lowercase");
const numberscheck = document.getElementById("numbers");
const symbolscheck = document.getElementById("symbols");
const generatepassword = document.getElementById("generate");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const copy = document.querySelector("[data-copy]");
const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';


let password = "";
let checkcount = 0;

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function generateRandomNumber() {
    return getRndInteger(0,9);
}

function generateLowerCase() {  
       return String.fromCharCode(getRndInteger(97,123))
}

function generateUpperCase() {  
    return String.fromCharCode(getRndInteger(65,91))
}

function generateSymbol() {
    const randNum = getRndInteger(0, symbols.length);
    return symbols.charAt(randNum);
}


function shufflePassword(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
}

function handleCheckBoxChange() {
    checkcount = 0;
    allCheckBox.forEach( (checkbox) => {
        if(checkbox.checked)
            checkcount++;
    });``
}

allCheckBox.forEach( (checkbox) => {
    checkbox.addEventListener('change', handleCheckBoxChange);
})


leninput.addEventListener('input', (e) => {
    passwordlength = e.target.value;
});

async function copyContent() {
    try {
        await navigator.clipboard.writeText(passworddisplay.value);
        // copyMsg.innerText = "copied";
        console.log("copied");
    }
    catch(e) {
        // copyMsg.innerText = "Failed";
        console.log("failed");


    }
}


copy.addEventListener("click", () => {
    if(passworddisplay.value) {
        copyContent();
    }
})




generate.addEventListener('click', () => {


    if(checkcount == 0) 
        return;

    password = "";

    let funcArr = [];

    if(uppercasecheck.checked)
        funcArr.push(generateUpperCase);

    if(lowercasecheck.checked)
        funcArr.push(generateLowerCase);

    if(numberscheck.checked)
        funcArr.push(generateRandomNumber);

    if(symbolscheck.checked)
        funcArr.push(generateSymbol);

    //compulsory addition
    for(let i=0; i<funcArr.length; i++) {
        password += funcArr[i]();
    }
    for(let i=0; i<passwordlength-funcArr.length; i++) {
        let randIndex = getRndInteger(0 , funcArr.length);
        // console.log("randIndex" + randIndex);
        password += funcArr[randIndex]();
    }
    console.log("Remaining adddition done");
    password = shufflePassword(Array.from(password));
    passworddisplay.value = password;
});




