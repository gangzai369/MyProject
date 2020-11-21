<template>
  <div>
    <div id="box"></div>
    <div id="boxs"></div>
  </div>
</template>

<script>
import echart from "echarts";
export default {
  data() {
    return {};
  },
  mounted() {
    let myChart = echart.init(document.getElementById("box"));
    let boxs = echart.init(document.getElementById("boxs"));
    let options = {
      title: {
        text: "本后台近一周使用情况",
        subtext: "仅供参考",
        left: "center",
      },
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c} ({d}%)",
      },
      legend: {
        orient: "vertical",
        left: "left",
        data: [
          "星期一",
          "星期二",
          "星期三",
          "星期四",
          "星期五",
          "星期六",
          "星期日",
        ],
      },
      series: [
        {
          name: "访问来源",
          type: "pie",
          radius: "55%",
          center: ["50%", "60%"],
          data: [
            { value: 335, name: "星期一" },
            { value: 310, name: "星期二" },
            { value: 234, name: "星期三" },
            { value: 135, name: "星期四" },
            { value: 548, name: "星期五" },
            { value: 110, name: "星期六" },
            { value: 800, name: "星期日" },
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
    let option = {
      color: ["#9966cc"],
      title: {
        text: "本后台近一周使用情况",
        subtext: "仅供参考",
        left: "center",
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
        },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: "value",
        },
      ],
      series: [
        {
          name: "直接访问",
          type: "bar",
          barWidth: "60%",
          data: [335,310,234,135,548,110,800],
        },
      ],
    };
    boxs.setOption(option);
    myChart.setOption(options);
  },
  methods: {},
};
</script>

<style lang='' scoped>
#box {
  display: inline-block;
  width: 400px;
  height: 300px;
  margin-right: 150px;
  margin-left: 80px;
  margin-top: 50px;
}
#boxs {
  display: inline-block;
  width: 400px;
  height: 300px;
  margin-top: 50px;
}
</style>