import { ref } from 'vue'
import { useSlider } from './useSlider'

const isDark = ref<boolean>(false)

const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
const storedDarkMode = localStorage.getItem('isDark')

if (storedDarkMode !== null) {
  isDark.value = JSON.parse(storedDarkMode)
} else {
  isDark.value = prefersDark
}

document.documentElement.classList.toggle('dark', isDark.value)

const isMobile = ref(false)

const { bannerOptions } = useSlider()

export function useSetting() {

  const toggleDark = () => {
    isDark.value = !isDark.value
    document.documentElement.classList.toggle('dark', isDark.value)
    localStorage.setItem('isDark', JSON.stringify(isDark.value))

    //For Vue-Select Dark Mode
    // const root = document.documentElement;
    // if (isDark.value) {
    //   root.style.setProperty('--vs-controls-color', '#cccccc');
    //   root.style.setProperty('--vs-border-color', '#cccccc');
    //   root.style.setProperty('--vs-dropdown-bg', '#ffffff');
    //   root.style.setProperty('--vs-dropdown-color', '#333333');
    //   root.style.setProperty('--vs-dropdown-option-color', '#333333');
    //   root.style.setProperty('--vs-selected-bg', '#5897fb');
    //   root.style.setProperty('--vs-selected-color', '#222222');
    //   root.style.setProperty('--vs-search-input-color', '#222222');
    //   root.style.setProperty('--vs-dropdown-option--active-bg', '#5897fb');
    //   root.style.setProperty('--vs-dropdown-option--active-color', 'white');
    // } else {
    //   root.style.setProperty('--vs-controls-color', '#664cc3');
    //   root.style.setProperty('--vs-border-color', '#664cc3');
    //   root.style.setProperty('--vs-dropdown-bg', '#282c34');
    //   root.style.setProperty('--vs-dropdown-color', '#cc99cd');
    //   root.style.setProperty('--vs-dropdown-option-color', '#cc99cd');
    //   root.style.setProperty('--vs-selected-bg', '#664cc3');
    //   root.style.setProperty('--vs-selected-color', '#eeeeee');
    //   root.style.setProperty('--vs-search-input-color', '#eeeeee');
    //   root.style.setProperty('--vs-dropdown-option--active-bg', '#664cc3');
    //   root.style.setProperty('--vs-dropdown-option--active-color', '#eeeeee');
    // }
  }

  const checkScreenWidth = () => {
    isMobile.value = window.innerWidth <= 480
    if (window.innerWidth <= 480) {
      bannerOptions.value.perPage = 2
    } else if (window.innerWidth <= 1024) {
      bannerOptions.value.perPage = 3
    } else {
      bannerOptions.value.perPage = 5
    }
  }

  return {
    isDark,
    toggleDark,
    isMobile,
    checkScreenWidth,
  }
}
