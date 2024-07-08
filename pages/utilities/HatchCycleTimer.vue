<script lang="ts">
let currentTimer: Date | null = new Date()
let endTimer: Date | null = new Date()
let notificationEndTimer: Date | null = new Date()
let volume = 100
export default {
    data() {
        return {
            currentTimer: new Date(),
            endTimer: null,
            timerSet: false,
            eggHatchSecond: 6,
            remainingTimer: '',
            remainingNotificationTimer: '',
            notificationSoundPlayed: true,
            volume: 100,
            notificationTimers: [],
            hasDonator: false,
            hasFlameBody: false,
            hatchCycleMinutes: 6,
            notificationSecondsBefore: 0,
            notificationEndTimer: null
        };
    },
    mounted() {
        this.updateTime();
        let timer = setInterval(this.updateTime, 200);
    },
    methods: {
        updateTime() {
            this.currentTimer = new Date();
            this.checkTimer()
        },
        checkTimer() {
            if (this.endTimer == null || this.notificationEndTimer == null) {
                return
            }
            let currentTimer = new Date(this.currentTimer)
            let notificationEndTimer = new Date(this.notificationEndTimer)
            let notificationDiff = notificationEndTimer.getTime() - currentTimer.getTime();
            if (notificationDiff <= 0) {
                this.sendAlert()
            }

            let endTimer = new Date(this.endTimer)
            let endTimerDiff = endTimer.getTime() - currentTimer.getTime();
            if (endTimerDiff <= 0) {
                this.startTimer()
                return
            }
            let minutes = Math.floor(endTimerDiff / 1000 / 60 % 60);
            let seconds = Math.floor(endTimerDiff / 1000 % 60);
            this.remainingTimer = (minutes > 0 ? `${minutes} minutes and ` : '') + `${seconds} seconds`
            let notificationMinutes = Math.floor(notificationDiff / 1000 / 60 % 60);
            let notificationSeconds = Math.floor(notificationDiff / 1000 % 60);
            if (notificationMinutes > 0 || notificationSeconds > 0) {
                this.remainingNotificationTimer = (minutes > 0 ? `${notificationMinutes} minutes and ` : '') + `${notificationSeconds} seconds`
            }
            else {
                this.remainingNotificationTimer = ''
            }
        },
        startTimer() {
            let startTimer = new Date()
            let eggHatchSecond = this.eggHatchSecond
            if (startTimer.getSeconds() < eggHatchSecond) {
                this.removeMinutesToDate(startTimer, 1)
            }
            this.setSecondsToDate(startTimer, eggHatchSecond)

            let pingMinute = this.hatchCycleMinutes

            let endTimer = new Date(startTimer)
            this.addMinutesToDate(endTimer, pingMinute)
            this.endTimer = endTimer;
            let notificationEndTimer = new Date(endTimer)
            this.removeSecondsToDate(notificationEndTimer, this.notificationSecondsBefore)
            this.notificationEndTimer = notificationEndTimer
            this.timerSet = true
            this.notificationSoundPlayed = false
        },
        addMinutesToDate(date: Date, minutes: number) {
            date.setMinutes(date.getMinutes() + minutes);
        },
        removeMinutesToDate(date: Date, minutes: number) {
            date.setMinutes(date.getMinutes() - minutes);
        },
        setSecondsToDate(date: Date, seconds: number) {
            date.setSeconds(seconds);
        },
        addSecondsToDate(date: Date, seconds: number) {
            date.setSeconds(date.getSeconds() + seconds);
        },
        removeSecondsToDate(date: Date, seconds: number) {
            date.setSeconds(date.getSeconds() - seconds);
        },
        missedInterval() {
            let endTimer = new Date(this.endTimer)
            this.addMinutesToDate(endTimer, 1)
            this.endTimer = endTimer
        },
        sendAlert() {
            if (!this.notificationSoundPlayed) {
                this.playAudio()
                this.notificationSoundPlayed = true
            }
        },
        playAudio() {
            const audio = new Audio('https://cdn.freesound.org/previews/352/352651_4019029-lq.ogg');
            audio.volume = this.volume / 100;
            audio.play();
        },
        stopTimer() {
            this.endTimer = null
            this.notificationEndTimer = null
            this.timerSet = false
            this.notificationSoundPlayed = true
        },
    },
    computed: {
        getHatchCycleMinutes() {
            let hatchCycleMinutes = 6
            if (this.hasDonator) {
                hatchCycleMinutes--
            }
            if (this.hasFlameBody) {
                hatchCycleMinutes--
            }
            this.hatchCycleMinutes = hatchCycleMinutes
            return hatchCycleMinutes
        }
    }
}
</script>

<style scoped>
h1 {
    font-size: 24px;
    margin-bottom: 10px;
}

p {
    font-size: 18px;
}

button {
    margin: 0 .25rem
}
</style>

<template>
    <UContainer>
        <div>
            <h1>Hatch Cycle Timer</h1>
            <div class="grid gap-2 mb-2 md:grid-cols-1 text-center">
                <h1 v-if="currentTimer != null">Current Time: {{ currentTimer.toLocaleTimeString() }}</h1>
                <UDivider />
            </div>
            <div class="grid gap-2 mb-2 md:grid-cols-1">
                <label>Egg-Hatching Second:</label>
                <UInput v-model="eggHatchSecond" />
                <label>Options:</label>
                <UFormGroup label="Donator Status">
                    <UToggle color="primary" v-model="hasDonator" />
                </UFormGroup>
                <UFormGroup label="Flame Body">
                    <UToggle color="primary" v-model="hasFlameBody" />
                </UFormGroup>
                <label>Calculated time for hatch: {{ getHatchCycleMinutes }} minutes</label>
                <label>Seconds before cycle ends for notification sound:</label>
                <div class="grid grid-cols-3">
                    <UInput placeholder="Seconds" v-model="notificationSecondsBefore" />
                </div>
            </div>
            <div class="gap-2 mb-2">
                <UButton @click="startTimer()">Start</UButton>
                <UButton @click="stopTimer()">Stop</UButton>
                <UButton @click="missedInterval()">Missed Interval (+1 cycle)</UButton>
            </div>
            <div class="gap-2 mb-2 text-center" v-if="timerSet">
                <h1 v-if="endTimer != null">End Timer: {{ endTimer.toLocaleTimeString() }}</h1>
                <h3>Cycle ends in {{ remainingTimer }}.</h3>
                <h3 v-if="remainingNotificationTimer != ''">Notification in {{ remainingNotificationTimer }}.</h3>
            </div>
        </div>
        <div class="gap-2 mb-2 grid grid-cols-1">
            <UDivider />
            <div v-if="notificationTimers && notificationTimers.length > 0">
                <label>Notifications:</label>
            </div>
            <label>Notification Options:</label>
            <div class="gap-2 mb-2">
                <label for="default-range" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Audio
                    Volume</label>
                <input id="default-range" v-model="volume" type="range"
                    class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700">
            </div>
            <div class="gap-2 mb-2">
                <UButton @click="playAudio()">Test Audio</UButton>
            </div>
        </div>
    </UContainer>
</template>