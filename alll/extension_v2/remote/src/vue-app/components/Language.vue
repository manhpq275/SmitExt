<template>
  <div class="language">
    <div class="language-text">Language</div>
    <div class="language-segment">
      <div class="language-segment__btn" :class="language == 'en' && 'selected'" @click="changeLanguage('en')">
        <img src="@images/language-en.svg" class="lang_item" />
      </div>
      <div class="language-segment__btn" :class="language == 'vi' && 'selected'" @click="changeLanguage('vi')">
        <img src="@images/language-vi.svg" class="lang_item" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { useI18n } from 'vue3-i18n'
export default {
  name: "Language",
  setup() {
    const i18n = useI18n()
    const store = useStore();
    const language = computed(() => store.getters.getUserLanguage)
    const changeLanguage = function (lang) {
      store.dispatch('SET_USER_LANGUAGE', lang)
      i18n.setLocale(lang)
    }
    return { language, changeLanguage }
  },
};
</script>

<style lang="scss" scoped>
.language {
  display: flex;
  align-items: center;
  justify-content: center;
}

.language-segment {
  display: flex;
  align-items: end;
  overflow: hidden;
  margin-left: 10px;
  border-radius: 3px;
  background: #9ecdc1;
  justify-content: center;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.15);


  &__btn {
    width: 40px;
    padding: 3px 6px;
    cursor: pointer;

    img {
      width: 100%;
    }

    &.selected {
      background: #fff;
    }
  }
}
</style>