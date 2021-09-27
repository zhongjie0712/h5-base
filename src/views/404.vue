<template>
  <div class="http404">
    <div class="pic-404">
      <img src="@/assets/images/404_images/404.png" alt="404" />
      <div class="bullshit">
        <div class="bullshit__oops">No Page!</div>
        <div class="bullshit__info">请检查您输入的网址是否正确</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.http404 {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background: #f0f2f5;
  .pic-404 {
    position: relative;
    left: 10%;
    top: 20%;
    width: 100%;
    img {
      width: 100%;
    }
  }
  .bullshit {
    position: relative;
    width: 500px;
    margin: 100px auto 0;
    &__oops {
      font-size: 32px;
      font-weight: bold;
      color: #1482f0;
      opacity: 0;
      margin-bottom: 20px;
      animation-name: slideUp;
      animation-duration: 0.5s;
      animation-fill-mode: forwards;
    }
    &__info {
      color: grey;
      opacity: 0;
      animation-name: slideUp;
      animation-duration: 0.5s;
      animation-delay: 0.2s;
      animation-fill-mode: forwards;
    }

    @keyframes slideUp {
      0% {
        transform: translateY(60px);
        opacity: 0;
      }
      100% {
        transform: translateY(0);
        opacity: 1;
      }
    }
  }
}
</style>
