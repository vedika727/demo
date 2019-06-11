import { Component, ViewChild, ElementRef, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ModalServiceProvider } from "../../providers/modal-service/modal-service";
import * as D3 from "d3";
import { TotalCoveragePage } from "../../pages/pages";
import { HomePdServiceProvider } from '../../providers/homepage-module/home-pd-service/home-pd-service';
import { LoadingServiceProvider } from '../../providers/ion-service/loading-service';

/**
 * @author Manish Khedekar
 * @description Piechart component for Dashboard
 */
@Component({
  selector: 'detail-policy-piechart',
  templateUrl: 'detail-policy-piechart.html',
  encapsulation: ViewEncapsulation.None  //No view encapsulation for D3 components
})
export class DetailPolicyPiechartComponent implements OnInit {
  totalcoverage1: { label: any; value: any; icon: string; }[];
  @Input("inn") totalcoverage: any[];
  @Input("coverageData") coveragedata: any[];
  @ViewChild("containerPieChart") element: ElementRef;
  private host: D3.Selection; //host to select element on page
  private svg: D3.Selection; //svg element variable
  private width: number;
  private height: number;
  private radius: number;
  private htmlElement: HTMLElement;
  private arcSelection: any;
  public rotation: string;
  public wheelValue: string;
  public wheelTitle: string;
  public currentPieIndex: any;
  piechartAPIData:any = [];
  pieChartData:any=[];
  //data for piechart
  private data: any;
  public linkStatus:boolean= true ;
  /**
   * @description method to load script aftet template loading
   */
  constructor(public modalService: ModalServiceProvider,  public homePdService:HomePdServiceProvider,
    public loadingService: LoadingServiceProvider,) { 
  
  }

  ngOnInit() {
    this.data = this.totalcoverage;

    console.log("This is data from component",this.data);
    console.log("This is data from component coverage",this.totalcoverage);
    console.log("this . coverage data ",this.coveragedata)
   
    
    console.log("status of link ", this.linkStatus);
    // this.data = this.totalcoverage;
    this.htmlElement = this.element.nativeElement;
    this.host = D3.select(this.htmlElement);
    this.setup();
    this.buildSVG();
    this.buildPie();
    this.populateWheel();
    this.populatePie(this.arcSelection);
    
} 
  /**
   * @description populate Spin-wheel at the start
   */
  private populateWheel() {
    for (let policy in this.data) {
      let index: number = Number(policy);
      if (this.data[policy].value != 0) {
        this.currentPieIndex = policy;
        this.wheelTitle = this.data[policy].label;
        this.wheelValue = this.data[policy].value;
        let angle = Math.PI + (0.8975979010256551 * ++index) - 0.44879895051282753;
        this.rotation = "rotate(" + angle + "rad)";
        break;
      }
    }
  }
  
  /**
   * @description setting up the parameters
   */
  private setup(): void {
    this.width = 400;
    this.height = 400;
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
      .attr("stroke", "red")
      .attr("stroke-width", "4px");
  }
  
  /**
   * @description building pie
   */
  private buildPie(): void {
    let pie = D3.pie().value(this.pieValues);
    this.arcSelection = this.svg
      .selectAll(".arc")
      .data(pie)
      .enter()
      .append("g")
      .attr("class", "arc")
      .attr("stroke", "#ffffff")
      .attr("stroke-width", "4px")
      .style("text-anchor", "middle")
      .on("click", (datum, i) => this.getPieValues(datum, i, this.arcSelection));
  }
  
  /**
   * @description method to append value and policy label
   */
  getPieValues(datum, currentIndex: any, arcSelection: D3.Selection<D3.Arc>) {
    if (datum.data.value === 0) {

    }
    else {
      let angle = Math.PI + datum.endAngle - 0.44879895051282753;
      this.rotation = "rotate(" + angle + "rad)";
      this.wheelTitle = datum.data.label;
      this.wheelValue = datum.data.value;
      this.currentPieIndex = currentIndex;
      arcSelection.selectAll("path")
        .attr('fill', (d) => this.pieColor(d));
      arcSelection.selectAll("image")
        .attr('width', (datum) => this.hoverIcon(datum))
        .attr('height', (datum) => this.hoverIcon(datum));
    }
  }
  
  /**
   * @description method to append animation
   */
  private hoverIcon(d: any) {
    if (d.data.value != 0) {
      if (d.data.label === this.wheelTitle) {
        return 72;
      }
      else {
        return 64;
      }
    } else {
      return 64;
    }
  }
  
  /**
   * @description paiting the pie
   */
  private pieColor = function (d) {
    if (d.data.value != 0) {
      if (d.data.label === this.wheelTitle) {
        return "#4E2A81";
      }
      else {
        return "#A573EA";
      }
    } else {
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
    let innerRadius = 0;
    let arc = D3
      .arc<D3.Arc>()
      .outerRadius(datum => this.pieRadius(datum))
      .innerRadius(innerRadius)
      .startAngle(function (d) {
        return d.startAngle;
      })
      .endAngle(function (d) {
        return d.endAngle;
      });

    //Feeling path with color
    arcSelection
      .append("path")
      .attr("fill", (datum, index) => {
        return this.pieColor(datum);
      })
      .transition()
      .duration(function (d, i) {
        return 800;
      })
      .attrTween("d", function (d) {
        let i = D3.interpolate(d.startAngle + 0.1, d.endAngle);
        return function (t) {
          d.endAngle = i(t);
          return arc(d);
        };
      });

    //Appending coverage icon image
    arcSelection
      .append("svg:image")
      .attr("transform", function (d) {
        let x, y;
        if (d.startAngle == 0) {
          x = arc.centroid(d)[0] - 20;
          y = arc.centroid(d)[1] - 60;
          return "translate(" + x + "," + y + ")";
        } else if (d.startAngle == 0.8975979010256551) {
          x = arc.centroid(d)[0];
          y = arc.centroid(d)[1] - 40;
          return "translate(" + x + "," + y + ")";
        } else if (d.startAngle == 1.7951958020513101) {
          x = arc.centroid(d)[0];
          y = arc.centroid(d)[1];
          return "translate(" + x + "," + y + ")";
        } else if (d.startAngle == 2.692793703076965) {
          x = arc.centroid(d)[0] - 35;
          y = arc.centroid(d)[1];
          return "translate(" + x + "," + y + ")";
        } else if (d.startAngle == 3.5903916041026203) {
          x = arc.centroid(d)[0] - 60;
          y = arc.centroid(d)[1] - 10;
          return "translate(" + x + "," + y + ")";
        } else if (d.startAngle == 4.487989505128275) {
          x = arc.centroid(d)[0] - 60;
          y = arc.centroid(d)[1] - 40;
          return "translate(" + x + "," + y + ")";
        } else if (d.startAngle == 5.38558740615393) {
          x = arc.centroid(d)[0] - 40;
          y = arc.centroid(d)[1] - 60;
          return "translate(" + x + "," + y + ")";
        }
      })
      .attr("xlink:href", function (d) {
        if (d.data.value != 0) {
          return d.data.icon + "-white.svg";
        } else {
          return d.data.icon + "-grey.svg";
        }
      })
      .attr('width', (datum) => this.hoverIcon(datum))
      .attr('height', (datum) => this.hoverIcon(datum))
      .style("opacity", "0")
      .transition()
      .duration(9000) // 3 seconds
      .style("opacity", "100");
  }
  
  /**
   * @description method for modal popup
   */
  showModal() {
    this.coveragedata.forEach((obj)=>{
      if(obj.coverageAmount == "0"){
        // this.linkStatus = false;
        console.log("yoyiuyiyiiyiyiuiuh its gfalse");

      }else{
        this.modalService.presentModal('TotalCoveragePage', { totalcoverage: this.coveragedata });
      }

  })
   
  }
}
