import { Component, OnInit } from "@angular/core";
import { AppService } from "../app.service";

@Component({
  selector: "app-how-it-works",
  templateUrl: "./how-it-works.component.html",
  styleUrls: ["./how-it-works.component.css"]
})
export class HowItWorksComponent implements OnInit {
  endlessData: any = [];
  step = "";
  title = "";
  body = "";
  constructor(private api: AppService) {}
  getEndlessData() {
    //subscribe to api and get data
    this.api.getEndlessDataChunks().subscribe(data => {
      //loop through data results and add to new "endlessData" array
      for (const d of data as any) {
        //load new array with results data
        this.endlessData.push({
          id: d.id,
          stepNumber: d.stepNumber,
          versionContent: d.versionContent
        });
      }
      //sort the results data by stepNumber
      this.endlessData.sort(function(a, b) {
        return parseFloat(a.stepNumber) - parseFloat(b.stepNumber);
      });

      for (var x = 0; x < this.endlessData.length; x++) {
        if (this.endlessData[x].versionContent.length > 1) {
          var newestEntryDate = new Date(
            this.endlessData[x].versionContent[0].effectiveDate
          );
          for (var c = 1; c < this.endlessData[x].versionContent.length; c++) {
            if (
              new Date(this.endlessData[x].versionContent[c].effectiveDate) >
              newestEntryDate
            ) {
              this.step = this.endlessData[x].stepNumber;
              this.title = this.endlessData[x].versionContent[c].title;
              this.body = this.endlessData[x].versionContent[c].body;
              console.log(this.step);
              console.log(this.endlessData[x].versionContent[c]);
            }
            if (
              this.endlessData[x].versionContent.length == 2 &&
              new Date(this.endlessData[x].versionContent[c].effectiveDate) <
                newestEntryDate
            ) {
              this.step = this.endlessData[x].stepNumber;
              this.title = this.endlessData[x].versionContent[0].title;
              this.body = this.endlessData[x].versionContent[0].body;
              console.log(this.step);
              console.log(this.endlessData[x].versionContent[0]);
            }
          }
        } else {
          this.step = this.endlessData[x].stepNumber;
          this.title = this.endlessData[x].versionContent[0].title;
          this.body = this.endlessData[x].versionContent[0].body;
          console.log(this.step);
          console.log(this.endlessData[x].versionContent[0]);
        }
      }
    });
  }
  ngOnInit() {
    this.getEndlessData();
  }
}
