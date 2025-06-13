import { ref } from 'vue'

const bannerOptions = ref({ 
    type: 'slide',
    arrows: false, 
    perPage: 5,
    perMove: 1,
    rewind: true,
    rewindByDrag: true,
    autoplay: true,
    interval: 3000,
    pause: false,
    speed: 400,
});



export function useSlider() {

  return {
    bannerOptions
  }
}
