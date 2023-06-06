<template>
  <div class="page-404-container">
    <div class="page-404" />
    <div class="pic-404">
      <img class="pic-404__parent" src="../../assets/images/404/404.png" alt="404" />
      <img class="pic-404__child left" src="../../assets/images/404/404-cloud.png" alt="404" />
      <img class="pic-404__child mid" src="../../assets/images/404/404-cloud.png" alt="404" />
      <img class="pic-404__child right" src="../../assets/images/404/404-cloud.png" alt="404" />
    </div>
    <div class="text-404">
      <p class="text-404-title"> 很抱歉! </p>
      <span class="text-404-tip"> 您访问的页面走丢了~~~ </span>
      <a href="/" class="text-404__return-home">返回首页</a>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.page-404-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  .pic-404 {
    position: relative;
    float: left;
    width: 600px;
    overflow: hidden;

    &__parent {
      width: 100%;
    }

    &__child {
      position: absolute;

      &.left {
        width: 80px;
        top: 17px;
        left: 220px;
        opacity: 0;
        animation-name: cloudLeft;
        animation-duration: 2s;
        animation-timing-function: linear;
        animation-fill-mode: forwards;
        animation-delay: 1s;
      }

      &.mid {
        width: 46px;
        top: 10px;
        left: 420px;
        opacity: 0;
        animation-name: cloudMid;
        animation-duration: 2s;
        animation-timing-function: linear;
        animation-fill-mode: forwards;
        animation-delay: 1.2s;
      }

      &.right {
        width: 62px;
        top: 100px;
        left: 500px;
        opacity: 0;
        animation-name: cloudRight;
        animation-duration: 2s;
        animation-timing-function: linear;
        animation-fill-mode: forwards;
        animation-delay: 1s;
      }

      @keyframes cloudLeft {
        0% {
          top: 17px;
          left: 220px;
          opacity: 0;
        }

        20% {
          top: 33px;
          left: 188px;
          opacity: 1;
        }

        80% {
          top: 81px;
          left: 92px;
          opacity: 1;
        }

        100% {
          top: 97px;
          left: 60px;
          opacity: 0;
        }
      }

      @keyframes cloudMid {
        0% {
          top: 10px;
          left: 420px;
          opacity: 0;
        }

        20% {
          top: 40px;
          left: 360px;
          opacity: 1;
        }

        70% {
          top: 130px;
          left: 180px;
          opacity: 1;
        }

        100% {
          top: 160px;
          left: 120px;
          opacity: 0;
        }
      }

      @keyframes cloudRight {
        0% {
          top: 100px;
          left: 500px;
          opacity: 0;
        }

        20% {
          top: 120px;
          left: 460px;
          opacity: 1;
        }

        80% {
          top: 180px;
          left: 340px;
          opacity: 1;
        }

        100% {
          top: 200px;
          left: 300px;
          opacity: 0;
        }
      }
    }
  }

  .text-404 {
    display: flex;
    flex-direction: column;

    .text-404-title {
      color: $primary;
      font-size: 32px;
    }

    .text-404-tip {
      color: #666666;
      font-size: 18px;
      margin-top: 20px;
    }

    .text-404__return-home {
      width: fit-content;
      color: #ffffff;
      background-color: $primary;
      font-size: 16px;
      padding: 10px 15px;
      border-radius: 4px;
      margin-top: 20px;
    }
  }
}
</style>
