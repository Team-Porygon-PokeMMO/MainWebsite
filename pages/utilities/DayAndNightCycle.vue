<script lang="ts">
enum Cycle {
    MORNING = '🌅Morning',
    DAY = '☀️Day',
    NIGHT = '🌚Night'
}

class GameDay {
    name: string = ""
    startTime: number = 0
    endTime: number = 0
    index: number = 0
    active: boolean = false
    dayOfTheWeek: number = 0
}

const daysOfTheWeek: GameDay[] = [
    {
        name: 'Thursday',
        startTime: 0,
        endTime: 6,
        index: 0,
        active: false,
        dayOfTheWeek: 5
    }, {
        name: 'Friday',
        startTime: 6,
        endTime: 12,
        index: 1,
        active: false,
        dayOfTheWeek: 6
    }, {
        name: 'Saturday',
        startTime: 12,
        endTime: 18,
        index: 2,
        active: false,
        dayOfTheWeek: 7
    },
    {
        name: 'Sunday',
        startTime: 18,
        endTime: 24,
        index: 3,
        active: false,
        dayOfTheWeek: 0
    }, {
        name: 'Monday',
        startTime: 24,
        endTime: 30,
        index: 4,
        active: false,
        dayOfTheWeek: 1
    }, {
        name: 'Tuesday',
        startTime: 30,
        endTime: 36,
        index: 5,
        active: false,
        dayOfTheWeek: 2
    }, {
        name: 'Wednesday',
        startTime: 36,
        endTime: 42,
        index: 6,
        active: false,
        dayOfTheWeek: 3
    },]

const alteringCaveCycle = [
    ['Zubat', 'Shuppet', 'Snubbull', 'Pineco', 'Houndour', 'Zigzagoon', 'Duskull', 'Aipom'],
    ['Zubat', 'Aron', 'Snubbull', 'Stantler', 'Shuppet', 'Pineco', 'Poochyena', 'Zigzagoon', 'Aipom'],
    ['Zubat', 'Hondour', 'Pineco', 'Mareep', 'Stantler', 'Teddiursa', 'Smeargle'],
    ['Zubat', 'Stantler', 'Teddiursa', 'Smeargle', 'Snubbull', 'Poochyena', 'Bagon'],
    ['Zubat', 'Mawile', 'Poochyena', 'Snubbull', 'Slakoth', 'Spinda', 'Mareep', 'Sableye'],
    ['Zubat', 'Mareep', 'Hondour', 'Teddiursa', 'Aipom', 'Stantler', 'Pineco', 'Smeargle', 'Shuckle'],
    ['Zubat', 'Mawile', 'Poochyena', 'Mareep', 'Teddiursa', 'Spinda'],
]

const emptyStringArray: string[] = []

function addZ(n: number) { return n < 10 ? '0' + n : '' + n; }

function getInGameTime(): [number, number] {
    let currentDate = new Date()
    let currentHour = currentDate.getUTCHours()
    let currentInGameHour = currentHour % 6 * 4 + currentDate.getUTCMinutes() / 15 + currentDate.getUTCSeconds() / 900
    let currentGameHour = Math.floor(currentInGameHour)
    let currentGameMinutes = Math.floor((currentInGameHour - currentGameHour) * 60)
    return [currentGameHour, currentGameMinutes]
}

function getInGameWeekTime(): [number, number] {
    let currentDate = new Date()
    let currentDay = currentDate.getUTCDay()
    let currentHour = currentDate.getUTCHours()
    let currentMinutes = currentDate.getUTCMinutes()
    let currentSeconds = currentDate.getUTCSeconds()
    let totalHours = (currentHour + currentDay * 24 + currentMinutes / 60 + currentSeconds / 3600) % 42
    let currentGameHour = Math.floor(totalHours)
    let currentGameMinutes = Math.floor((totalHours - currentGameHour) * 60)
    return [currentGameHour, currentGameMinutes]
}

function testing() {
}

export default {
    data() {
        return {
            currentGameClock: "",
            currentGameTime: "",
            daysOfTheWeek: daysOfTheWeek,
            activeAlteringCaveCycle: emptyStringArray
        };
    },
    beforeMount() {
        setInterval(() => {
            this.getCurrentGameClock();
            this.getCurrentGameTime();
            this.refreshFullGameWeek();
            this.refreshActiveAlteringCaveCycle();
        }, 1000)
        testing()
    },
    afterMount() {
        this.refreshFullGameWeek()
    },
    methods: {
        getCurrentGameClock: function () {
            let [currentInGameHour, currentInGameMinutes] = getInGameTime()
            this.currentGameClock = (addZ(currentInGameHour) + ":" + addZ(Math.floor(currentInGameMinutes)))
        },
        getCurrentGameTime: function () {
            let inGameHours: number = getInGameTime()[0]
            let newCurrentGameTime = ""
            if (inGameHours < 4)
                newCurrentGameTime = Cycle.NIGHT
            else if (inGameHours < 11)
                newCurrentGameTime = Cycle.MORNING
            else if (inGameHours < 21)
                newCurrentGameTime = Cycle.DAY
            else
                newCurrentGameTime = Cycle.NIGHT
            this.currentGameTime = newCurrentGameTime
        },
        refreshFullGameWeek: function () {
            let [currentGameWeekHour] = getInGameWeekTime()

            for (let i = 0; i <= 6; i++) {
                let dayData: GameDay = daysOfTheWeek[i]
                dayData.active = false
                if (currentGameWeekHour >= dayData.startTime && currentGameWeekHour < dayData.endTime) {
                    dayData.active = true
                    break
                }
            }
        },
        calculateRemainingTime: function (day: GameDay) {
            let [currentHour, currentMinutes] = getInGameWeekTime()
            let remainingTime = day.startTime - (currentHour + currentMinutes / 60)
            let remainingHours = Math.floor(remainingTime)
            let remainingMinutes = Math.floor((remainingTime - remainingHours) * 60)
            if (remainingTime < 0) {
                remainingTime += 42
                remainingHours = Math.floor(remainingTime)
            }
            if (day.active) {
                remainingTime = day.endTime - (currentHour + currentMinutes / 60)
                remainingHours = Math.floor(remainingTime)
                remainingMinutes = Math.floor((remainingTime - remainingHours) * 60)
                return this.convertToString(remainingHours, remainingMinutes, day.active)
            }
            return this.convertToString(remainingHours, remainingMinutes)
        },
        convertToString(remainingHours: number, remainingMinutes: number, isActive: boolean = false) {
            if (isActive) {
                return " - Ends in " + (remainingHours > 0 ? remainingHours + ' hours' : '') + (remainingHours > 0 && remainingMinutes > 0 ? ' and ' : '') + (remainingMinutes > 0 ? remainingMinutes + " minutes" : '')
            }
            return " - Starts in " + (remainingHours > 0 ? remainingHours + ' hours' : '') + (remainingHours > 0 && remainingMinutes > 0 ? ' and ' : '') + (remainingMinutes > 0 ? remainingMinutes + " minutes" : '')
        },
        refreshActiveAlteringCaveCycle: function () {
            let activeDayOfTheWeek: number = this.getGameWeek.find(day => day.active)?.dayOfTheWeek ?? 0
            this.activeAlteringCaveCycle = alteringCaveCycle[activeDayOfTheWeek]
        }
    },
    computed: {
        getGameWeek: function () {
            let daysOfTheWeek = this.daysOfTheWeek.slice().sort((a, b) => a.dayOfTheWeek - b.dayOfTheWeek)
            return daysOfTheWeek
        },
        getActiveAlteringCaveCycle: function () {
            return this.activeAlteringCaveCycle
        }
    }
};
</script>

<template>
    <UContainer>
        <div class="container mx-auto grid grid-cols-1">
            <h1>Current PokeMMO Time</h1>
            <h2>
                {{ currentGameClock }} {{ currentGameTime }}
            </h2>
            <div v-if="getGameWeek.find(a => a.active)" class="container mx-auto grid grid-cols-1">
                <h1>Game Week</h1>
                <span v-for="day in getGameWeek" :class="{ isActive: day.active }">{{ day.name
                    }}{{ calculateRemainingTime(day) }}</span>
            </div>
            <div v-if="getActiveAlteringCaveCycle.length > 0" class="container mx-auto grid grid-cols-1">
                <h1>Altering Cave Rotation</h1>
                <span v-for="pokemon in getActiveAlteringCaveCycle">{{ pokemon }}</span>
            </div>
        </div>
    </UContainer>
</template>

<style scoped>
.isActive {
    color: lightcoral;
}
</style>