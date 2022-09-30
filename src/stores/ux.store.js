import { defineStore } from "pinia";

export const useUxStore = defineStore({
    id: "ux",

    state: () => ({
        language: 'en',
        availableLanguages: ['en', 'fr']
    }),
    actions: {
        switchLanguage(language) {
            if( this.language === language ) return;
            this.language = language;
        }
    },
});
