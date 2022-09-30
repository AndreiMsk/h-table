import { defineStore } from "pinia";
import filters from '../data/filters.json'
import questions from '../data/questions.json'
import scores from '../data/scores.json'

export const useDataTableStore = defineStore({
    id: "data-table",

    state: () => ({
        filters: [],
        questions: [],
        scores: []
    }),

    actions: {
        async getDataTableFilters() {
            try {
                /** simulate a call to API here and set the response to pinia filters */
                this.filters  = filters;

                return Promise.resolve(filters);
            } catch (error) {
                return Promise.reject(error);
            }
        },
        async getDataTableQuestions() {
            try {
                /** simulate a call to API here and set the response to pinia questions */
                this.questions  = questions;

                return Promise.resolve(questions);
            } catch (error) {
                return Promise.reject(error);
            }
        },
        async getDataTableScores() {
            try {
                /** simulate a call to API here and set the response to pinia scores */
                this.scores  = scores;

                return Promise.resolve(scores);
            } catch (error) {
                return Promise.reject(error);
            }
        }
    },
});
