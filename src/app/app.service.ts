import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

const endlessAPIurl =
  "https://uqnzta2geb.execute-api.us-east-1.amazonaws.com/default/FrontEndCodeChallenge";

@Injectable({
  providedIn: "root"
})
export class AppService {
  constructor(private http: HttpClient) {}
  getEndlessDataChunks() {
    var data = this.http.get(endlessAPIurl);
    console.log(data);
    return data;
  }
}
