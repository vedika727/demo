import { NgModule } from "@angular/core";
import { IonicModule } from "ionic-angular";
import { ProgressBarComponent } from "./progress-bar/progress-bar";
import { ScbHeaderIconComponent } from "./scb-header-icon/scb-header-icon";
import { PinPadComponent } from '../components/pin-pad/pin-pad';
import { ProcessActionComponent } from '../components/process-action/process-action';
import { TranslateModule } from 'ng2-translate';
import { CommonModule } from "@angular/common"
import { InsuranceCardComponent } from './insurance-card/insurance-card';
import { PolicyDetailsComponent } from './policy-details/policy-details';
import { HomeSliderComponent } from './home-slider/home-slider';
import { HomeHolderComponent } from './home-holder/home-holder';
import { PdHeaderTabsComponent } from './pd-header-tabs/pd-header-tabs';
import { HomePolicyTabsDetailsComponent } from './home-policy-tabs-details/home-policy-tabs-details';
import { HomePieChartComponent } from './home-pie-chart/home-pie-chart';
import { AllpolicyDetailTabsComponent } from './allpolicy-detail-tabs/allpolicy-detail-tabs';
import { DetailPolicyPiechartComponent } from './detail-policy-piechart/detail-policy-piechart';
import { DashboardHeaderComponent } from './dashboard-header/dashboard-header';
import { PolicyTitleComponent } from './policy-title/policy-title';
import { PolicyTimelineComponent } from './policy-timeline/policy-timeline';
import { PolicyCoverageComponent } from './policy-coverage/policy-coverage';
import { StoryHeaderComponent } from './story-header/story-header';
import { RangeSliderVerticalComponent } from './range-slider-vertical/range-slider-vertical';
import { PolicyLoanComponent } from './policy-loan/policy-loan';
import { ScbHeaderComponent } from './scb-header/scb-header';
import { ClaimHistoryComponent } from './claim-history/claim-history';
import { LoaderComponent } from './loader/loader';
import { GenericViewComponent } from "./generic-view/generic-view";
import { PinPadInputComponent } from './pin-pad-input/pin-pad-input';
import { PromotionsComponent } from './promotions/promotions';
import { PolicyPaymentDueComponent } from './policy-payment-due/policy-payment-due';
import { StoriesListComponent } from './stories-list/stories-list';
import { PipesModule } from "../pipes/pipes.module";
import { TooltipOverlayComponent } from './tooltip-overlay/tooltip-overlay';
import { PolicyLoanPaymentComponent } from './policy-loan-payment/policy-loan-payment';
import { SinglePolicyComponent } from './single-policy/single-policy';
import {IonSimpleWizard} from './ion-simple-conditional-wizard/ion-simple-wizard.component';
import {IonSimpleWizardStep} from './ion-simple-conditional-wizard/ion-simple-wizard.step.component';
import { Ng5SliderModule } from 'ng5-slider';
import { DashboardSalesCardComponent } from './dashboard-sales-card/dashboard-sales-card';
import { DashboardSalesComponent } from './dashboard-sales/dashboard-sales';
@NgModule({
  declarations: [
    PinPadComponent,
    ProcessActionComponent,
    ProgressBarComponent,
    ScbHeaderIconComponent,
    PolicyTimelineComponent,
    InsuranceCardComponent,
    PolicyDetailsComponent,
    HomeSliderComponent,
    HomeHolderComponent,
    PdHeaderTabsComponent,
    HomePolicyTabsDetailsComponent,
    HomePieChartComponent,
    AllpolicyDetailTabsComponent,
    DetailPolicyPiechartComponent,
    DashboardHeaderComponent,
    PolicyTitleComponent,
    PolicyCoverageComponent,
    StoryHeaderComponent,
    RangeSliderVerticalComponent,
    PolicyLoanComponent,
    ScbHeaderComponent,
    ClaimHistoryComponent,
    LoaderComponent,
    GenericViewComponent,
    PinPadInputComponent,
    PolicyPaymentDueComponent,
    PromotionsComponent,
    StoriesListComponent,
    TooltipOverlayComponent,
    PolicyLoanPaymentComponent,
    SinglePolicyComponent,
    IonSimpleWizard,
    IonSimpleWizardStep,
    DashboardSalesCardComponent,
    DashboardSalesComponent
  ],
  imports: [IonicModule, TranslateModule, CommonModule,PipesModule,Ng5SliderModule],
  exports: [
    PinPadComponent,
    ProcessActionComponent,
    ProgressBarComponent,
    ScbHeaderIconComponent,
    InsuranceCardComponent,
    PolicyDetailsComponent,
    HomeSliderComponent,
    HomeHolderComponent,
    PdHeaderTabsComponent,
    HomePolicyTabsDetailsComponent,
    HomePieChartComponent,
    AllpolicyDetailTabsComponent,
    DetailPolicyPiechartComponent,
    DashboardHeaderComponent,
    PolicyTimelineComponent,
    PolicyTitleComponent,
    PolicyCoverageComponent,
    TranslateModule,
    StoryHeaderComponent,
    RangeSliderVerticalComponent,
    PolicyLoanComponent,
    ScbHeaderComponent,
    ClaimHistoryComponent,
    LoaderComponent,
    GenericViewComponent,
    PinPadInputComponent,
    PolicyPaymentDueComponent,
    PromotionsComponent,
    StoriesListComponent,
    TooltipOverlayComponent,
    PolicyLoanPaymentComponent,
    SinglePolicyComponent,
    IonSimpleWizard,
    IonSimpleWizardStep,
    DashboardSalesCardComponent,
    DashboardSalesComponent
  ]
})
export class ComponentsModule { }
