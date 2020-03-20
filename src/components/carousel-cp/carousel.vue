<template>
  <el-carousel :interval="4000" type="card" :height="boxHeight+'px'" :autoplay="false">
    <el-carousel-item v-for="(item,index) in bannerlists" :key="index">
      <img :src="require(`../../assets/img/${item}.png`)" ref="imgSize">
    </el-carousel-item>
  </el-carousel>
</template>
<script>
  const CARD_SCALE = 0.5;
  export default {
    name: "carousel",
    props: ['hmsg'],
    data() {
      return {
        boxHeight:'',
        bannerlists:[]
      }
    },
    methods: {
      processIndex(index, activeIndex, length) {
        if (activeIndex === 0 && index === length - 1) {
          return -1;// 活跃页是第一页，当前页是最后一页，返回-1，这样相差为1，表示二者相邻且在左侧
        } else if (activeIndex === length - 1 && index === 0) {
          return length;// 活跃页最后一页，当前页是第一页，返回总页数，这样相差也在1以内
        } else if (index < activeIndex - 1 && activeIndex - index >= length / 2) {
          return length + 1;// 如果，当前页在活跃页前一页的前面，并且之间的间隔在一半页数即以上，则返回页数长度+1，这样它们会被置于最右侧
        } else if (index > activeIndex + 1 && index - activeIndex >= length / 2) {
          return -2; // 如果，当前页在活跃页后一页的后面，并且之间的间隔在一般页数即以上，则返回-2，这样它们会被置于最左侧
        }
        return index;// 其他的返回原值
      },
      // 计算三张卡片位置的方法
      calcCardTranslate(index, activeIndex) {
        const parentWidth = this.$parent.$el.offsetWidth;
        if (this.inStage) {
          return parentWidth * ((2 - CARD_SCALE) * (index - activeIndex) + 1) / 4;
        } else if (index < activeIndex) {
          return -(1 + CARD_SCALE) * parentWidth / 4;
        } else {
          return (3 + CARD_SCALE) * parentWidth / 4;
        }
      },

      calcTranslate(index, activeIndex, isVertical) {
        const distance = this.$parent.$el[isVertical ? 'offsetHeight' : 'offsetWidth'];
        return distance * (index - activeIndex);
      },

      translateItem(index, activeIndex, oldIndex) {
        const parentType = this.$parent.type;
        const parentDirection = this.parentDirection;
        const length = this.$parent.items.length;
        // 判断是否需要过渡动画 class
        if (parentType !== 'card' && oldIndex !== undefined) {
          this.animating = index === activeIndex || index === oldIndex;
        }
        // 处理 index
        if (index !== activeIndex && length > 2 && this.$parent.loop) {
          index = this.processIndex(index, activeIndex, length);
        }
        if (parentType === 'card') {
          if (parentDirection === 'vertical') {
            console.warn('[Element Warn][Carousel]vertical directionis not supported in card mode');
          }
          this.inStage = Math.round(Math.abs(index - activeIndex)) <= 1;
          this.active = index === activeIndex;
          // 计算卡片化偏移量
          this.translate = this.calcCardTranslate(index, activeIndex);
          // 激活卡片不缩放，其他卡片缩放为 0.5
          this.scale = this.active ? 1 : CARD_SCALE;
        } else {
          // 非卡片化
          this.active = index === activeIndex;  // 激活class
          const isVertical = parentDirection === 'vertical';
          this.translate = this.calcTranslate(index, activeIndex, isVertical); // 计算位移 根据父组件宽度计算
        }
        // 计算完后显示
        this.ready = true;
      },

      handleItemClick() {
        const parent = this.$parent;
        if (parent && parent.type === 'card') {
          const index = parent.items.indexOf(this);
          parent.setActiveItem(index);
        }
      }
    },
    mounted() {

      let pros_data = this.hmsg
      if(pros_data == '首页'){
        this.bannerlists = ['home_banner','home_banner','home_banner','home_banner','home_banner','home_banner','home_banner',]
      }
      setTimeout(() => {
        console.log(this.$refs.imgSize[0].height)
        this.boxHeight = this.$refs.imgSize[0].height;
      },100)

      // this.$nextTick(() => {
      //   this.boxHeight = this.$refs.imgSize[0].height * 1.5;
      // })
    }
  }
</script>

<style scoped lang="scss">
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 100px;
    margin: 0;
  }


  .el-carousel__item:nth-child(2n) {

  }

  .el-carousel__item:nth-child(2n+1) {

  }

  element.style {
    transform: translateX(-39.44px) scale(0.83)
  }
</style>
