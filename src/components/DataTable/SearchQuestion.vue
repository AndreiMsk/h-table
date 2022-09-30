<template>
    <div class="flex">
        
        <!-- input search box -->
        <input type="text" placeholder="Search question ..." class="search-input" 
            :value="modelValue" 
            @input="$emit('update:modelValue', $event.target.value)" />

            <!-- dismissable button conditionated by the existance of user's typing at least a letter -->
        <button class="search-button" @click="handleResetSearch()">
            <DismissIcon v-if="modelValue" @click="handleResetSearch" />
        </button>

    </div>
</template>
<script setup>
    import DismissIcon from "../Icons/DismissIcon.vue";

    /** Component's props  */
    defineProps({ modelValue: String });

    /** Emits */
    const emit = defineEmits(["update:modelValue", "reset"]);

    /** method: resets the current search */
    function handleResetSearch() {
        return emit("reset");
    }
</script>
