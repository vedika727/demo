import { Component, Input, ViewChild, ElementRef, OnInit ,ViewEncapsulation } from '@angular/core';
import * as D3 from "d3";

@Component({
  selector: 'home-pie-chart',
  templateUrl: 'home-pie-chart.html',
  encapsulation: ViewEncapsulation.None  //No view encapsulation for D3 components
})

/**
 * @author Manish Khedekar
 * @description Piechart component for Homepage
 */
export class HomePieChartComponent{
  @ViewChild("containerPieChart") element: ElementRef;
  @Input('isLoggedIn') isLoggedIn:boolean;
  @Input('PolicyPieData') PolicyPieData:any;
  private data:any;
  private host: D3.Selection; //host to select element on page
  private svg: D3.Selection; //svg element variable
  private width: number;
  private height: number;
  private radius: number;
  private htmlElement: HTMLElement;
  
  /**
   * @description data for piechart
   */
  //  any = [
  //   {
  //     label: "Life",
  //     value: "2,000,000",
  //     icon:
  //       "assets/scbl-icons/life-coverage"
  //   },
  //   {
  //     label: "Accident",
  //     value: "1,000,000",
  //     icon:
  //       "assets/scbl-icons/accident"
  //   },
  //   {
  //     label: "Cancer",
  //     value: "5,346,000",
  //     icon:
  //       "assets/scbl-icons/cancer"
  //   },
  //   {
  //     label: "Illness",
  //     value: "",
  //     icon: "assets/scbl-icons/illness"
  //   },
  //   {
  //     label: "Medicine",
  //     value: "",
  //     icon:
  //       "assets/scbl-icons/medicine"
  //   },
  //   {
  //     label: "IPD",
  //     value: "",
  //     icon:
  //       "assets/scbl-icons/ipd"
  //   },
  //   {
  //     label: "OPD",
  //     value: "",
  //     icon: "assets/scbl-icons/hospital-opd"
  //   }
  // ];

  /**
   * @description method to load script aftet template loading
   */
  ngAfterViewInit() {
    this.data = this.PolicyPieData;

    this.htmlElement = this.element.nativeElement;
    this.host = D3.select(this.htmlElement);
    this.setup();
    this.buildSVG();
    this.buildPie();
    console.log(this.isLoggedIn);
  }

  /**
   * @description setting up the parameters
   */
  private setup(): void {
    this.width = 500;
    this.height = 500;
    this.radius = Math.min(this.width, this.height) / 2;
  }

  /**
   * @description building svg
   */
  private buildSVG(): void {
    this.host.html("");
    this.svg = this.host
      .append("svg")
      .data([this.data])
      .attr("viewBox", `0 0 ${this.width} ${this.height}`)
      .append("g")
      .attr("transform", `translate(${this.width / 2},${this.height / 2})`)
      .attr("fill", "dark");
  }

  /**
   * @description building pie
   */
  private buildPie(): void {
    let pie = D3.pie().value(this.pieValues);
    let arcSelection = this.svg
      .selectAll(".arc")
      .data(pie)
      .enter()
      .append("g")
      .attr("class", "arc")
      .style("text-anchor","middle")
      .attr("stroke","#ffffff")
      .attr("stroke-width","6px");
    this.populatePie(arcSelection);
  }

  /**
   * @description paiting the pie
   */
  private pieColor = function(d, i) {
    if(this.isLoggedIn)
    {
      if (d.data.value != 0) {
         return "#5B4583";
       } else {
         return "#F8F6F4";
       }
    }
    else {
      return "#F8F6F4";
    }
  };

   /**
   * @description changing radiuses for pie chart
   */
  private pieRadius(datum: any) {
      let outerRadius = this.radius - 20;
      return outerRadius;
  }

   /**
   * @description putting pie values if available
   */
  private pieValues() {
    let angle = 100 / 7; // dividing pie into 7 charts
    return angle;
  }

   /**
   * @description populating pie
   */
  private populatePie(arcSelection: D3.Selection<D3.Arc>): void {
    let innerRadius = 50;
    let arc = D3
      .arc<D3.Arc>()
      .outerRadius(datum => this.pieRadius(datum))
      .innerRadius(innerRadius)
      .startAngle(function(d) {
        return d.startAngle;
      })
      .endAngle(function(d) {
        return d.endAngle;
      });

  /**
   * @description Feeling path with color
   */
    arcSelection
      .append("path")
      .attr("fill", (datum, index) => {
        return this.pieColor(datum, index);
      })
      .transition()
      .duration(function(d, i) {
        return 800;
      })
      .attrTween("d", function(d) {
        let i = D3.interpolate(d.startAngle + 0.1, d.endAngle);
        return function(t) {
          d.endAngle = i(t);
          return arc(d);
        };
      });

  /**
   * @description Appending coverage icon image
  //  */
    arcSelection
    .append("svg:image")
    .attr("transform", function(d) {
      let x, y;

      if (d.startAngle == 0) {
        x = arc.centroid(d)[0] - 40;
        y = arc.centroid(d)[1] - 40;
        return "translate(" + x + "," + y + ")";
      } else if (d.startAngle == 0.8975979010256551) {
        x = arc.centroid(d)[0] - 30;
        y = arc.centroid(d)[1] - 40;
        return "translate(" + x + "," + y + ")";
      } else if (d.startAngle == 1.7951958020513101) {
        x = arc.centroid(d)[0] - 30;
        y = arc.centroid(d)[1] - 40;
        return "translate(" + x + "," + y + ")";
      } else if (d.startAngle == 2.692793703076965) {
        x = arc.centroid(d)[0] - 30;
        y = arc.centroid(d)[1] - 40;
        return "translate(" + x + "," + y + ")";
      } else if (d.startAngle == 3.5903916041026203) {
        x = arc.centroid(d)[0] - 40;
        y = arc.centroid(d)[1] - 30;
        return "translate(" + x + "," + y + ")";
      } else if (d.startAngle == 4.487989505128275) {
        x = arc.centroid(d)[0] - 40;
        y = arc.centroid(d)[1] - 40;
        return "translate(" + x + "," + y + ")";
      } else if (d.startAngle == 5.38558740615393) {
        x = arc.centroid(d)[0] - 40;
        y = arc.centroid(d)[1] - 45;
        return "translate(" + x + "," + y + ")";
      }
    })
    .attr("xlink:href", function(d) {
      if(this.isLoggedIn)
      {
        if (d.data.value != 0) {
  
          return d.data.icon+"-white.svg";
         } else {
          return d.data.icon+"-grey.svg";
         }
      }
      else {
        return d.data.icon+"-grey.svg";
      }
    })
    .attr("width", d => {
        return 85;
    })
    .attr("height", d => {
        return 85;
    })
    .style("opacity", "0")
    .transition()
    .duration(9000) // 3 seconds
    .style("opacity", "100");
  }  
}
