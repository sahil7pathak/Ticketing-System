<template>
  <div>
    <div>
      <GChart type="ColumnChart" :data="chartData" :options="chartOptions"/>
    </div>
    <hr>
    <b-container>
      <b-row>
        <b-col>
          <GChart
            style="width: 350px; height: 350px;"
            type="PieChart"
            :data="pieChartData"
            :options="pieChartOptions"
          />
        </b-col>
        <b-col>
          <GChart
            style="width: 350px; height: 350px;"
            type="PieChart"
            :data="pieChartData2"
            :options="pieChartOptions2"
          />
        </b-col>
        <b-col>
          <GChart
            style="width: 350px; height: 350px;"
            type="PieChart"
            :data="pieChartData3"
            :options="pieChartOptions3"
          />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>


<script>
import { GChart } from "vue-google-charts";
import { scrypt } from "crypto";
import { Script } from "vm";

export default {
  components: {
    GChart
  },
  data() {
    return {
      chartData: [
        ["Year", "Tickets"],
        ["1990", 668],
        ["1991", 365],
        ["1992", 366],
        ["1993", 365],
        ["1994", 365],
        ["1995", 365],
        ["1996", 366],
        ["1997", 365],
        ["1998", 365],
        ["1999", 365],
        ["2000", 366],
        ["2001", 365],
        ["2002", 365],
        ["2003", 365],
        ["2004", 366],
        ["2005", 365],
        ["2006", 365],
        ["2007", 365],
        ["2008", 366],
        ["2009", 365],
        ["2010", 365],
        ["2011", 365],
        ["2012", 959],
        ["2013", 365],
        ["2014", 365],
        ["2015", 365],
        ["2016", 366],
        ["2017", 9994],
        ["2018", 4495],
        ["2019", 20]
      ],
      pieChartData: [
        ["Ticket Filed Against", "Count"],
        ["Systems", 10072],
        ["Hardware", 2517],
        ["Access/Login", 7636],
        ["Software", 5043]
      ],
      pieChartData2: [
        ["Satisfaction", "Count"],
        ["Unsatisfied", 5310],
        ["Satisfied", 12171],
        ["Highly Satisfied", 7306]
      ],
      pieChartData3: [
        ["Severity", "Count"],
        ["Unclassified", 68],
        ["Minor", 624],
        ["Normal", 22942],
        ["Major", 1268],
        ["Critical", 366]
      ],
      chartOptions: {
        title: "Tickets per year",
        subtitle: "Tickets"
      },
      pieChartOptions: {
        title: "Tickets Filed Against since 1990",
        is3D: true
      },
      pieChartOptions2: {
        title: "Level of satisfaction received since 1990",
        is3D: true
      },
      pieChartOptions3: {
        title: "Level of severity dealt since 1990",
        is3D: true
      }
    };
  }
};
</script>