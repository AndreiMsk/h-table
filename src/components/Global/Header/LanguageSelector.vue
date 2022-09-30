<template>
    <ul class="flex justify-center items-center language" v-if="availableLanguages.length">
        <li v-for="(lang, index) in availableLanguages" @click="switchLanguage(lang)" :key="index"
            :class="[lang === language ? 'active' : '']">
            {{lang }}
        </li>
    </ul>
</template>
<script setup>

import { useUxStore } from "../../../stores/ux.store";
import { storeToRefs } from 'pinia';


/** reactive data from UX Pinia Store */
const { language, availableLanguages } = storeToRefs(useUxStore())

/** method: update language switcher */
const { switchLanguage } = useUxStore();

</script>
