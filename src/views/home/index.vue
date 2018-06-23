<template>
    <div>
        <vpronavbar></vpronavbar>
        <router-view></router-view>
        <vprofooter></vprofooter>
    </div>
</template>
<style>
</style>
<script>
  import vpronavbar from './components/navbar.vue'
  import vprofooter from './components/footer.vue'
  export default{
    components: {
      vpronavbar,
      vprofooter
    }
  }
</script>