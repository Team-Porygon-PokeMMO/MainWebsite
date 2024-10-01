<script lang="ts">
let currentTimer: Date | null = null
let endTimer: Date | null = new Date()
let notificationEndTimer: Date | null = null
let volume = 100

// Swap these values when a server reset happens to refresh it for all users
let newEggHatchSecondStore = 'eggHatchSecondTwo'
let oldEggHatchSecondStore = 'eggHatchSecond'
export default {
    data() {
        return {
            currentTimer: new Date(),
            endTimer: endTimer as Date | null,
            timerSet: false,
            eggHatchSecond: 50,
            remainingTimer: '',
            remainingSeconds: 0,
            totalSeconds: 0,
            remainingNotificationTimer: '',
            notificationSoundPlayed: true,
            volume: 100,
            notificationTimers: [],
            hasDonator: false,
            hasFlameBody: false,
            hatchCycleMinutes: 6,
            notificationSecondsBefore: 0,
            notificationEndTimer: notificationEndTimer as Date | null,
            isAdvanced: false
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
            this.remainingSeconds = this.totalSeconds - (endTimerDiff / 1000)
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

            let pingMinute = this.getHatchCycleMinutes
            if (this.isAdvanced) {
                pingMinute = this.hatchCycleMinutes
            }
            this.totalSeconds = pingMinute * 60

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

            this.totalSeconds += 60
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
                this.retrieveAdvancedSettings();
                this.retrieveBooleanSettings();
                this.retrieveNumericSettings();
                this.cleanupOldStorage();
            }
        },
        retrieveAdvancedSettings() {
            const isAdvanced = localStorage?.getItem('isAdvanced');
            if (isAdvanced) {
                this.isAdvanced = isAdvanced === 'true';
                const hatchCycleMinutes = localStorage?.getItem('hatchCycleMinutes');
                if (hatchCycleMinutes) {
                    this.hatchCycleMinutes = parseInt(hatchCycleMinutes);
                }
            }
        },
        retrieveBooleanSettings() {
            const hasDonator = localStorage?.getItem('hasDonator');
            const hasFlameBody = localStorage?.getItem('hasFlameBody');
            if (hasDonator) {
                this.hasDonator = hasDonator === 'true';
            }
            if (hasFlameBody) {
                this.hasFlameBody = hasFlameBody === 'true';
            }
        },
        retrieveNumericSettings() {
            const eggHatchSecond = localStorage?.getItem(newEggHatchSecondStore);
            const notificationSecondsBefore = localStorage?.getItem('notificationSecondsBefore');
            const volume = localStorage?.getItem('volume');
            if (eggHatchSecond) {
                this.eggHatchSecond = parseInt(eggHatchSecond);
            }
            if (notificationSecondsBefore) {
                this.notificationSecondsBefore = parseInt(notificationSecondsBefore);
            }
            if (volume) {
                this.volume = parseInt(volume);
            }
        },
        cleanupOldStorage() {
            if (localStorage?.getItem(oldEggHatchSecondStore)) {
                localStorage?.removeItem(oldEggHatchSecondStore);
            }
        },
        saveToLocalStorage() {
            if (process.client) {
                localStorage?.setItem('hasDonator', this.hasDonator.toString())
                localStorage?.setItem('hasFlameBody', this.hasFlameBody.toString())
                localStorage?.setItem(newEggHatchSecondStore, this.eggHatchSecond.toString())
                localStorage?.setItem('notificationSecondsBefore', this.notificationSecondsBefore.toString())
                localStorage?.setItem('volume', this.volume.toString())
                localStorage?.setItem('isAdvanced', this.isAdvanced.toString())
                if (this.isAdvanced) {
                    localStorage?.setItem('hatchCycleMinutes', this.hatchCycleMinutes.toString())
                }
            }
        },
        buttonClick() {
            this.saveToLocalStorage()
            this.startTimer()
        },
        toggleAdvanced() {
            this.stopTimer()
            this.retrieveNumericSettings()
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
            <div class="grid gap-2 mb-2 grid-cols-1 text-center">
                <div>
                    <UTooltip text="This is the current 00:XX second the eggs hatch.">
                        <label for="eggHatchSecond">Egg-Hatch Second</label>
                    </UTooltip> <br />
                    <UTooltip text="This value changes every server reset.">
                        <UInput v-model="eggHatchSecond" />
                    </UTooltip>
                </div>
                <div v-if="!isAdvanced">
                    <label for="eggHatchSecond">Donator Status</label>
                    <br />
                    <UToggle color="primary" v-model="hasDonator" />
                </div>
                <div v-if="!isAdvanced">
                    <label for="eggHatchSecond">Flame Body</label>
                    <br />
                    <UToggle color="primary" v-model="hasFlameBody" />
                </div>
                <div v-if="!isAdvanced">
                    <span>Calculated time for hatch: {{ getHatchCycleMinutes }} minutes</span>
                </div>
                <div v-if="isAdvanced">
                    <label for="hatchCycleMinutes">Notify me after
                        <UTooltip text="This value modifies the cycles timing to get notified for.">
                            <UInput placeholder="Minutes" v-model="hatchCycleMinutes" type="number" size="sm" />
                        </UTooltip>cycles
                    </label>

                </div>
                <div>

                    <label for="notificationSecondsBefore">Seconds before cycle ends for notification
                        sound</label><br />
                    <UTooltip text="Will play the notification sound at specified seconds before the">
                        <UInput placeholder="Seconds" v-model="notificationSecondsBefore" />
                    </UTooltip>
                </div>
                <div>
                    <label for="eggHatchSecond">Advanced Mode</label>
                    <br />
                    <UTooltip text="Let's you modify the number of cycles to get notified for.">
                        <UToggle color="primary" v-model="isAdvanced" @click="toggleAdvanced" />
                    </UTooltip>
                </div>
            </div>
            <div class="mb-2 text-center">
                <UButton icon="i-heroicons-play" color="green" class="text-center" @click="buttonClick()">Start
                </UButton>
                <UButton icon="i-heroicons-stop" color="red" @click="stopTimer()">Stop</UButton>
            </div>
            <div class="mb-2 text-center">
                <UButton icon="i-heroicons-plus" color="orange" @click="missedInterval()">Missed Interval (+1 cycle)
                </UButton>
            </div>
            <div class="gap-2 mb-2 text-center" v-if="timerSet">
                <h1 v-if="endTimer != null">End Timer: {{ endTimer.toLocaleTimeString() }}</h1>
                <h3>Cycle ends in {{ remainingTimer }}.</h3>
                <h3 v-if="remainingNotificationTimer != ''">Notification in {{ remainingNotificationTimer }}.</h3>
                <UProgress :value="remainingSeconds" :max="totalSeconds" indicator size="sm" color="cyan" />
            </div>
        </div>
        <div class="gap-2 mb-2 grid grid-cols-1">
            <UDivider />
            <div v-if="notificationTimers && notificationTimers.length > 0">
                <span>Notifications:</span>
            </div>
            <p>Notification Options</p>
            <div class="gap-2 mb-2">
                <label for="default-range" class="block mb-2 text-sm font-medium">Audio
                    Volume</label>
                <input id="default-range" v-model="volume" type="range"
                    class="w-full h-2 bg-slate-500 rounded-lg appearance-none cursor-pointer">
            </div>
            <div class="gap-2 mb-2">
                <UButton @click="playAudio()">Test Audio</UButton>
            </div>
        </div>
    </UContainer>
</template>