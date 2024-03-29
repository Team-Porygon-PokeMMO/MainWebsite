<script setup lang="ts">
function convertDateToUTC(date) { return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds()); }
const currentTime = convertDateToUTC(new Date());
const [currentTimeHours, currentTimeMinutes, currentTimeSeconds] = [currentTime.getHours(), currentTime.getMinutes(), currentTime.getSeconds()];
const currentTimeInInt = currentTimeHours + (currentTimeMinutes / 60) + (currentTimeSeconds / 3600);

const testingOutput = [currentTimeHours, currentTimeMinutes, currentTimeSeconds];

function fromIntToTime(int) {
    const hours = Math.floor(int);
    const minutes = Math.floor((int - hours) * 60);
    const seconds = Math.floor(((int - hours) * 60 - minutes) * 60);
    return [hours, minutes, seconds];
}

function getCurrentGameTimes() {
    return fromIntToTime(currentTimeInInt * 4)
}

function formatTimeFromList(timeList) {
    return `${(timeList[0] > 0 ? timeList[0] + 'hrs ' : '')}${(timeList[1] > 0 ? timeList[1] + 'mins ' : '')}${(timeList[2] > 0 ? timeList[2] + 'secs' : '')}`
}

function getRealTimeForNextGivenHour(hour) {
    let realTimeGivenHour = hour
    if (getCurrentGameTimes()[0] >= realTimeGivenHour) {
        realTimeGivenHour += 24
    }
    const realTimeGivenHourInInt = (realTimeGivenHour / 4) - currentTimeInInt
    return formatTimeFromList(fromIntToTime(realTimeGivenHourInInt))
}

function getFormattedCurrentGameTime() {
    return formatTimeFromList(getCurrentGameTimes())
}

// PokeMMO Day lasts 6 hours.
// From my current time, calculate the current game time.


function getCurrentGameTime() {
    return testingOutput
}
</script>

<template>
    <UContainer>
        <p>
            Current In-Game Time: {{ getFormattedCurrentGameTime() }}
        </p>
        <p>
            Next morning: {{ getRealTimeForNextGivenHour(4) }}
        </p>
        <p>
            Next day: {{ getRealTimeForNextGivenHour(10) }}
        </p>
        <p>
            Next night: {{ getRealTimeForNextGivenHour(21) }}
        </p>
    </UContainer>
</template>