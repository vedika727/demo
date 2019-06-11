// import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// import { By }           from '@angular/platform-browser';
// import { DebugElement } from '@angular/core';
// import { TestPage } from './test';
// import { IonicModule, Platform, NavController ,MenuController} from 'ionic-angular/index';
// import { StatusBar } from '@ionic-native/status-bar';
// import { SplashScreen } from '@ionic-native/splash-screen';
// import { ENV } from '../../environments/environment';
// import { ModalServiceProvider } from "../../providers/modal-service/modal-service";
// import { HttpServiceProvider } from "../../providers/data-service/http-service";
// import { BatteryStatus } from "@ionic-native/battery-status";
// import { HttpClient, HttpHandler } from '@angular/common/http';
// import { NetworkServiceProvider } from '../../providers/data-service/network-service';
// import { Network } from '@ionic-native/network';
// import { Http, ConnectionBackend, BaseRequestOptions, HttpModule } from "@angular/http";
// import { MockBackend } from "@angular/http/testing";
// import { TranslaterModule } from '../../translator/translator';

// describe('TestPage', () => {
//   let de: DebugElement;
//   let comp: TestPage;
//   let fixture: ComponentFixture<TestPage>;

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [TestPage],
//       imports: [
//         IonicModule.forRoot(TestPage),
//         HttpModule,
//         TranslaterModule
//       ],
//       providers: [
//         NavController,
//         HttpServiceProvider,
//         HttpModule,
//         ModalServiceProvider,
//         HttpClient,
//         HttpHandler,
//         NetworkServiceProvider,
//         Network,
//         BatteryStatus
//       ]
//     });
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(TestPage);
//     comp = fixture.componentInstance;
//     de = fixture.debugElement.query(By.css('h3'));
//   });
  // beforeEach(() => {
  //   fixture = TestBed.createComponent(TestPage);
  //   comp = fixture.componentInstance;
  //   de = fixture.debugElement.query(By.css('h1'));
  // });

//   it('should create component', () => expect(comp).toBeDefined());


//   it('should have expected <h3> text', () => {
//     fixture.detectChanges();
//     const h3 = de.nativeElement;
//     expect(h3.innerText).toMatch('Hello unit testing');
//   });
  // it('should have expected <h1> text', () => {
  //   fixture.detectChanges();
  //   const h1 = de.nativeElement;
  //   expect(h1.innerText).toMatch('This is H1 tag');
  // });

// });
