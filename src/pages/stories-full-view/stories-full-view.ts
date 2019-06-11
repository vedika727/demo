import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ScbHeaderInputs } from '../../components/scb-header/scb-header';
import { PolicyTabsFlags } from '../../components/pd-header-tabs/pd-header-tabs';
import { StoryDetailPage } from '../pages';

/**
 * Generated class for the StoriesFullViewPage page.
 *@author Rajul Dixit
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-stories-full-view',
  templateUrl: 'stories-full-view.html',
})
export class StoriesFullViewPage {
  dashboardheader = {
    "title":'Stories',
    "icon": 'scbl-story'
  }
  public index : any;
  headerInput:ScbHeaderInputs = new ScbHeaderInputs();
  PolicyTabsFlagsinputs: PolicyTabsFlags = new PolicyTabsFlags();

  public policytabs = ["HealthyTips", "Inspirer", "ExclusiveCustomers"];

  boolval:any;
    currenttabname:any;
  activities = [
    {
    "title": "5 รายการประจำสัปดาห์ ช่วยคุณสุขภาพดี",
    "body": "ตัวช่วยเพื่อสุขภาพที่คุณคาดไม่ถึง แค่ทำตาม 5 รายการด้านล่างนี้ เห็นผลจริง สุขภาพดีได้แบบยั่งยืน\n\nกินผักหรือผลไม้หวานน้อย 50% ของอาหารทุกมือ ช่วยให้อิ่มเร็วและเพิ่มไฟเบอร์ \n\tกินน้ำ 8 แก้ว โดยค่อยๆ จิบ ช่วยระบบขับถ่าย \n\tกินข้าว แทนแป้งประเภทอื่น ถ้าเลือกเป็นข้าวไม่ขัดขาวได้จะได้วิตามินด้วย\n\tเลือกกินเนื้อสัตว์ที่ไม่มีไขมัน เช่น อกไก่ ปลา \n\tเข้านอนก่อน 4 ทุ่มเพื่อระบบเผาผลานที่ดี\n \n\nอยากสุขภาพดีต้องเริ่มลงมือทำตั้งแต่ตอนนี้ \n\nเทคนิคพิเศษที่จะทำให้คุณทำได้ คือ จดบันทึกประจำวันว่าคุณใช้ชีวิตอย่างไร และประเมิณตัวเองในปลายสัปดาห์ เพื่อปรับพฤติกรรมในสัปดาห์ถัดไป\n\n \n\nCoach XXXX",
    "field_image":"http://drupalscb.s3.amazonaws.com/styles/large/s3/2018-08/SCB_Life_Health.expert_Cover_950x700_1.jpg?itok=KptxFAIf",
    "field_video": "",
    "field_tags": "Moderate, Exclusive"
},
{
    "title": "ความลิมิเต็ดที่ไม่เคยบอกใครของยิปโซอริย์กันตา",
    "body": "3 คำนี้ลงตัวกับยิปโซยังไง? พบคำตอบได้ที่นี่\n\nอิสระ\n\tไร้ขีดจำกัด\n\tยิ้มสู้\nด้วยจุดเด่น จุดที่น่าสนใจของผู้ให้สัมภาษณ์ ด้วยคำตอบของคำถามเหล่านี้ จะช่วยดึงบุคลิกและนิสัยของผู้ให้สัมภาษณ์ออกมาได้ ด้วยจุดเด่น จุดที่น่าสนใจของผู้ให้สัมภาษณ์ ด้วยคำตอบของคำถามเหล่านี้ จะช่วยดึงบุคลิกและนิสัยของผู้ให้สัมภาษณ์ออกมาได้ จะช่วยดึงบุคลิกและนิสัยของผู้ให้สัมภาษณ์ออกมาได้ ด้วยจุดเด่น จุดที่น่าสนใจของผู้ให้สัมภาษณ์ ด้วยคำตอบของคำถามเหล่านี้ จะช่วยดึงบุคลิกและนิสัยของผู้ให้สัมภาษณ์ออกมาได้ จะช่วยดึงบุคลิกและนิสัยของผู้ให้สัมภาษณ์ออกมาได้ ด้วยจุดเด่น จุดที่น่าสนใจของผู้ให้สัมภาษณ์ ด้วยคำตอบของคำถามเหล่านี้ จะช่วยดึงบุคลิกและนิสัยของผู้ให้สัมภาษณ์ออกมาได้\n\n \n\nด้วยคำตอบของคำถามเหล่านี้ จะช่วยดึงบุคลิกและนิสัยของผู้ให้สัมภาษณ์ออกมาได้ จะช่วยดึงบุคลิกและนิสัยของผู้ให้สัมภาษณ์ออกมาได้ ด้วยจุดเด่น จุดที่น่าสนใจของผู้ให้สัมภาษณ์ ด้วยคำตอบของคำถามเหล่านี้ จะช่วยดึงบุคลิกและนิสัยของผู้ให้สัมภาษณ์ออกมาได้\n\n \n\nยิปโซ (อริย์กันตา มหพฤกษ์พงศ์) – นักแสดง",
    "field_image": "http://drupalscb.s3.amazonaws.com/styles/large/s3/2018-08/SCB_June_Health_tech_03_950x700.jpg?itok=ymYTYkhm",
    "field_video": "",
    "field_tags": "Active, Non-Active, Moderate, VDO"
},
{
    "title": "5 รายการประจำสัปดาห์ ช่วยคุณสุขภาพดี",
    "body": "ตัวช่วยเพื่อสุขภาพที่คุณคาดไม่ถึง แค่ทำตาม 5 รายการด้านล่างนี้ เห็นผลจริง สุขภาพดีได้แบบยั่งยืน\n\nอยากสุขภาพดีต้องเริ่มลงมือทำตั้งแต่ตอนนี้ \n\nเทคนิคพิเศษที่จะทำให้คุณทำได้ คือ จดบันทึกประจำวันว่าคุณใช้ชีวิตอย่างไร และประเมิณตัวเองในปลายสัปดาห์ เพื่อปรับพฤติกรรมในสัปดาห์ถัดไป\n\n \n\nอยากสุขภาพดีต้องเริ่มลงมือทำตั้งแต่ตอนนี้ \n\nเทคนิคพิเศษที่จะทำให้คุณทำได้ คือ จดบันทึกประจำวันว่าคุณใช้ชีวิตอย่างไร และประเมิณตัวเองในปลายสัปดาห์ เพื่อปรับพฤติกรรมในสัปดาห์ถัดไป\n\n \n\nอยากสุขภาพดีต้องเริ่มลงมือทำตั้งแต่ตอนนี้ \n\nเทคนิคพิเศษที่จะทำให้คุณทำได้ คือ จดบันทึกประจำวันว่าคุณใช้ชีวิตอย่างไร และประเมิณตัวเองในปลายสัปดาห์ เพื่อปรับพฤติกรรมในสัปดาห์ถัดไป\n\n \n\nCoach XXXX",
    "field_image": "http://drupalscb.s3.amazonaws.com/styles/large/s3/2018-08/SCB_Life_Health.expert_Cover_950x700.jpg?itok=6m5Qeghf",
    "field_video": "",
    "field_tags": "Moderate, Exclusive"
},
{
    "title": "ความลิมิเต็ดที่ไม่เคยบอกใครของยิปโซอริย์กันตา",
    "body": "3 คำนี้ลงตัวกับยิปโซยังไง? พบคำตอบได้ที่นี่\n\nด้วยจุดเด่น จุดที่น่าสนใจของผู้ให้สัมภาษณ์ ด้วยคำตอบของคำถามเหล่านี้ จะช่วยดึงบุคลิกและนิสัยของผู้ให้สัมภาษณ์ออกมาได้ ด้วยจุดเด่น จุดที่น่าสนใจของผู้ให้สัมภาษณ์ ด้วยคำตอบของคำถามเหล่านี้ จะช่วยดึงบุคลิกและนิสัยของผู้ให้สัมภาษณ์ออกมาได้ จะช่วยดึงบุคลิกและนิสัยของผู้ให้สัมภาษณ์ออกมาได้ ด้วยจุดเด่น จุดที่น่าสนใจของผู้ให้สัมภาษณ์ ด้วยคำตอบของคำถามเหล่านี้ จะช่วยดึงบุคลิกและนิสัยของผู้ให้สัมภาษณ์ออกมาได้ จะช่วยดึงบุคลิกและนิสัยของผู้ให้สัมภาษณ์ออกมาได้ ด้วยจุดเด่น จุดที่น่าสนใจของผู้ให้สัมภาษณ์ ด้วยคำตอบของคำถามเหล่านี้ จะช่วยดึงบุคลิกและนิสัยของผู้ให้สัมภาษณ์ออกมาได้\n\n \n\nด้วยคำตอบของคำถามเหล่านี้ จะช่วยดึงบุคลิกและนิสัยของผู้ให้สัมภาษณ์ออกมาได้ จะช่วยดึงบุคลิกและนิสัยของผู้ให้สัมภาษณ์ออกมาได้ ด้วยจุดเด่น จุดที่น่าสนใจของผู้ให้สัมภาษณ์ ด้วยคำตอบของคำถามเหล่านี้ จะช่วยดึงบุคลิกและนิสัยของผู้ให้สัมภาษณ์ออกมาได้\n\n \n\nยิปโซ (อริย์กันตา มหพฤกษ์พงศ์) – นักแสดง",
    "field_image": "http://drupalscb.s3.amazonaws.com/styles/large/s3/2018-08/SCB_June_Health_tech_04_950x700.jpg?itok=DVjs-FVm",
    "field_video": "",
    "field_tags": "Active, Non-Active, Moderate, General"
},
{
    "title": "8 สัญญาณดีที่บอกว่าอาการของโรคซึมเศร้ากำลังดีขึ้น",
    "body": " รู้กันมาพอสมควรแล้วว่าอาการของโรคซึมเศร้าเป็นอย่างไร แต่รู้กันหรือยังว่าอาการแบบไหนที่บอกว่า โรคซึมเศร้าที่เป็นอยู่กำลังดีขึ้นแล้ว วันนี้เราเลยมีวิธีสังเกตถึงความเปลี่ยนแปลงที่ดีขึ้นของอาการซึมเศร้า(ของตัวเอง) มาบอก\n\nหงุดหงิดน้อยลง (บางทีซึมเศร้า ไม่ได้แสดงออกมาเป็นความเศร้าอย่างเดียว บางคนจะแสดงออกเป็นอาการหงุดหงิดง่าย)\n\tมีความสนใจกิจกรรมต่างๆ มากขึ้น กลับไปสนุกกับสิ่งที่เคยทำแล้วสนุกได้มากขึ้น\n\tรู้สึกมีพลังมากขึ้น\n\tวนเวียนหรือหมกมุ่นกับเรื่องราวหรือความรู้สึกของตัวเองน้อยลง \n\tกินอาหารได้เป็นปกติมากขึ้น บางคนตอนซึมเศร้าอาจจะกินมากหรือน้อยกว่าปกติ ถ้าดีขึ้นแล้วความอยากอาหารจะกลับมาเท่าๆ เดิม ไม่มากหรือน้อยไป\n\tมีสมาธิดีขึ้น อาการหนึ่งของโรคซึมเศร้าคือสมาธิไม่ดี สมาธิในที่นี้หมายถึงความจดจ่อกับงานหรือสิ่งที่ทำนะคะ\n\tแรงขับทางธรรมชาติกลับมา เช่น แรงขับหรือความต้องการทางเพศ\nมองตัวเองดีขึ้น ธรรมชาติของคนที่มีภาวะซึมเศร้าคือมักจะมองตัวเองในแง่ลบ ถ้าเมื่อไหร่ที่เริ่มมองตัวเองดีขึ้น ก็น่าจะเป็นสัญญาณบอกว่าอาการคุณเริ่มดีขึ้นแล้ว\u2028\u2028\n\n \n\nตุ้ยนุ้ยบอท ช่วยให้ข้อมูลแคลอรี่ของอาหาร กิจกรรมออกกำลังกายต่างๆ เผาผลาญได้กี่แคลอรี่ ก็คำนวณ BMI BMR ให้บริการผ่าน Facebook Messenger",
    "field_image": "http://drupalscb.s3.amazonaws.com/styles/large/s3/2018-08/SCB_life_JULY_Health.expert-01_950x700.jpg?itok=g12gmQo5",
    "field_video": "",
    "field_tags": "Active, Non-Active, Moderate, General"
}
];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.boolval = true;
    this.headerInput.isBackButton = true;
    this.headerInput.nav = navCtrl;
    this.PolicyTabsFlagsinputs.iconhideflag = true;
    if(this.navParams.get('SelectedTab')){
      this.currenttabname = this.navParams.get('SelectedTab');
      if(this.currenttabname == 'HealthyTips'){
        this.PolicyTabsFlagsinputs.expandflag = 'HealthyTips';
      }else if( this.currenttabname == 'Inspirer'){
        this.PolicyTabsFlagsinputs.expandflag = 'Inspirer';
      }else{
        this.PolicyTabsFlagsinputs.expandflag = 'ExclusiveCustomers';
      }
    }else{
      this.currenttabname = "HealthyTips";
      this.PolicyTabsFlagsinputs.expandflag = 'HealthyTips';
    }
  
  
   
  }

  ionViewDidEnter() {
    console.log('ionViewDidLoad StoriesFullViewPage');
  }

  /**
   * this method is used to asign tabs dynamically
   */
 
  changetab(currenttab) {
    this.currenttabname = currenttab;
    console.log(currenttab);
  }


  // this.method for redirect to story detail page
  readStory(story){
     this.navCtrl.push(StoryDetailPage,{"story":story});

  }
}
