import { BaseApp } from './../../app/base';
import { Component, Injector } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ScbHeaderInputs } from '../../components/scb-header/scb-header';
import { StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Stories } from '../../common/models/cms-stories.class';
/**
 * Generated class for the StoryDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-story-detail',
  templateUrl: 'story-detail.html',
})
export class StoryDetailPage extends BaseApp {
  dashboardheader = {
    "title": 'Stories',
    "icon": 'scbl-story'
  }
  storyDetail: Stories;
  // hashTags: string[];
  options: StreamingVideoOptions;
  headerInput: ScbHeaderInputs = new ScbHeaderInputs();
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private streamingMedia: StreamingMedia,
    private socialSharing: SocialSharing, public injector:Injector) {

    super(injector);
    this.storyDetail = this.navParams.get("data");
    console.log('Story is ', this.storyDetail);
    this.headerInput.isBackButton = true;
    this.headerInput.nav = navCtrl;
    // let tempTags = this.storyDetail.field_tags.replace(new RegExp(' ','g'),'');
    // this.hashTags = tempTags.split(',');
    // console.log('tags are -', this.hashTags);
    this.options = {
      successCallback: () => { console.log('Video played') },
      errorCallback: (e) => { console.log('Error streaming') },
      orientation: 'landscape',
      shouldAutoClose: true,
      controls: false
    };
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StoryDetailPage');
  }

  playVideo() {
    console.log('play video called');
    if (this.storyDetail.field_video != "") {
      this.streamingMedia.playVideo(this.storyDetail.field_video, this.options);
    }
  }

  share() {
    console.log('sharing called');
    let dataToShare;
    // this logic for share to image or video link
    if (this.storyDetail.field_video != "") {
      dataToShare = this.storyDetail.field_video;
    } else {
      dataToShare = this.storyDetail.field_image;
    }

    this.socialSharing.share("Hey! I have found this great article on the SCBLIFE Mobile app. Check it out! " + this.storyDetail.title, "", "");
  }

}
