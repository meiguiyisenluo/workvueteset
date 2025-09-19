<template>
  <div class="phone-pic">
    <div class="phone-pic__bg">
      <div class="intance-info-box">
        <p>云机{{ id }}</p>
        <input type="color" @input="onInput" :value="background" />
        <input type="file" @change="onChange" />
      </div>
      <div
        class="phone-pic__cover"
        :style="{
          background,
        }"
      >
        <img :src="dataSource" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: { id: Number },
  data() {
    return {
      background: '#ffffff',
      dataSource: '',
    }
  },
  methods: {
    onInput(e) {
      this.dataSource = ''
      this.background = e.target.value
    },
    onChange(e) {
      const fr = new FileReader()
      fr.onload = (e) => {
        this.background = ''
        this.dataSource = e.target.result
      }
      fr.readAsDataURL(e.target.files[0])
    },
  },
}
</script>

<style lang="less" scoped>
.phone-pic {
  position: relative;
  height: 100%;
  .phone-pic__bg {
    height: 100%;
    .intance-info-box {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      p {
        mix-blend-mode: difference;
        color: #fff;
      }
    }
    .phone-pic__cover {
      height: 100%;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
