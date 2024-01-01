<template>
    <div class="smit-form-group-items" :class="{ 'smit-error': errorMsg }">
        <div class="smit-input">
            <div class="smit-input__icon" :class="iconClass"> </div>
            <input :type="type" :placeholder="placeholder" :value="modelValue"
                @input="$emit('update:modelValue', $event.target.value)">
        </div>
        <div class="error-message">{{ errorMsg }}</div>
    </div>
</template>

<script>

export default {
    name: "smit-input",
    props: {
        modelValue: String,
        errorMsg: String,
        placeholder: String,
        iconClass: String,
        type: {
            type: String,
            default: "text"
        },
    },
    emits: ["update:modelValue"],
}
</script>

<style lang="scss" scoped>
.smit-form-group-items {
    height: 60px;
    display: flex;
    margin-bottom: 10px;
    flex-direction: column;

    &__image {
        width: 20px;
        flex-shrink: 0;
    }

    .smit-input {
        height: 40px;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #e1e1e1;

        &__icon {
            width: 20px;
            margin-right: 5px;
            text-align: center;
        }

        input {
            width: 100%;
            border: none;
            outline: none;
            font-size: 14px;
            background: transparent;

            ::placeholder {
                color: #A6A6A6;
            }
        }
    }


    &__clear-btn {
        width: 14px;
        height: 14px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        padding: 2px;
        background: #d8dada;
        opacity: 0;
        transition: all 0.2s;
    }

    .error-message {
        height: 20px;
        color: red;
        font-size: 13px;
    }
}

.smit-error {
    .smit-input {
        border-color: red;
    }
}
</style>