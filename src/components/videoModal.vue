<template>
  <Modal
    mask
    closable
    footer-hide
    v-model="showModal"
    :title="title"
    @on-visible-change="change"
    class-name="video-modal"
  >
    <div class="video-wrap">
      <video
        :src="videoUrl"
        v-if="videoUrl"
        controls
        autoplay
        controlsList="nodownload"
        disablePictureInPicture="true"
      ></video>
      <div v-else>找不到视频地址</div>
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
    width: 100%;
    &:focus {
      outline: none;
    }
  }
}
</style>

<style lang="less">
.video-modal {
  .ark-modal {
    width: 80% !important;
  }

  .ark-modal-body {
    padding: 0;
  }

  .ark-modal-close {
    font-size: 16px;
    transform: scale(1.5);
    opacity: 0.7;
    i {
      color: #fff;
    }
  }
}
</style>
