<template>
    <UContainer>
        <UBreadcrumb divider="/" :links="[{ label: 'Home', to: '/' }, { label: 'Members', to: '/members' }]" />
        <h1>Members</h1>
        <p>Here are the members of our club:</p>
        <ul>
            <li v-for="member in members" :key="member.name">
                {{ member.name }} [{{ member.rank }}]
            </li>
        </ul>
    </UContainer>
</template>

<script setup>
import { members } from '~/src/data.json'
</script>