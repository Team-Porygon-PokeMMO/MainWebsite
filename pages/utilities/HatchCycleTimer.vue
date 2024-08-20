<script lang="ts">
let currentTimer: Date | null = null
let endTimer: Date | null = new Date()
let notificationEndTimer: Date | null = null
let volume = 100
export default {
    data() {
        return {
            currentTimer: new Date(),
            endTimer: endTimer as Date | null,
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
            notificationEndTimer: notificationEndTimer as Date | null
        };
    },
    mounted() {
        this.retrieveLocalStorage();
        this.updateTime();
        let timer = setInterval(this.updateTime, 333);
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
            if (this.endTimer) {
                let endTimer = new Date(this.endTimer)
                this.addMinutesToDate(endTimer, 1)
                this.endTimer = endTimer
            }

            if (this.notificationEndTimer) {
                let notificationEndTimer = new Date(this.notificationEndTimer)
                this.addMinutesToDate(notificationEndTimer, 1)
                this.notificationEndTimer = notificationEndTimer
            }
        },
        sendAlert() {
            if (!this.notificationSoundPlayed) {
                this.playAudio()
                this.notificationSoundPlayed = true
            }
        },
        playAudio() {
            const audio = new Audio('/audio/piano-notification.ogg');
            audio.volume = this.volume / 100;
            audio.play();
        },
        stopTimer() {
            this.endTimer = null
            this.notificationEndTimer = null
            this.timerSet = false
            this.notificationSoundPlayed = true
        },
        retrieveLocalStorage() {
            if (process.client) {
                const hasDonator = localStorage?.getItem('hasDonator')
                const hasFlameBody = localStorage?.getItem('hasFlameBody')
                const eggHatchSecond = localStorage?.getItem('eggHatchSecond')
                const notificationSecondsBefore = localStorage?.getItem('notificationSecondsBefore')
                const volume = localStorage?.getItem('volume')
                const hatchCycleMinutes = localStorage?.getItem('hatchCycleMinutes')
                if (hasDonator) {
                    this.hasDonator = hasDonator === 'true';
                }
                if (hasFlameBody) {
                    this.hasFlameBody = hasFlameBody === 'true';
                }
                if (eggHatchSecond) {
                    this.eggHatchSecond = parseInt(eggHatchSecond);
                }
                if (notificationSecondsBefore) {
                    this.notificationSecondsBefore = parseInt(notificationSecondsBefore);
                }
                if (volume) {
                    this.volume = parseInt(volume);
                }
                if (hatchCycleMinutes) {
                    this.hatchCycleMinutes = parseInt(hatchCycleMinutes);
                }
            }
        },
        saveToLocalStorage() {
            if (process.client) {
                localStorage?.setItem('hasDonator', this.hasDonator.toString())
                localStorage?.setItem('hasFlameBody', this.hasFlameBody.toString())
                localStorage?.setItem('eggHatchSecond', this.eggHatchSecond.toString())
                localStorage?.setItem('notificationSecondsBefore', this.notificationSecondsBefore.toString())
                localStorage?.setItem('volume', this.volume.toString())
                localStorage?.setItem('hatchCycleMinutes', this.hatchCycleMinutes.toString())
            }
        },
        buttonClick() {
            this.saveToLocalStorage()
            this.startTimer()
        }
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
                <label for="eggHatchSecond">Egg-Hatching Second:</label>
                <UInput v-model="eggHatchSecond" />
                <span>Options:</span>
                <UFormGroup label="Donator Status">
                    <UToggle color="primary" v-model="hasDonator" />
                </UFormGroup>
                <UFormGroup label="Flame Body">
                    <UToggle color="primary" v-model="hasFlameBody" />
                </UFormGroup>
                <span>Calculated time for hatch: {{ getHatchCycleMinutes }} minutes</span>
                <label for="hatchCycleMinutes">Notify after {{ hatchCycleMinutes }} cycles.</label>
                <UInput placeholder="Minutes" v-model="hatchCycleMinutes" type="number" />
                <label for="notificationSecondsBefore">Seconds before cycle ends for notification sound:</label>
                <div class="grid grid-cols-3">
                    <UInput placeholder="Seconds" v-model="notificationSecondsBefore" />
                </div>
            </div>
            <div class="gap-2 mb-2">
                <UButton @click="buttonClick()">Start</UButton>
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
                <span>Notifications:</span>
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