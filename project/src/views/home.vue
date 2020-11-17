<template>
  <div>
    <h1>我是首页</h1>
    <div id="box"></div>
    <div id="boxs"></div>
  </div>
</template>

<script>
import echart from "echarts";
console.log(echart);
export default {
  data() {
    return {};
  },
  mounted() {
    let myChart = echart.init(document.getElementById("box"));
    let boxs = echart.init(document.getElementById("boxs"));
    let options = {
      title: {
        text: "某站点用户访问来源",
        subtext: "纯属虚构",
        left: "center",
      },
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c} ({d}%)",
      },
      legend: {
        orient: "vertical",
        left: "left",
        data: ["直接访问", "邮件营销", "联盟广告", "视频广告", "搜索引擎"],
      },
      series: [
        {
          name: "访问来源",
          type: "pie",
          radius: "55%",
          center: ["50%", "60%"],
          data: [
            { value: 335, name: "直接访问" },
            { value: 310, name: "邮件营销" },
            { value: 234, name: "联盟广告" },
            { value: 135, name: "视频广告" },
            { value: 1548, name: "搜索引擎" },
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      ],
    };
    // 柱状图
    // let option = {
    //   title: {
    //     text: "某站点用户访问来源",
    //     subtext: "纯属虚构",
    //     left: "center",
    //   },
    //   tooltip: {
    //     trigger: "item",
    //     formatter: "{a} <br/>{b} : {c} ({d}%)",
    //   },
    //   legend: {
    //     orient: "vertical",
    //     left: "left",
    //     data: ["直接访问", "邮件营销", "联盟广告", "视频广告", "搜索引擎"],
    //   },
    //   series: [
    //     {
    //       name: "访问来源",
    //       type: "pie",
    //       radius: "55%",
    //       center: ["50%", "60%"],
    //       data: [
    //         { value: 335, name: "直接访问" },
    //         { value: 310, name: "邮件营销" },
    //         { value: 234, name: "联盟广告" },
    //         { value: 135, name: "视频广告" },
    //         { value: 1548, name: "搜索引擎" },
    //       ],
    //       emphasis: {
    //         itemStyle: {
    //           shadowBlur: 10,
    //           shadowOffsetX: 0,
    //           shadowColor: "rgba(0, 0, 0, 0.5)",
    //         },
    //       },
    //     },
    //   ],
    // };
    // boxs.setOption(option);
    myChart.setOption(options);
  },
  methods: {},
};
</script>

<style lang='' scoped>
#box {
  width: 400px;
  height: 300px;
}
</style>