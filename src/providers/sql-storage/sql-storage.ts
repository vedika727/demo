import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SQLite } from 'ionic-native';

/*
  Generated class for the SqlStorageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SqlStorageProvider {
  public database:SQLite;
  constructor(public http: HttpClient) {
      this.database = new SQLite();
      this.database.openDatabase({
        name: "data.db",
         location: "default"
       }).then((SQLObj) => {

        console.log("SQL Object : ",SQLObj);
        
          this.database.executeSql("CREATE TABLE IF NOT EXISTS people (id INTEGER PRIMARY KEY AUTOINCREMENT, firstname TEXT, lastname TEXT)", {})
            .then((data) => {
                console.log("TABLE CREATED: ", data);
               alert('db and table created ');
            }, (error) => {
                console.error("Unable to execute sql", error);
            })
        }, (error) => {
            console.error("Unable to open database", error);
        });
  
}
public add() {
this.database.executeSql("INSERT INTO userdata () VALUES ('', '')", []).then((data) => {
        
    }, (error) => {
        console.log("ERROR: " + JSON.stringify(error.err));
    });
}
public select() {
   this.database.executeSql("SELECT * FROM userdata", []).then((data) => {
   }, (error) => {
       console.log("ERROR: " + JSON.stringify(error));
   });
}
}
