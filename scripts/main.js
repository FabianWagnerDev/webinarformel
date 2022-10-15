// Display Inputs Mobile/Desktop 
const eventdateDESKTOP = document.querySelector('.eventdate-input-container.desktop')
const eventdateMOBILE = document.querySelector('.eventdate-input-container.mobile')
const timezoneDESKTOP = document.querySelector('.timezone-input-container.desktop')
const timezoneMOBILE = document.querySelector('.timezone-input-container.mobile')

if(isTouchDevice()) {
    eventdateDESKTOP.style.display = 'none'
    timezoneDESKTOP.style.display = 'none'
    eventdateMOBILE.style.display = 'block'
    timezoneMOBILE.style.display = 'block'
} else {
    eventdateDESKTOP.style.display = 'block'
    timezoneDESKTOP.style.display = 'block'
    eventdateMOBILE.style.display = 'none'
    timezoneMOBILE.style.display = 'none'
}

function isTouchDevice() {
    return (('ontouchstart' in window) ||
       (navigator.maxTouchPoints > 0) ||
       (navigator.msMaxTouchPoints > 0))
}

const body = document.querySelector('body')
const signUpBtns = body.querySelectorAll('.btn-signup')
const darkOverlay = body.querySelector('.dark-overlay')
const overlayHeight = darkOverlay.querySelector('.overlay-height')
const gearPopup = darkOverlay.querySelector('.gear-animation-popup')
const signUpPopup = darkOverlay.querySelector('.signup-popup')
const gearPopupText = darkOverlay.querySelector('.gear-animation-popup p')
const closeCross = signUpPopup.querySelector('.close-cross')

// open gear-animation, then SignUp-Popup
signUpBtns.forEach(signUpBtn => {
    signUpBtn.addEventListener('click', () => {
        gearPopup.style.display = 'flex'
        darkOverlay.style.display = 'block'
        body.classList.add('no-scroll')

        triggerText(500)
            .then(() => {
                gearPopupText.innerText = 'Verfügbarkeit wird geprüft.'
                return triggerText(500)
            })
            .then(() => {
                gearPopupText.innerText = 'Verfügbarkeit wird geprüft..'
                return triggerText(500)
            })
            .then(() => {
                gearPopupText.innerText = 'Sichere Verbindung herstellen'
                return triggerText(500)
            })
            .then(() => {
                gearPopupText.innerText = 'Sichere Verbindung herstellen.'
                return triggerText(500)
            })
            .then(() => {
                gearPopupText.innerText = 'Sichere Verbindung herstellen..'
                return triggerText(500)
            })
            .then(() => {
                gearPopupText.innerText = 'Sichere Verbindung herstellen...'
                return triggerText(500)
            })
            .then(() => {
                gearPopup.style.display = 'none'
                signUpPopup.style.display = 'block'
                gearPopupText.innerText = 'Verfügbarkeit wird geprüft'

                if(window.matchMedia("(max-width: 767px)").matches) {
                    overlayHeight.style.minHeight = '860px'
                } else {
                    overlayHeight.style.minHeight = '960px'
                }
            })
    })
})

function triggerText(delay) {
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            resolve()
        }, delay)
    })
}

// Close SignUp-Popup
closeCross.addEventListener('click', () => {
    signUpPopup.style.display = 'none'
    darkOverlay.style.display = 'none'
    body.classList.remove('no-scroll')
    overlayHeight.style.minHeight = ''
})

// EVENTDATE INPUT
const eventdateInput = document.querySelector('.eventdate-input-container.desktop')
const eventdateDropdown = document.querySelector('.eventdate-dropdown')
const dateDropdownItems = eventdateDropdown.querySelectorAll('.dropdown-item')
const eventdateText = document.querySelector('.eventdate-text')
let dateDropdownOpen = false

// open/close eventdate dropdown
eventdateInput.addEventListener('click', e => {
    if(dateDropdownOpen === false) {
        timezoneDropdown.classList.remove('open')
        timezoneDropdownOpen = false
        eventdateDropdown.classList.add('open')
        dateDropdownOpen = true
    } else {
        eventdateDropdown.classList.remove('open')
        dateDropdownOpen = false
    }
    e.stopPropagation()
})

// Close dropdown when popup clicked
signUpPopup.addEventListener('click', () => {
    if(dateDropdownOpen === true) {
        eventdateDropdown.classList.remove('open')
        dateDropdownOpen = false
    }
})

// Set eventdate input text & date color (DESKTOP)
dateDropdownItems.forEach(dropdownItem => {
    dropdownItem.addEventListener('click', () => {
        const dropdownItemText = dropdownItem.querySelector('.eventdate')
        eventdateText.innerText = dropdownItemText.innerText
        eventdateText.style.color = 'var(--clr-text-dark)'
        signUpPopup.classList.add('date-is-active')
        const allDropdownItemTexts = document.querySelectorAll('.eventdate')
        allDropdownItemTexts.forEach(item => item.style.color = 'var(--clr-text-dark)')
        dropdownItemText.style.color = 'var(--clr-blue-1)'
    })
})

// Activate eventdate for submit btn (TOUCH)
const eventdateSelect = document.querySelector('.eventdate-select')
let selectedIndex = eventdateSelect.options[eventdateSelect.selectedIndex].value

eventdateSelect.addEventListener('change', () => {
    if(selectedIndex !== 0) {
        signUpPopup.classList.add('date-is-active')
        eventdateSelect.classList.add('active')
    }
})

// TIMEZONE INPUT
const timezoneInput = document.querySelector('.timezone-input-container.desktop')
const timezoneDropdown = document.querySelector('.timezone-dropdown')
const timezoneText = document.querySelector('.timezone-text')
const timezoneDropdownItems = document.querySelectorAll('.dropdown-item.timezone')
let timezoneDropdownOpen = false

// open/close timezone dropdown
timezoneInput.addEventListener('click', e => {
    if(timezoneDropdownOpen === false) {
        eventdateDropdown.classList.remove('open')
        dateDropdownOpen = false
        timezoneDropdown.classList.add('open')
        timezoneDropdownOpen = true
    } else {
        timezoneDropdown.classList.remove('open')
        timezoneDropdownOpen = false
    }
    e.stopPropagation()
})

// Close dropdown when popup clicked
signUpPopup.addEventListener('click', () => {
    if(timezoneDropdownOpen === true) {
        timezoneDropdown.classList.remove('open')
        timezoneDropdownOpen = false
    }
})

// Set timezone input text & selected item clr (DESKTOP)
timezoneDropdownItems.forEach(dropdownItem => {
    dropdownItem.addEventListener('click', () => {
        // change selected item color
        const prevSelectedItem = timezoneDropdown.querySelector('.dropdown-item.selected')
        prevSelectedItem.classList.remove('selected')
        dropdownItem.classList.add('selected')
        // change input text
        timezoneText.innerText = dropdownItem.innerText
    })
})

// enable submit button
const submitBtn = document.querySelector('.submit-btn')
const nameInput = document.querySelector('.name-input')
const emailInput = document.querySelector('.email-input')

nameInput.addEventListener('input', () => {
    activateSubmitBtn()
})
emailInput.addEventListener('input', () => {
    activateSubmitBtn()
})
eventdateDropdown.addEventListener('click', () => {
    activateSubmitBtn()
})
eventdateMOBILE.addEventListener('change', () => {
    activateSubmitBtn()
})

function activateSubmitBtn() {
    if(nameInput.value.length > 0 && 
       emailInput.value.includes('@') && 
       emailInput.value.includes('.') && 
       signUpPopup.classList.contains('date-is-active')) {
            submitBtn.removeAttribute('disabled')
            submitBtn.classList.add('active')
    } else {
            submitBtn.setAttribute('disabled', '')
            submitBtn.classList.remove('active')
    }
}

// Set Webinar Time for Eventdate (DESKTOP + TOUCH)
const eventdateSoonDESKTOP = document.querySelector('.eventdate.today-soon.desktop')
const eventdateSoonTOUCH = document.querySelector('.eventdate.today-soon.touch')
const timeTillLaunchSoon = document.querySelector('.time-till-launch.today-soon.desktop')

const eventdateMorningDESKTOP = document.querySelector('.eventdate.tomorrow-morning.desktop')
const eventdateMorningTOUCH = document.querySelector('.eventdate.tomorrow-morning.touch')
const timeTillLaunchMorning = document.querySelector('.time-till-launch.tomorrow-morning.desktop')

let minutesTillLaunch = null
let timeTillLaunchNextMorning = null
updateAllEventdates()

function updateAllEventdates() {
    // EVENTDATETODAY
    const currentDate = new Date()

    // calculate Weekday 0-6 -> Mo-So
    allWeekdays = ["So","Mo","Di","Mi","Do","Fr","Sa"]
    let weekdayNumber = currentDate.getDay()
    let currentWeekday = allWeekdays[weekdayNumber]

    // Calculate dayOfMonth 1-31 -> 01-31
    let currentDayOfMonth = currentDate.getDate().toLocaleString(undefined, {minimumIntegerDigits: 2})

    // Calculate Month 0-11 -> 01-12
    let currentMonth = currentDate.getMonth() + 1
    currentMonth = currentMonth.toLocaleString(undefined, {minimumIntegerDigits: 2})

    // Calculate Year 20XX
    currentYear = currentDate.getFullYear()

    // Calculate Minutes 0-59
    let currentMinute = currentDate.getMinutes()

    // round up to minute 15/30/45/60
    let targetMinute = currentMinute
    roundUpMinutes()

    function roundUpMinutes() {
        if(targetMinute === 15 || targetMinute === 30 || targetMinute === 45 || targetMinute === 60) return
        targetMinute = ++targetMinute
        roundUpMinutes()
    }

    // delay 15min if time till launch is closer than 2min
    let switchToNextHour = false

    if(targetMinute - currentMinute <= 2) {
        if (targetMinute === 15) {
            targetMinute = 30
        } else if (targetMinute === 30) {
            targetMinute = 45
        } else if (targetMinute === 45) {
            targetMinute = 60
            switchToNextHour = true
        } else if (targetMinute === 60) {
            targetMinute = 15
            switchToNextHour = true
        }
    }

    // Calculate targethour 0-23 -> 00-23
    allHours = ["00","01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23"]
    let currentHour = currentDate.getHours()
    let targetHour = allHours[currentHour]

    if(switchToNextHour === true || targetMinute === 60) {
        targetHour = allHours[currentHour + 1]
        if(currentHour === 23) targetHour = "00"
    }

    // countdown minutes
    updateMinutesTillLaunch()
    function updateMinutesTillLaunch() {

        let currentDate = new Date()
        minutesTillLaunch = targetMinute - currentDate.getMinutes()

        if(targetMinute === 15 && switchToNextHour === true && currentDate.getMinutes() > 15) {   
            minutesTillLaunch = 60 - (currentDate.getMinutes() - 15)
        }

        if(minutesTillLaunch === 0) updateAllEventdates()
    }

    // setEventdateSoon - Format: Mo, dd.mm.yyyy - hh:mm
    let targetMinuteString
    targetMinuteString = targetMinute
    if(targetMinute === 60) targetMinuteString = '00'   

    let calcEventdateSoon = `${currentWeekday}, ${currentDayOfMonth}.${currentMonth}.${currentYear} - ${targetHour}:${targetMinuteString}`
    eventdateSoonDESKTOP.innerText = calcEventdateSoon

    timeTillLaunchSoon.innerText = ` beginnt in ${minutesTillLaunch} Minuten `
    eventdateSoonTOUCH.innerText = `${calcEventdateSoon} - beginnt in ${minutesTillLaunch} Minuten`
    
    // EVENTDATE NEXT MORNING
    const tomorrowDate = new Date()
    tomorrowDate.setDate(tomorrowDate.getDate() + 1)

    // calculate tomorrow's weekday 0-6 -> Mo-So
    let tomorrowWeekdayNumber = tomorrowDate.getDay()
    let tomorrowWeekday = allWeekdays[tomorrowWeekdayNumber]

    // Calculate tomorrow's dayOfMonth 1-31 -> 01-31
    let tomorrowDayOfMonth = tomorrowDate.getDate()
    if(tomorrowDayOfMonth < 10) {
        tomorrowDayOfMonth = '0' + tomorrowDayOfMonth
    }

    // Calculate tomorrow's month 0-11 -> 01-12
    let tomorrowMonthNumber = tomorrowDate.getMonth()
    let tomorrowMonth = tomorrowMonthNumber + 1
    if(tomorrowMonth < 10) {
        tomorrowMonth = '0' + tomorrowMonth
    }

    // Calculate tomorrow's year 20XX
    tomorrowYear = tomorrowDate.getFullYear()

    // getHoursTillLaunch
    const PassedByHoursToday = currentDate.getHours()
    const fullHoursTillMidnight = 24 - PassedByHoursToday
    timeTillLaunchNextMorning = 11 + fullHoursTillMidnight

    // setEventdateMorning
    let calcEventdateMorning = `${tomorrowWeekday}, ${tomorrowDayOfMonth}.${tomorrowMonth}.${tomorrowYear} - 11:00`
    eventdateMorningDESKTOP.innerText = calcEventdateMorning

    timeTillLaunchMorning.innerText = ` beginnt in weniger als ${timeTillLaunchNextMorning} Stunden`
    eventdateMorningTOUCH.innerText = `${calcEventdateMorning} - beginnt in weniger als ${timeTillLaunchNextMorning} Stunden`
}

setInterval(() => {
    updateAllEventdates()
}, 10000)