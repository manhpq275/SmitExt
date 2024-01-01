import store from '@vue-app/store'
import router from '@vue-app/routers'
import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

export const auth = {
  beforeMount(el, binding, vnode) {
    const $toast = useToast()
    const roleUser = convertRole(store.getters.getUserInfo?.role)
    const roleRequired = convertRole(binding.value)
    if (roleUser < roleRequired) {
      el.classList.add('app-lock');
      const role = binding.value === 'member' ? "" : `${binding.value} `
      if (el.lastElementChild) el.lastElementChild.style.pointerEvents = 'none';

      el.addEventListener('click', (event) => {
        $toast.info("This feature will be release in next update version!")
      })
    } else {
      el.classList.remove('app-lock')
      if (el.lastElementChild) el.lastElementChild.style.pointerEvents = 'unset';
    }
  }
}

function convertRole(role) {
  switch (role) {
    case 'member':
      return 1;
    case 'pro':
      return 2;
    case 'premium':
      return 3
    default:
      return 0;

  }
}