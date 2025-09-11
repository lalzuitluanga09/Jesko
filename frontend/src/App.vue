<template>
  <RouterView />
  <Notify/>
  <LoginDialog />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useSetting } from './composables/useSetting';
import { onMounted } from 'vue';
import { useAuthStore } from './stores/auth';
import Notify from './components/notification/Notify.vue';
import LoginDialog from './components/dialogs/LoginDialog.vue';
import { useMeta } from './stores/meta';
import '@vuepic/vue-datepicker/dist/main.css'

const { checkScreenWidth } = useSetting()

checkScreenWidth();
window.addEventListener('resize', checkScreenWidth);

const auth = useAuthStore()
const meta = useMeta()

onMounted(async() => {
  await auth.checkAuth()
  await meta.getMeta()
})

</script>

<style>

@media screen and (max-width: 530px) {
  body {
    margin: 0 2%;
  }
}

</style>
