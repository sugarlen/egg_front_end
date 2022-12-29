<template>
  <div class="main">
    <div class="scroll-back" ref="srollBack">
      <span>
        1<br />
        1<br />1<br />1<br />1<br />1<br />1<br />1<br />1<br />1<br />1<br />1<br />1<br />1<br />1<br />1<br />
      </span>
    </div>
    <div class="jd-user-details__content">
      <ul>
        <li v-for="item in data" :key="item.key">
          <span>{{ item.title }}</span>
          <span>{{ item.value }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import scroll from "../../utils/scroll.js";
export default {
  name: "shake",
  data() {
    return {
      data: [
        {
          key: 1,
          value:
            "是的囧AV金丝豆AV酒叟大局iOS大剧哦ID数据哦isadVNis大V斯奥的爱豆以接收到以疾跑是的囧AV金丝豆AV酒叟大局iOS大剧哦ID数据哦isadVNis大V斯奥的爱豆以接收到以疾是的囧AV金丝豆AV酒叟大局iOS大剧哦ID数据哦isadVNis大V斯奥的爱豆以接收到以疾",
          title: 3,
        },
        {
          key: 1,
          value: "是的囧AV金丝豆AV酒叟大局iOS大剧哦ID数据哦is",
          title: 3,
        },
        { key: 1, value: 2, title: 3 },
      ],
    };
  },
  created() {},
  mounted() {
    const scrollView = new scroll({
      box: this.$refs.srollBack,
      ctrlsVisible: true,
    });
    console.log(scrollView);
  },
  methods: {},
};
</script>
<style lang="less">
.main {
  width: 100%;
  height: 100%;
}
.scroll-back {
  height: 500px;
  width: 60%;
  background-color: beige;
}
.jd-user-details__content {
  width: 100%;
  padding-top: 20px;
  & ul {
    list-style-type: none;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
  }
  & ul li {
    width: 50%;
    height: 48px;
    & > span:first-child {
      width: 164px;
      height: 100%;
      display: inline-block;
      float: left;
      border: 1px solid rgba(229, 230, 235, 1);
      background: rgba(247, 248, 250, 1);
    }
    & > span:last-child {
      width: calc(100% - 168px);
      height: 100%;
      display: inline-block;
      border: 1px solid rgba(229, 230, 235, 1);
      overflow: hidden;
      line-height: 48px;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>