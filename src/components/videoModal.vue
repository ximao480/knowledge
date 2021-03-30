<template>
  <Modal
    mask
    v-model="showModal"
    :title="title"
    @on-visible-change="change"
    width="1200"
  >
    <div class="video-wrap">
      <video
        :src="videoUrl"
        v-if="videoUrl"
        controls
        autoplay
      ></video>
      <div v-else>找不到视频地址</div>
    </div>

    <div slot="footer">
      <Button
        type="primary"
        size="large"
        @click="close"
      >关闭</Button>
    </div>
  </Modal>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'videoModal',

  model: {
    prop: 'visible',
    event: 'change',
  },

  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    videoUrl: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
  },

  watch: {
    visible(newVal) {
      this.showModal = newVal;
    },
  },

  data() {
    return {
      showModal: false,
    };
  },

  methods: {
    close() {
      this.change(false);
    },

    change(e) {
      this.$emit('change', e);
    },
  },
};
</script>

<style lang="less" scoped>
.video-wrap {
  display: flex;
  justify-content: center;
  align-items: center;

  video {
    width: 1000px;
  }
}
</style>
