<template>
  <div class="home">
    <div v-for="(item,index) in moduleLists" :key="index" class="item">
      <p class="title">{{item.title}}</p>
      <component :is="item.component" :current="item"></component>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Welcome from '../components/welcome.vue';

// @ is an alias to /src
export default {
  name: 'Home',
  components: {
    Welcome,
  },
  data() {
    return {
      defaultCol: 2,
    };
  },
  computed: {
    ...mapState({
      moduleLists: ((state) => state.moduleLists),
    }),
  },
};
</script>
