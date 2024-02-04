import { ApexAnnotations, ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexFill, ApexMarkers, ApexStroke, ApexTitleSubtitle, ApexTooltip, ApexXAxis, ApexYAxis, ChartComponent } from "ng-apexcharts"


export type BaseChartOptions = {
    chart: ApexChart;
    dataLabels: ApexDataLabels;
    colors: any;
}

export type ChartOptions = BaseChartOptions & {
    series: ApexAxisChartSeries;
    dataLabels: ApexDataLabels;
    markers: ApexMarkers;
    title: ApexTitleSubtitle;
    fill: ApexFill;
    chart: ApexChart;
    xaxis: ApexXAxis;
    yaxis: ApexYAxis;
    tooltip: ApexTooltip;
    stroke: ApexStroke;
    annotations: ApexAnnotations;
    grid: any;
    colors: any;
    toolbar: any;
}

export const baseChartOptions: BaseChartOptions = {
    chart: {
        height: 350,
        type: "area",   // override in actual
        stacked: false,   // override in actual
        zoom: {
          type: "x",
          enabled: true,
          autoScaleYaxis: true
        },
        toolbar: {
            show: true,
            offsetX: 0,
            offsetY: 0,
            tools: {
              download: false,
              selection: false,
              zoom: false,
              zoomin: true,
              zoomout: true,
              pan: false,
              reset: true,
              customIcons: []
            },
            autoSelected: 'zoom' 
        }
    },
    dataLabels: { enabled: false },
    colors: ['#f396c0', '#a1d354', '#ffa000', '#20c997', '#e83e8c', '#51c8ee']
}