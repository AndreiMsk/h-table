<template>
    <section class="tableFixHeadAndColumnWrapper" @scroll.native="handleScroll">
        <table border="0" cellpadding="0" cellspacing="0">

            <!-- table header: shows filters -->
            <thead ref="thead">
                <tr>
                    <th>
                        <SearchQuestion v-model="searchQuery" @reset="handleResetSearch" />
                    </th>
                    <th v-for="(filter, index) in filters" :key="index">
                        <span class="th-data">
                            {{ filter[language] }}
                        </span>
                    </th>
                </tr>
            </thead>

            <!-- table data containing questions and results -->
            <tbody>
                <template v-if="data.length && clonedQuestions.length">
                    <tr v-for="(question, index) in clonedQuestions" :key="index" :class="{ striped: index % 2 }">
                        <td ref="question">
                            <span class="td-data-question flex align-center"> {{ question.labels[language] }}</span>
                        </td>

                        <td v-for="filter in filters" :key="filter._id">
                            <span class="td-data-score flex justify-center align-center">
                                <span :class="[scoreClassification(data(filter, question)), 'score-box']">{{
                                data(filter, question) }}</span>
                            </span>
                        </td>
                    </tr>
                </template>

                <!-- placeholder for no results -->
                <div class="flex justify-center align-center flex-col no-results-text" v-else>
                    <AlertIcon />
                    <h2>There are no results to show</h2>
                </div>

            </tbody>
        </table>
    </section>
</template>
<script setup>

import { onMounted, ref, computed } from "vue";
import { storeToRefs } from "pinia";
import { useUxStore } from "../stores/ux.store";
import { useDataTableStore } from "../stores/data-table.store";
import SearchQuestion from "../components/DataTable/SearchQuestion.vue";
import AlertIcon from "../components/Icons/AlertIcon.vue";

/** reactive data from UX Pinia Store */
const { language } = storeToRefs(useUxStore());

/** reactive data from Pinia Store */
const { filters, questions, scores } = storeToRefs(useDataTableStore());

/** reactive : search query synced with Search Component */
const searchQuery = ref(null);

/** reactive template refs to access sticky header and column */
const thead = ref(null);
const question = ref(null);



/** Vue Lifecycle : simulate getting data from API */
onMounted(() => {
    /** simulate calls to an external API to get results and other data */
    /** can be a singular call or multiple calls depending on how the API is setup */
    getDataTableFilters();
    getDataTableQuestions();
    getDataTableScores();
});


/** methods - get Filters, Questions and Scores from API */
const { getDataTableFilters, getDataTableQuestions, getDataTableScores } = useDataTableStore();

/** method that maps the results with questions and filters */
function data(filter, question) {
    const data = scores.value
        .filter((score) => score.question_id === question._id)[0]
        .scores.flat()
        .find((td) => td.filter_id === filter._id).value;

    return parseFloat(data).toFixed(1);
}

/** method: add class dinamically depending on the score */
function scoreClassification(score) {
    const scoreValue = Math.round(score / 10);
    return `score_${scoreValue}`;
}

/** method: resets the search on emit event */
function handleResetSearch() {
    searchQuery.value = null;
}

/** method: on scroll event callback function - handles sticky positioning */
function handleScroll(event) {

    /** vertically scrolling */
    thead.value.style.transform = `translateY(${event.target.scrollTop}px)`;

    /** horizontally scrolling */
    question.value.forEach(question => (question.style.transform = `translateX(${event.target.scrollLeft}px)`));
}


/** computed: filtered questions */
const clonedQuestions = computed(() => {
    if (!searchQuery.value) return questions.value;

    /** real life scenario would have a debounce applied */
    return [...questions.value].filter((question) => {
        return question.labels[language.value]
            .toLocaleLowerCase()
            .includes(searchQuery.value.toLocaleLowerCase());
    });
});

</script>
