// const appId = 'insert api key here';

window.addEventListener('load', () => {
    let long;
    let lat;
})

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
        long = position.coords.longitude;
        lat = position.coords.latitude;

        const proxy = 'https://cors-anywhere.herokuapp.com/'; //proxy that allows viewing site on a local machine
        const api = `${proxy}api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${appId}`; //remove ${proxy} when pushing to github
        
        fetch(api)
        .then(data => {
            return data.json();
        })
        .then(data => {
            const {feels_like, temp, temp_max, temp_min} = data.main;
            const {description, main} = data.weather[0];

            const htmlID = ['temp-feels-like', 'temp-current', 'temp-high', 'temp-low', 'description', 'weather']
            const info = [feels_like, temp, temp_max, temp_min, description, main];

            for(let i = 0; i < 4; i++) {
                info[i] = Math.round(info[i]-273.15);
            }

            for(let i=0; i < info.length; i++) {
                replaceData(htmlID[i], info[i]);
            }

        })
    })
}

function replaceData(id, value) {
    document.getElementById(id).innerHTML = value;
    return;
}

function convertTemp(targetUnit, tempValue) {
    if (targetUnit == 'C') {
        for(let i = 0; i < tempValue.length; i++) {
            tempValue[i] = Math.round((tempValue[i] * 9 / 5) + 32);
        }
        
    }
    if (targetUnit == 'F') {
        for(let i = 0; i < tempValue.length; i++) {
            tempValue[i] = Math.round((tempValue[i] - 32) * 5 / 9);
        }
    }
    return tempValue;
}

let toggle = document.querySelector('#toggle');

toggle.addEventListener('click', function() {
    let tempValueSelector = document.querySelectorAll('.temp-value');
    let tempValue = [];
    let tempUnitSelector = document.querySelectorAll('.unit');
    let newUnit;

    for(let i = 0; i < tempValueSelector.length; i++) {
        var temp = tempValueSelector[i].innerHTML;
        tempValue.push(temp);
    }

    if (toggle.innerHTML == 'C') {
        toggle.innerHTML = 'F';
        tempValue = convertTemp('F', tempValue);
        newUnit = 'C';
    } else if (toggle.innerHTML == 'F') {
        toggle.innerHTML = 'C';
        tempValue = convertTemp('C', tempValue);
        newUnit = 'F';
    }

    for(let i = 0; i < tempValue.length; i++ ) {
        tempValueSelector[i].innerHTML = tempValue[i];
        tempUnitSelector[i].innerHTML = newUnit;
    }
})
