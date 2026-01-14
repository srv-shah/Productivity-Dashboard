function showFeatures() {
    let allElems = document.querySelectorAll('.elem');
    let fullElemPage = document.querySelectorAll('.fullElem');
    let fullElemPageBackBtn = document.querySelectorAll('.back');

    allElems.forEach(function (elem) {
        elem.addEventListener('click', function () {
            fullElemPage[elem.id].style.display = 'block';

        })
    });

    fullElemPageBackBtn.forEach(function (back) {
        back.addEventListener('click', function () {
            fullElemPage[back.id].style.display = 'none';

        });
    });
}
showFeatures();


function todoList() {
    let form = document.querySelector('.addTask form');
    let taskInput = document.querySelector('.addTask form input');
    let taskDetailsInput = document.querySelector('.addTask form textarea');
    let taskCheckbox = document.querySelector('.addTask form #check');

    var currentTask = [];


    if (localStorage.getItem('currentTask')) {
        currentTask = JSON.parse(localStorage.getItem('currentTask'));
    } else {
        console.log("task list is empty");
        // localStorage.setItem('currentTask', currentTask);
    }


    function renderTask() {

        let allTask = document.querySelector('.allTask');

        let sum = '<h3>Your Task List</h3>';

        currentTask.forEach(function (elem, index) {
            sum += `<div class="task">
                        <h5>${elem.task} <span class=${elem.imp}>imp</span></h5>
                        <button id=${index}>Mark as Completed</button>
                    </div>`;
        });
        allTask.innerHTML = sum;

        localStorage.setItem('currentTask', JSON.stringify(currentTask));

        var markCompleteBtn = document.querySelectorAll('.task button');
        markCompleteBtn.forEach(function (elem) {
            elem.addEventListener('click', function () {
                currentTask.splice(elem.id, 1);
                renderTask();
            });
        });
    }
    renderTask();


    form.addEventListener('submit', function (e) {
        e.preventDefault();

        currentTask.push(
            {
                task: taskInput.value,
                details: taskDetailsInput.value,
                imp: taskCheckbox.checked,
            }
        );
        renderTask();

        taskInput.value = '';
        taskDetailsInput.value = '';
        taskCheckbox.checked = false;
    });




}
todoList();


// Daily Planner Page
function dailyPlanner() {
    let dayPlanner = document.querySelector('.dayPlanner');

    let dayPlanData = JSON.parse(localStorage.getItem('dayPlanData')) || {};


    let hours = Array.from({ length: 24 }, (_, idx) => `${(6 + idx) % 24}:00 - ${(7 + idx) % 24}:00`);
    // console.log(hours);


    let wholeDaySum = '';
    hours.forEach(function (elem, idx) {

        let savedData = dayPlanData[idx] || '';
        wholeDaySum += `<div class="day-planner-time">
                    <p>${elem}</p>
                    <input id=${idx} type="text" placeholder="..." value = ${savedData}>
                </div>`

    });
    // console.log(wholeDaySum);


    dayPlanner.innerHTML = wholeDaySum;

    let dayPlannerInput = document.querySelectorAll('.dayPlanner input');

    dayPlannerInput.forEach(function (elem) {
        elem.addEventListener('input', function () {
            dayPlanData[elem.id] = elem.value;

            localStorage.setItem('dayPlanData', JSON.stringify(dayPlanData));
        });
    });
}
dailyPlanner();


//motivational page
function motivationalQuotes() {
    let quote = document.querySelector('.wrapper p');
    let author = document.querySelector('.wrapper h5');

    async function fetchQuote() {
        let response = await fetch('https://quotes-api-self.vercel.app/quote');
        let data = await response.json();

        quote.innerHTML = data.quote;
        author.innerHTML = '~ ' + data.author;

    }
    fetchQuote();
}
motivationalQuotes();


//  pomodoro timer
function pomodoroTimer() {
    let timer = document.querySelector('.pomo-timer h1');
    let startBtn = document.querySelector('.pomo-timer .start');
    let pauseBtn = document.querySelector('.pomo-timer .pause');
    let resetBtn = document.querySelector('.pomo-timer .reset');
    let isWorkSessinon = true;
    let session = document.querySelector('.pomodoro-page .session h3');


    let totalSec = 1500;
    let timerInterval = null;


    function updateTimer() {
        let minutes = Math.floor(totalSec / 60);
        let seconds = totalSec % 60;
        // console.log(minutes, seconds);
        timer.innerHTML = `${String(minutes).padStart(2, '0')} : ${String(seconds).padStart(2, '0')}`;

    }

    function startTimer() {
        clearInterval(timerInterval);

        if (isWorkSessinon) {

            timerInterval = setInterval(() => {
                if (totalSec > 0) {
                    totalSec--;
                    updateTimer();
                } else {
                    clearInterval(timerInterval);
                    isWorkSessinon = false;
                    timer.innerHTML = '5 : 00'
                    session.innerHTML = 'Take a Break'
                    session.style.backgroundColor = 'var(--red)'
                    totalSec = 5 * 60;

                }
            }, 1);
        } else {
            timerInterval = setInterval(function () {
                if (totalSec > 0) {
                    totalSec--;
                    updateTimer();
                } else {
                    clearInterval(timerInterval);
                    isWorkSessinon = true;
                    timer.innerHTML = '25 : 00'
                    session.innerHTML = 'Working Session';
                    session.style.backgroundColor = 'green';
                    totalSec = 25 * 60;
                }
            }, 1);
        }


    }
    function pauseTimer() {
        clearInterval(timerInterval);
    }
    function resetTimer() {
        clearInterval(timerInterval);
        totalSec = 25 * 60;
        updateTimer();

    }

    startBtn.addEventListener('click', startTimer);
    pauseBtn.addEventListener('click', pauseTimer);
    resetBtn.addEventListener('click', resetTimer);
}
pomodoroTimer();


// Weather Dashboard (Header)
function weatherDashboard() {
    let apiKey = '643d0d55b6e0408ebb051514261401';
    let city = 'jamui'

    let dayAndTime = document.querySelector('.header1 h2');
    let fullDate = document.querySelector('.header1 h4');
    let currentTemp = document.querySelector('.header2 h2');
    let condition = document.querySelector('.header2 h3');
    let precipitation = document.querySelector('.header2 #precipitation');
    let humidity = document.querySelector('.header2 #humidity');
    let wind = document.querySelector('.header2 #wind');



    let data = null;

    async function weatherAPICall() {
        let response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`);
        data = await response.json();
        console.log(data);


        currentTemp.innerHTML = `${data.current.temp_c}<span id='celcius'>°C</span>`
        condition.innerHTML = `${data.current.condition.text}`
        precipitation.innerHTML = `Precipitation: ${data.current.precip_in}%`;
        humidity.innerHTML = `Humidity: ${data.current.humidity}%`;
        wind.innerHTML = `Wind: ${data.current.wind_kph} km/h`


    }
    weatherAPICall();

    function timeDate() {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const months = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];

        let today = new Date;

        //day and time
        let dayOfWeek = days[today.getDay()];
        let hours = today.getHours();
        let minutes = today.getMinutes();
        let seconds = today.getSeconds();

        dayAndTime.innerHTML = `${dayOfWeek}, ${String(hours).padStart('2', '0')}:${String(minutes).padStart('2', '0')}:${String(seconds).padStart('2', '0')}`

        let date = today.getDate();
        let month = months[today.getMonth()];
        let year = today.getFullYear();

        fullDate.innerHTML = `${date} ${month}, ${year}`;



    }
    timeDate();

    setInterval(function () {
        timeDate();
    }, 1000);
}
weatherDashboard();


// change theme
let theme = document.querySelector('#theme');
let rootElement = document.documentElement;

let flag = 0;
theme.addEventListener('click', function () {
    if (!flag) {
        rootElement.style.setProperty('--bg', '#DBE2FE');
        rootElement.style.setProperty('--primary', '#3F72AF');
        rootElement.style.setProperty('--card', '#112D4E');
        rootElement.style.setProperty('--accent', '#3F72AF');
        rootElement.style.setProperty('--text', '#112D4E');

        flag = true;
    } else {
        rootElement.style.setProperty('--bg', '#112D4E');
        rootElement.style.setProperty('--primary', '#3F72AF');
        rootElement.style.setProperty('--card', '#DBE2FE');
        rootElement.style.setProperty('--accent', '#3F72AF');
        rootElement.style.setProperty('--text', '#F9F7F7');

        flag = false;
    }
});