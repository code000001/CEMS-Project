import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';

import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';

import { AuthenticationService } from '../../_services';
import { AppFormService } from '../../Services/app-form.service';
import { OrganizationService } from '../../services/organization.service';
import { Userappform, AnouncementInterface, OrganizationDataInterface } from '../../_models';
import { PositionDataInterface } from '../../_models/position-data-interface';
// import { KeyedWrite } from '@angular/compiler';
import { formatDate } from '@angular/common';

import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import html2pdf from 'html2pdf.js';
import html2canvas from 'html2canvas';
import 'jspdf-autotable';
@Component({
  selector: 'app-student-org-app-form',
  templateUrl: './student-org-app-form.component.html',
  styleUrls: ['./student-org-app-form.component.css']
})
export class StudentOrgAppFormComponent implements OnInit {

  org: OrganizationDataInterface;
  positionData: string = "";
  ListPosition: PositionDataInterface[] = [];
  errortype: string = '';
  error: string = '';
  ann: string = '';
  message: any;
  AppForm: FormGroup;
  // newlg : string = null;
  // rows = [];
  // Address 1
  // today: Date = Date.now();
  Provinces: any;
  selectedProvinces = null;
  Amphures: any;
  selectedAmphures = null;
  Districts: any;
  selectedDistricts = null;
  Zipcode: number = null;
  // Address 2
  SameAddress1: boolean = true;
  A2Provinces: any;
  A2selectedProvinces = null;
  A2Amphures: any;
  A2selectedAmphures = null;
  A2Districts: any;
  A2selectedDistricts = null;
  A2Zipcode: number = null;
  stdBornPlace: number = null;

  userData: Userappform;
  FDAddress = [{ id: 1, name: 'ที่อยู่ตามทะเบียนบ้าน' }, { id: 2, name: 'ที่อยู่ที่ติดต่อได้' }, { id: 0, name: 'อื่น ๆ' }];
  FDAddressOther: boolean = true;
  selectedSimpleItem = 'Two';
  LANGUAGE = [{ th: 'อังกฤษ', en: 'English', value: true }, { th: 'จีน', en: 'Chinese', value: true }];
  LANGUAGEskill = [];
  // LANGUAGEskill = ['ฟัง (Listening)','พูด (Speaking)','อ่าน (Reading)','เขียน (Writing)'];
  LANGUAGElevel = [{ id: 1, th: 'ปรับปรุง', en: 'low' }, { id: 2, th: 'พอใช้', en: 'medium' }, { id: 3, th: 'ดี', en: 'high' }];
  // countLevel = this.LANGUAGElevel.length;
  emerg = [{ name: 'บิดา', value: 1, check: true }, { name: 'มารดา', value: 2, check: false }, { name: 'อื่น ๆ', value: 3, check: true }];

  startedClass = new Subject<boolean>();
  endedClass = new Subject<boolean>();

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private appFormService: AppFormService,
    private authenticationService: AuthenticationService,
    private http: HttpClient,
    private organizationService: OrganizationService,
    private sanitizer: DomSanitizer
    // private ins: FormIns002Component
  ) {
    // this.activatedRoute.params.subscribe( params => this.orgId = params);
    this.onProgressStarted();
    this.LANGUAGEskill = [{ th: 'ฟัง', en: 'Listening', children: this.countLevel },
    { th: 'พูด', en: 'Speaking', children: this.countLevel },
    { th: 'อ่าน', en: 'Reading', children: this.countLevel },
    { th: 'เขียน', en: 'Writing', children: this.countLevel }]
    // this.loadingProvinces();
    this.loadingData();
    this.loadingProvinces();
  }

  onProgressStarted() {
    this.startedClass.next(true);
    setTimeout(() => {
      this.startedClass.next(false);
    }, 800);
  }

  onProgressCompleted() {
    this.endedClass.next(true);
    setTimeout(() => {
      this.endedClass.next(false);
    }, 800);
  }

  submit(): void {
    this.userData.stdOrgId = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));

    if (this.AppForm.get('stdParentTel').value != null) { this.userData.stdParentTel = this.AppForm.get('stdParentTel').value }
    if (this.AppForm.get('stdBornPlace').value != null) { this.userData.stdBornPlace = (this.AppForm.get('stdBornPlace').value).toString() }
    if (this.AppForm.get('stdNation').value != null) { this.userData.stdNation = this.AppForm.get('stdNation').value }
    if (this.AppForm.get('stdHeight').value != null) { this.userData.stdHeight = this.AppForm.get('stdHeight').value }
    if (this.AppForm.get('stdWeigh').value != null) { this.userData.stdWeigh = this.AppForm.get('stdWeigh').value }
    if (this.AppForm.get('Address1').value != null) { this.userData.stdHouseParticularsAddress = this.AppForm.get('Address1').value }
    if (this.AppForm.get('Address2').value != null) { this.userData.stdNowAddress = this.AppForm.get('Address2').value }
    if (this.SameAddress1 == false) { this.userData.stdNowAddress = this.AppForm.get('Address1').value }
    if (this.AppForm.get('stdReligion').value != null) { this.userData.stdReligion = this.AppForm.get('stdReligion').value }
    if (this.AppForm.get('stdParentMobile').value != null) { this.userData.stdParentMobile = this.AppForm.get('stdParentMobile').value }
    if (this.AppForm.get('stdYear').value != null) { this.userData.stdYear = this.AppForm.get('stdYear').value }
    if (this.AppForm.get('stdEmail').value != null) { this.userData.stdEmail = this.AppForm.get('stdEmail').value }
    if (this.AppForm.get('stdHsGpa').value != null) { this.userData.stdHsGpa = this.AppForm.get('stdHsGpa').value }
    if (this.AppForm.get('stdFatherJob').value != null) { this.userData.stdFatherJob = this.AppForm.get('stdFatherJob').value }
    if (this.AppForm.get('stdParentMobile').value != null) { this.userData.stdParentMobile = this.AppForm.get('stdParentMobile').value }
    if (this.AppForm.get('stdMotherJob').value != null) { this.userData.stdMotherJob = this.AppForm.get('stdMotherJob').value }
    if (this.AppForm.get('stdMotherMobileTel').value != null) { this.userData.stdMotherMobileTel = this.AppForm.get('stdMotherMobileTel').value }
    if (this.AppForm.get('std_LastGpa').value != null) { this.userData.std_LastGpa = this.AppForm.get('std_LastGpa').value }
    if (this.AppForm.get('stdParentAddress').value != null) { this.userData.stdParentAddress = this.AppForm.get('stdParentAddress').value }

    // this.submitted = true;
    // console.log(this.userData);
    this.appFormService.updateStdAppForm(this.userData)
      .subscribe((data) => {
      }, err => {
        // console.log('err -> ',err);
        Swal.fire({
          title: "ไม่สามารถบันทึกข้อมูลได้",
          type: "warning",
          text: "กรุณาตรวจสอบข้อมูลของท่าน",
          confirmButtonColor: '#244f99',
          confirmButtonText: 'ตกลง',
          showCancelButton: false,
          allowEscapeKey: false,
          allowOutsideClick: false
        })
        console.log(' err updateStdAppForm -> ', err);
      }, () => {
        Swal.fire({
          title: "บันทึกข้อมูลสำเร็จ!",
          text: "ระบบบันทึกข้อมูลเรียบร้อย",
          type: "success",
          timer: 1800,
          confirmButtonColor: '#244f99',
          confirmButtonText: 'ตกลง',
          showConfirmButton: false,
          showCancelButton: false,
          allowEscapeKey: false,
          allowOutsideClick: false
        })
      });
  }

  public get countLevel() {
    return this.LANGUAGElevel.length;
  }

  public get countskill() {
    return this.LANGUAGEskill.length;
  }

  ngOnInit() {


    // let annid =  this.activatedRoute.snapshot.paramMap.get('ann');
    // this.appFormService.checkStatusAnn(parseInt(annid)).subscribe(response => { console.log('ann -> ',response);this.ann = response });


    // this.loadingData();
    this.AppForm = this.fb.group({
      stdBornDate: null,
      stdFatherJob: null,
      stdFatherMobileTel: null,
      stdHsGpa: null,
      stdHouseParticularsAddress: null,
      stdMotherJob: null,
      stdMotherMobileTel: null,
      stdNowAddress: null,
      SpecialComputerSkills: null,
      SpecialComputerSkills2: null,
      CareerVisions: null,
      work: null,
      work2: null,
      date: null,
      date2: null,
      eduLv: null,
      eduShl: null,
      eduForm: null,
      eduTo: null,
      eduGpax: null,
      std_LastGpa: null,
      stdParentAddress: null,

      stdEmail: null,
      stdTel: null,
      stdYear: null,
      stdParentMobile: null,
      stdParentTel: null,
      stdBornPlace: null,
      stdNation: null,
      stdReligion: null,
      stdHeight: null,
      stdWeigh: null,
      Address1: null,
      Address2: null,
      newlg: null,
      SameAddress1: false,
      emergName: null,
      emergRelation: null,
      emergAddress: null,
      emergTel: null,

      exemergName: null,
      exemergRelation: null,
      exemergTel: null,
      exemergAddress: null
    });

    this.onProgressCompleted();
  }

  loadingData() {
    const annid = this.activatedRoute.snapshot.paramMap.get('ann');

    // console.log(parseInt(annid));
    // this.appFormService.getAnn(parseInt(annid)).subscribe(data => {
    //   console.log('ann => ',data);
    //   // this.ann = data.annStatusId;
    // });

    // if (this.ann == 2) {
    //   this.router.navigate([`/view_announcement/${this.activatedRoute.snapshot.paramMap.get('id')}`]);
    // }

    const id = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
    this.organizationService.getDetailById(id).subscribe(org => this.org = org);

    this.organizationService.getLogPositionBylogpAnnId(id)
      .subscribe(logPosition => {
        // this.logPosition = logPosition
        // console.log((logPosition).length)
        //this.getKnowledgeReq(this.logReqKnow.logkAnnKrdId)
        // const max = (logPosition).length;
        // for (let index = 0; index < max; index++) {
        //   this.organizationService.getPositionById(logPosition[index].logpAnnPosId)
        //     .subscribe(positionData => {
        //       // console.log(positionData);
        //       (index != (max - 1)) ? this.ann += positionData.annPosNameEn + ', ' : this.ann += positionData.annPosNameEn;
        //       // this.ListPosition.push(positionData);
        //     });
        // }
      });



    this.appFormService.getINS02().subscribe(data => {
      this.stdBornPlace = parseInt(data.stdBornPlace);
      if (data.stdAge != "-" || data.stdAge != null) {
        data.stdAge = parseInt(formatDate(new Date(), 'yyyy', 'en', '+7')) - parseInt(formatDate(data.stdBornDate, 'yyyy', 'en', '+7'));
      }
      this.userData = data;
    }, (err) => { }, () => { });
  }

  addFieldValue() {
    if (this.AppForm.get('newlg').value.length != null) {
      if (this.AppForm.get('newlg').value.replace(/ /g, '').length > 1) {
        let str = this.AppForm.get('newlg').value;
        if (str != null && str.replace(/ /g, '').length > 1) {
          let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
          let text = possible.charAt(Math.floor(Math.random() * possible.length));
          this.LANGUAGE.push({ th: str, en: "" + text + this.LANGUAGE.length, value: false });
          this.AppForm.get('newlg').setValue(null);
        }
      }
    }
  }

  deleteFieldValue(index) {
    this.LANGUAGE.splice(index, 1);
  }

  SameAddress() {
    // console.log(this.AppForm.get('SameAddress1').value);
    this.SameAddress1 = this.AppForm.get('SameAddress1').value;
    this.triggerAddress();
  }

  triggerAddress() {
    // if(this.SameAddress1 === false){
    //   this.AppForm.get('Address2').disable();
    //   this.AppForm.get('Address2').patchValue(this.AppForm.get('Address1').value);
    // }

    const Address2 = this.AppForm.get('Address2');
    if (this.SameAddress1 === true) {
      Address2.enable();
      this.AppForm.get('Address2').setValue(this.userData.stdNowAddress);
    } else {
      Address2.disable();
      var str = '';
      if (this.AppForm.get('Address1').value == null) { str = this.userData.stdHouseParticularsAddress } else { str = this.AppForm.get('Address1').value; }
      this.AppForm.get('Address2').setValue(str);
    }
  }

  setEmerg($event) {
    // console.log($event.get(''));
    this.AppForm.get('emergName').disable();
    if (this.AppForm.get('emergName').value != null) { this.AppForm.get('exemergName').setValue(this.AppForm.get('emergName').value); }
    if (this.AppForm.get('emergRelation').value != null) { this.AppForm.get('exemergRelation').setValue(this.AppForm.get('emergRelation').value); }
    if (this.AppForm.get('emergTel').value != null) { this.AppForm.get('exemergTel').setValue(this.AppForm.get('emergTel').value); }
    if (this.AppForm.get('emergAddress').value != null) { this.AppForm.get('emergAddress').setValue(this.AppForm.get('exemergAddress').value); }
  }

  Emerg(emID) {
    if (emID === 1 || emID === 2) {
      this.AppForm.get('emergName').disable();
      this.AppForm.get('emergAddress').enable();
      this.AppForm.get('emergRelation').disable();
      this.AppForm.get('emergTel').disable();
      if (emID === 1) {
        this.AppForm.get('emergName').setValue(this.userData.stdFatherNameTh);
        this.AppForm.get('emergRelation').setValue('บิดา');
        this.AppForm.get('emergTel').setValue(this.userData.stdFatherMobileTel);
      } else {
        this.AppForm.get('emergName').setValue(this.userData.stdMotherNameTh);
        this.AppForm.get('emergRelation').setValue('มารดา');
        this.AppForm.get('emergTel').setValue(this.userData.stdMotherMobileTel);
      }
    } else {
      this.AppForm.get('emergName').enable();
      this.AppForm.get('emergAddress').enable();
      this.AppForm.get('emergRelation').enable();
      this.AppForm.get('emergTel').enable();

      this.AppForm.get('emergName').setValue(null);
      this.AppForm.get('emergRelation').setValue(null);
      this.AppForm.get('emergTel').setValue(null);

      if (this.AppForm.get('emergName').value == null) { this.AppForm.get('emergName').setValue(this.AppForm.get('exemergName').value); }
      if (this.AppForm.get('emergRelation').value == null) { this.AppForm.get('emergRelation').setValue(this.AppForm.get('exemergRelation').value); }
      if (this.AppForm.get('emergTel').value == null) { this.AppForm.get('emergTel').setValue(this.AppForm.get('exemergTel').value); }

    }

  }

  //   SELECT
  //   a.id AS 'ann_id',
  //   b.ann_pos_name_th,
  //   b.ann_pos_name_en
  // FROM
  //   `announcement_data` AS a
  // JOIN announcement_log_pos AS central
  // ON
  //   a.id = central.logp_ann_id
  // JOIN announcement_position_data AS b
  // ON
  //   central.logp_ann_pos_id = b.id

  selectedBornPlace($event) {

    this.selectedProvinces = $event.nameTh;
    // console.log($event.nameTh);

  }

  printout() {
    // var worker = html2pdf();
    var doc = new jsPDF();
    // var element = document.getElementById('my-div');
    // html2canvas(document.getElementById('my-table')).then(canvas => {

    //   var imgWidth = 208;
    //   var pageHeight = 295;
    //   var imgHeight = canvas.height * imgWidth / canvas.width;
    //   var heightLeft = imgHeight;

    //   const contentDataURL = canvas.toDataURL('image/png')

    //   let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF  
    //   var position = 0;
    //   pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
    //   pdf.save('MYPdf.pdf'); // Generated PDF  
    // });

    var elem = document.getElementById('my-div');

    html2canvas(elem, {
      onclone: function (clonedDoc) {
        clonedDoc.getElementById('my-div').style.display = 'block';
      }
    }).then((canvas) => {
      var imgWidth = 208;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png')

      // var position = 0;
      // let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF  
      // pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);

      // var pagebreak = (canvas === 'specify') ?
      //   { mode: '', before: '.before', after: '.after' } :
      //   { mode: canvas };


      var opt = {
        margin: 1,
        filename: 'INS002-' + this.userData.stdId + '.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, maxwidth: 719 },
        pagebreak: { mode: ['.before', '.after'] },
        jsPDF: { unit: 'cm', format: 'a4', orientation: 'portrait' }
      };

      html2pdf(canvas, opt);
      // pdf.save('INS002-' + this.userData.stdId + '.pdf'); // Generated PDF  
    })
  }

  printout2() {
    var doc = new jsPDF();

    let change_this = this.sanitizer.bypassSecurityTrustHtml(`<table id="my-table" class="table-tr" style="width:100%;margin: 100px;">
    <tr class="table-tr">
      <th style="width:10%;">
        <img src="/assets/img/buu_logo.jpg" style="max-width:100px;max-height:100px">
      </th>
      <th style="width:80%;">
        <br>
        <br>
        <br>
        <span style="font-size:24px;">
          <b>ใบสมัครงานสหกิจศึกษา/ฝึกงาน</b>
        </span>
        <br><span style="font-size:24px;">
          <b>APPLICATION FOR COOPERATIVE EDUCATION JOB</b>
        </span>
        <br>วิชาสหกิจศึกษา คณะวิทยาการสารสนเทศ มหาวิทยาลัยบูรพา
        <br>
        <b>Cooperative Education --- Faculty of Informatics Burapha University</b>
        <br>
        <br>
        <br>
      </th>
      <th style="width:10%;text-align:center;">
        <p>
          <b>IN-S002</b>
        </p>
      </th>
    </tr>

    <tr>
      <td colspan="3">
        <table>
          <tr>
            <th class="titlename">ข้อมูลส่วนตัวนิสิต (APPLICANT 'S INFORMATION)</th>
          </tr>
          <tr>
            <td>ชื่อ (Name) นามสกุล (Surname)<br>
              รหัสนิสิต ___________________________ โทร. __________________มือถือ ___________________<br>
              อีเมล์ _____________________________________
              <br>สาขาวิชา ( ) วิทยาการคอมพิวเตอร์ ( ) เทคโนโลยีสารสนเทศ ( ) วิศวกรรมซอฟต์แวร์</td>
          </tr>
          <tr>
            <th class="titlename">ชื่อสถานประกอบการที่ต้องการสมัคร รอบที่</th>
          </tr>
          <tr>
            <td>1. __________________________________________________________________________________<br>
              สมัครงานในตำแหน่ง______________________________________________________________</td>
          </tr>
        </table>
      </td>
    </tr>

    <tr>
      <td colspan="3">
        <table>
          <tr>
            <th class="titlename" colspan="2">ข้อมูลส่วนตัวนิสิต (APPLICANT 'S INFORMATION)</th>
          </tr>
          <tr>
            <td class="no-border-bottom">
              ชื่อ(Name) __________________________ นามสกุล (Surname) ______________________<br>
              Name _______________________________ Surname ____________________________<br>
              สาขาวิชา _______________________________________รหัสนิสิต ____________________<br>
              ชั้นปีที่ _______เกรดเฉลี่ยภาคการศึกษาที่ผ่านมา______________เกรดเฉลี่ยสะสม___________<br>
              สถานที่เกิด __________________ วันเดือนปีเกิด_______________อายุ_____ เพศ ________ <br>
              บัตรประจำตัวประชาชนเลขที่
              ____________________ สัญชาติ________ ศาสนา________<br>
            </td>
            <td style="width:10%">รูปถ่าย</td>
          </tr>
          <tr>
            <td colspan="2" class="no-tb">
              ส่วนสูง cm_____ซม. น้ำหนัก kg______ <br>ที่อยู่ที่ติดต่อได้
              ________________________________________________
              __________________________________________________________________________________________
              <br>ที่อยู่ตามทะเบียนบ้าน__________________________________________________________________________
              __________________________________________________________________________________________
              <br>โทร. __________________มือถือ ___________________E-mail Address _______________________________
            </td>
          </tr>
          <tr>
            <td colspan="2" class="no-tb">บุคคลที่ติดต่อได้ในกรณีฉุกเฉิน</td>
          </tr>
          <tr>
            <td colspan="2" class="no-tb">
              ชื่อ – นามสกุล _____________________________________________________โทรศัพท์ ___________________<br>
              ความสัมพันธ์_____________________________________<br>ที่อยู่ ________________________________________
              ___________________________________________________________________________________________
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <tr>
      <td colspan="3">
        <table>
          <tr>
            <th class="titlename">ข้อมูลครอบครัว (FAMILY DETAILS)</th>
          </tr>
          <tr>
            <td>
              ชื่อบิดา ____________________________________ อาชีพ ________________โทรศัพท์ ____________________<br>
              ชื่อมารดา __________________________________ อาชีพ ________________โทรศัพท์ ____________________<br>
              ที่อยู่ _______________________________________________________________________________________
            </td>
          </tr>
          <tr>
            <th class="titlename">ประวัติการศึกษา (EDUCATIONAL HISTORY)</th>
          </tr>
          <tr>
            <td>
              <table>
                <tr>
                  <th>ระดับ</th>
                  <th>สถานศึกษา</th>
                  <th>ปีที่เริ่ม</th>
                  <th>ปีที่จบ</th>
                  <th>ผลการศึกษา</th>
                </tr>
                <tr>
                  <td> </td>
                  <td> </td>
                  <td> </td>
                  <td> </td>
                  <td> </td>
                </tr>

              </table>
            </td>
          </tr>
          <tr>
            <td class="titlename">ประวัติการอบรม และกิจกรรมนอกหลักสูตร</td>
          </tr>
          <tr>
            <td>
              <table>
                <tr>
                  <th rowspan="2">หัวข้อฝึกอบรม/ฝึกงาน</th>
                  <th rowspan="2">หน่วยงาน<br>
                    ที่ให้การฝึกอบรม/ฝึกงาน</th>
                  <th colspan="2">ระยะเวลา</th>
                </tr>
                <tr>
                  <th>จาก</th>
                  <th>ถึง</th>
                </tr>
                <tr>
                  <td> </td>
                  <td> </td>
                  <td> </td>
                  <td> </td>
                </tr>
                <tr>
                  <td> </td>
                  <td> </td>
                  <td> </td>
                  <td> </td>
                </tr>
                <tr>
                  <td> </td>
                  <td> </td>
                  <td> </td>
                  <td> </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <tr>
      <td colspan="3">
        <table>
          <tr>
            <th class="titlename">จุดหมายงานอาชีพ (CAREER VISIONS)</th>
          </tr>
          <tr>
            <td class="no-border-bottom">ระบุสายงานและลักษณะงานอาชีพที่นิสิตสนใจ ( List your career goals, fields of
              interest and job preferences.)</td>
          </tr>
          <tr>
            <td>1.</td>
          </tr>
        </table>
      </td>
    </tr>

    <tr>
      <td colspan="3">
        <table>
          <tr>
            <th class="titlename">ความสามารถทางภาษา (LANGUAGE PROFICIENCY)</th>
          </tr>
          <tr>
            <td class="no-border-bottom"> shdiufyshiuhsdoifsidf </td>
          </tr>
        </table>
      </td>
    </tr>

    <tr>
      <td colspan="3">
        <table>
          <tr>
            <th class="titlename">ความสามารถพิเศษทางคอมพิวเตอร์</th>
          </tr>
          <tr>
            <td class="no-border-bottom"> shdiufyshiuhsdoifsidf </td>
          </tr>
        </table>
      </td>
    </tr>

    <tr>
      <td colspan="3">
        <table>
          <tr>
            <td class="no-border-bottom"><br>โปรดอธิบายให้ผู้อื่นรู้จักตัวท่านดีขึ้น</td>
          </tr>
          <tr>
            <td class="no-tb"> shdiufyshiuhsdoifsidf </td>
          </tr>
        </table>
      </td>
    </tr>

    <tr class="table-tr">
      <td style="width:10%;">
      </td>
      <td style="padding: 2%;">
        <p style="text-align: right;">
          <span>ลายเซ็นผู้สมัคร______________________________</span>
        </p>
        <p style="text-align: right;">
          <span>(_____________________________)</span>
        </p>
        <p style="text-align: right;">
          <span>วันที่______________________________</span>
        </p>
        <p style="text-align: center;">
          <b>คณะวิทยาการสารสนเทศ มหาวิทยาลัยบูรพา</b>
        </p>
        <p style="text-align: center;">
          <b>169 ถ.ลงหาดบางแสน ต.แสนสุข อ.เมือง จ.ชลบุรี 20131</b>
        </p>
        <p style="text-align: center;">
          <b>โทรศัพท์ 038-103060-1 โทรสาร 038-393245</b>
        </p>
        <p style="text-align: center;">
          <b>E-mail: kamonwans@buu.ac.th website : http://www.informatics.buu.ac.th/coop</b>
        </p>
      </td>
      <td style="width:10%;">
      </td>
    </tr>
  </table>`);

    console.log(change_this);

    // this.http.get<any>("http://localhost:4200/app-form/ins2").pipe(map((html: any) => console.log(html)));

    // html2canvas(this.ins.getInform(this.userData)).then(canvas => {

    //   var imgWidth = 208;
    //   var pageHeight = 295;
    //   var imgHeight = canvas.height * imgWidth / canvas.width;
    //   var heightLeft = imgHeight;

    //   const contentDataURL = canvas.toDataURL('image/png')

    //   let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF  
    //   var position = 0;
    //   pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
    //   pdf.save('MYPdf.pdf'); // Generated PDF  
    // });

  }

  printout1() {

    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    pdfMake.fonts = {
      'Roboto': {
        normal: 'Roboto-Regular.ttf',
        bold: 'Roboto-Medium.ttf',
        italics: 'Roboto-Italic.ttf',
        bolditalics: 'Roboto-Italic.ttf'
      },
      Sarabun: {
        normal: 'Sarabun-Regular.ttf',
        bold: 'Sarabun-Bold.ttf',
        italics: 'Sarabun-Italic.ttf',
        bolditalics: 'Sarabun-BoldItalic.ttf'
      },
      'code128': {
        normal: 'code128.ttf'
      }
    }

    let docDefinition = {

      defaultStyle: { font: 'Sarabun', fontSize: 12 },
      content: [
        {
          // layout: 'lightHorizontalLines', // optional
          defaultStyle: { font: 'Sarabun', margin: [10, 10, 10, 10] },
          pageBreak: 'after',
          table: {
            // headers are automatically repeated if the table spans over multiple pages
            // you can declare how many rows should be treated as headers
            widths: [100, 'auto', 100],
            heights: 'auto',
            margin: [10, 10, 10, 10],
            body: [
              // [{ rowSpan: 2, text: './assets/img/buu_logo.jpg'image: 'assets/img/buu_logo.jpg', width: 100 }, 'ใบสมัครงานสหกิจศึกษา/ฝึกงาน', { rowSpan: 2, text: 'IN-S002' }],
              [{ rowSpan: 4, border: [true, true, false, false], text: './assets/img/buu_logo.jpg', style: 'tableHeader' }, { border: [false, true, false, false], text: 'ใบสมัครงานสหกิจศึกษา/ฝึกงาน', alignment: 'center', style: 'tableHeader' }, { rowSpan: 4, border: [false, true, true, false], text: 'IN-S002', alignment: 'right', style: 'tableHeader' }],
              ['', { border: [false, false, false, false], text: 'APPLICATION FOR COOPERATIVE EDUCATION JOB', bold: true, alignment: 'center', style: 'tableHeader' }, ''],
              ['', { border: [false, false, false, false], text: 'วิชาสหกิจศึกษา คณะวิทยาการสารสนเทศ มหาวิทยาลัยบูรพา', alignment: 'center', style: 'tableHeader' }, ''],
              ['', { border: [false, false, false, true], text: 'Cooperative Education --- Faculty of Informatics Burapha University', bold: true, alignment: 'center', style: 'tableHeader' }, ''],
              [{
                colSpan: 3, table: {
                  widths: '*',
                  body: [
                    [{ text: `ข้อมูลส่วนตัวนิสิต (APPLICANT 'S INFORMATION)`, alignment: 'center' }],
                    ['ชื่อ (Name) ' + this.userData.stdFirstNameTh + ' นามสกุล (Surname) ' + this.userData.stdLastNameTh + ' โทร.  ' + this.userData.stdMmobileTel + ' มือถือ ' + this.userData.stdTel + ' E-mail Address ' + this.userData.stdEmail],
                    [{ text: 'ชื่อสถานประกอบการที่ต้องการสมัคร รอบที่ ', alignment: 'center' }],
                    ['1. ชื่อบริษัท ' + this.org.orgNameTh + '\nสมัครงานในตำแหน่ง_________________________________']
                  ]
                }
              }, '', '']

            ]
          },
          layout: {
            hLineWidth: function (i, node) {
              return (i === 0 || i === node.table.body.length) ? 1 : 1;
            },
            vLineWidth: function (i, node) {
              return (i === 0 || i === node.table.widths.length) ? 1 : 1;
            },
            hLineColor: function (i, node) {
              return (i === 0 || i === node.table.body.length) ? 'black' : 'gray';
            },
            vLineColor: function (i, node) {
              return (i === 0 || i === node.table.widths.length) ? 'black' : 'gray';
            },
            // hLineStyle: function (i, node) { return {dash: { length: 10, space: 4 }}; },
            // vLineStyle: function (i, node) { return {dash: { length: 10, space: 4 }}; },
            // paddingLeft: function(i, node) { return 4; },
            // paddingRight: function(i, node) { return 4; },
            // paddingTop: function(i, node) { return 2; },
            // paddingBottom: function(i, node) { return 2; },
            // fillColor: function (rowIndex, node, columnIndex) { return null; }
          }
        }, //end Page 1
        {
          // layout: 'lightHorizontalLines', // optional
          defaultStyle: { font: 'Sarabun' },
          table: {
            // headers are automatically repeated if the table spans over multiple pages
            // you can declare how many rows should be treated as headers
            widths: [100, 'auto', 100],
            heights: 'auto',
            margin: [10, 10, 10, 10],
            pageBreak: 'before',
            body: [
              // [{ rowSpan: 2, text: './assets/img/buu_logo.jpg'image: 'assets/img/buu_logo.jpg', width: 100 }, 'ใบสมัครงานสหกิจศึกษา/ฝึกงาน', { rowSpan: 2, text: 'IN-S002' }],
              [{ rowSpan: 4, border: [true, true, false, false], text: './assets/img/buu_logo.jpg', style: 'tableHeader' }, { border: [false, true, false, false], text: 'ใบสมัครงานสหกิจศึกษา/ฝึกงาน', alignment: 'center', style: 'tableHeader' }, { rowSpan: 4, border: [false, true, true, false], text: 'IN-S002', alignment: 'right', style: 'tableHeader' }],
              ['', { border: [false, false, false, false], text: 'APPLICATION FOR COOPERATIVE EDUCATION JOB', bold: true, alignment: 'center', style: 'tableHeader' }, ''],
              ['', { border: [false, false, false, false], text: 'วิชาสหกิจศึกษา คณะวิทยาการสารสนเทศ มหาวิทยาลัยบูรพา', alignment: 'center', style: 'tableHeader' }, ''],
              ['', { border: [false, false, false, true], text: 'Cooperative Education --- Faculty of Informatics Burapha University', bold: true, alignment: 'center', style: 'tableHeader' }, ''],

              [{
                keepWithHeaderRows: 1, colSpan: 3, table: {
                  widths: '*',
                  body: [
                    [{ text: `ข้อมูลส่วนตัวนิสิต (APPLICANT 'S INFORMATION)`, alignment: 'center' }],
                    ['ชื่อ (Name) ' + this.userData.stdFirstNameTh + ' นามสกุล (Surname) ' + this.userData.stdLastNameTh + '\nName ' + this.userData.stdFirstNameEn + ' Surname ' + this.userData.stdLastNameEn + '\nสาขาวิชา ' + this.userData.stdBranch + ' ชั้นปีที่ ' + this.userData.stdYear + ' เกรดเฉลี่ยภาคการศึกษาที่ผ่านมา ' + this.userData.std_LastGpa + ' เกรดเฉลี่ยสะสม' + this.userData.stdHsGpa + ' สถานที่เกิด ' + this.userData.stdBornPlace + ' วันเดือนปีเกิด' + this.userData.stdBornDate + ' อายุ ' + this.userData.stdAge + ' เพศ ' + this.userData.genderNameTh + ' บัตรประจำตัวประชาชนเลขที่ ' + this.userData.stdPersonId + '  สัญชาติ ' + this.userData.stdNation + ' ศาสนา ' + this.userData.stdReligion + ' ส่วนสูง cm ' + this.userData.stdHeight + ' ซม. น้ำหนัก kg ' + this.userData.stdWeigh + '  ที่อยู่ที่ติดต่อได้ ' + this.userData.stdNowAddress + '\nที่อยู่ตามทะเบียน ' + this.userData.stdHouseParticularsAddress + ' โทร.  ' + this.userData.stdMmobileTel + ' มือถือ ' + this.userData.stdTel + ' E-mail Address ' + this.userData.stdEmail]
                    // [{ border: [true, false, true, false], text: 'บุคคลที่ติดต่อได้ในกรณีฉุกเฉิน' }],
                    // [{ border: [true, false, true, true], text: 'ชื่อ – นามสกุล _____________________________________________________โทรศัพท์ ___________________\nความสัมพันธ์_____________________________________ที่อยู่ ___________' }]
                  ]
                }
              }, '', ''],
              [{
                colSpan: 3, table: {
                  widths: '*',
                  body: [
                    [{ text: `ข้อมูลครอบครัว (FAMILY DETAILS)`, alignment: 'center' }],
                    ['ชื่อบิดา' + this.userData.stdFatherNameTh + ' อาชีพ ' + this.userData.stdFatherJob + ' โทรศัพท์  ' + this.userData.stdFatherMobileTel + '\nชื่อมารดา ' + this.userData.stdMotherNameTh + ' อาชีพ ' + this.userData.stdMotherJob + ' โทรศัพท์  ' + this.userData.stdMotherMobileTel + '\nที่อยู่ ______'],
                    [{ text: 'ประวัติการศึกษา (EDUCATIONAL HISTORY)', alignment: 'center' }],
                    [{
                      table: {
                        widths: ['*', '*', '*', 'auto', 'auto'],
                        body: [
                          ['ระดับ', 'สถานศึกษา', 'ปีที่เริ่ม', 'ปีที่จบ', 'ผลการศึกษา'],
                          [this.AppForm.get('eduLv').value, this.AppForm.get('eduShl').value, this.AppForm.get('eduForm').value, this.AppForm.get('eduTo').value, this.AppForm.get('eduGpax').value]
                        ]
                      }
                    }]
                  ]
                }
              }, '', '']
            ]
          },
          layout: {
            hLineWidth: function (i, node) {
              return (i === 0 || i === node.table.body.length) ? 1 : 1;
            },
            vLineWidth: function (i, node) {
              return (i === 0 || i === node.table.widths.length) ? 1 : 1;
            },
            hLineColor: function (i, node) {
              return (i === 0 || i === node.table.body.length) ? 'black' : 'gray';
            },
            vLineColor: function (i, node) {
              return (i === 0 || i === node.table.widths.length) ? 'black' : 'gray';
            },
            // hLineStyle: function (i, node) { return {dash: { length: 10, space: 4 }}; },
            // vLineStyle: function (i, node) { return {dash: { length: 10, space: 4 }}; },
            // paddingLeft: function(i, node) { return 4; },
            // paddingRight: function(i, node) { return 4; },
            // paddingTop: function(i, node) { return 2; },
            // paddingBottom: function(i, node) { return 2; },
            // fillColor: function (rowIndex, node, columnIndex) { return null; }
          }
        }, //end Page 2
        { defaultStyle: { font: 'Sarabun' }, pageBreak: 'after', text: '' },
        {
          // layout: 'lightHorizontalLines', // optional
          defaultStyle: { font: 'Sarabun' },
          table: {
            // headers are automatically repeated if the table spans over multiple pages
            // you can declare how many rows should be treated as headers
            widths: [100, 'auto', 100],
            heights: 'auto',
            margin: [10, 10, 10, 10],
            pageBreak: 'before',
            body: [
              // [{ rowSpan: 2, text: './assets/img/buu_logo.jpg'image: 'assets/img/buu_logo.jpg', width: 100 }, 'ใบสมัครงานสหกิจศึกษา/ฝึกงาน', { rowSpan: 2, text: 'IN-S002' }],
              [{ rowSpan: 4, border: [true, true, false, false], text: './assets/img/buu_logo.jpg', style: 'tableHeader' }, { border: [false, true, false, false], text: 'ใบสมัครงานสหกิจศึกษา/ฝึกงาน', alignment: 'center', style: 'tableHeader' }, { rowSpan: 4, border: [false, true, true, false], text: 'IN-S002', alignment: 'right', style: 'tableHeader' }],
              ['', { border: [false, false, false, false], text: 'APPLICATION FOR COOPERATIVE EDUCATION JOB', bold: true, alignment: 'center', style: 'tableHeader' }, ''],
              ['', { border: [false, false, false, false], text: 'วิชาสหกิจศึกษา คณะวิทยาการสารสนเทศ มหาวิทยาลัยบูรพา', alignment: 'center', style: 'tableHeader' }, ''],
              ['', { border: [false, false, false, true], text: 'Cooperative Education --- Faculty of Informatics Burapha University', bold: true, alignment: 'center', style: 'tableHeader' }, ''],
              [{
                colSpan: 3, table: {
                  widths: '*',
                  body: [
                    [{ text: `ข้อมูลครอบครัว (FAMILY DETAILS)`, alignment: 'center' }],
                    ['ชื่อบิดา' + this.userData.stdFatherNameTh + ' อาชีพ ' + this.userData.stdFatherJob + ' โทรศัพท์  ' + this.userData.stdFatherMobileTel + '\nชื่อมารดา ' + this.userData.stdMotherNameTh + ' อาชีพ ' + this.userData.stdMotherJob + ' โทรศัพท์  ' + this.userData.stdMotherMobileTel + '\nที่อยู่ ______'],
                    [{ text: 'ประวัติการอบรม และกิจกรรมนอกหลักสูตร', alignment: 'center' }],
                    [{
                      table: {
                        widths: ['*', '*', '*', 'auto'],
                        body: [
                          [{ text: 'หัวข้อฝึกอบรม/ฝึกงาน ', rowSpan: 2 }, { text: 'หน่วยงาน\nที่ให้การฝึกอบรม/ฝึกงาน', rowSpan: 2 }, { text: 'ระยะเวลา', colSpan: 2 }, ''],
                          ['', '', 'จาก', 'ถึง'],
                          [this.AppForm.get('work').value, this.AppForm.get('work2').value, this.AppForm.get('date').value, this.AppForm.get('date2').value]
                        ]
                      }
                    }]
                  ]
                }
              }, '', ''],
              [{
                keepWithHeaderRows: 1, colSpan: 3, table: {
                  widths: '*',
                  body: [
                    [{ text: `จุดหมายงานอาชีพ (CAREER VISIONS)`, alignment: 'center' }],
                    ['ระบุสายงานและลักษณะงานอาชีพที่นิสิตสนใจ ( List your career goals, fields of interest and job preferences.)\n' + this.AppForm.get('CareerVisions').value]
                  ]
                }
              }, '', ''],
              [{
                keepWithHeaderRows: 1, colSpan: 3, table: {
                  widths: '*',
                  body: [
                    [{ text: `ความสามารถทางภาษา (LANGUAGE PROFICIENCY)`, alignment: 'center' }],
                    [this.AppForm.get('SpecialComputerSkills').value]
                  ]
                }
              }, '', ''],
              [{
                keepWithHeaderRows: 1, colSpan: 3, table: {
                  widths: '*',
                  body: [
                    [{ text: `ความสามารถพิเศษทางคอมพิวเตอร์`, alignment: 'center' }],
                    [this.AppForm.get('SpecialComputerSkills2').value]
                  ]
                }
              }, '', '']

            ]
          },
          layout: {
            hLineWidth: function (i, node) {
              return (i === 0 || i === node.table.body.length) ? 1 : 1;
            },
            vLineWidth: function (i, node) {
              return (i === 0 || i === node.table.widths.length) ? 1 : 1;
            },
            hLineColor: function (i, node) {
              return (i === 0 || i === node.table.body.length) ? 'black' : 'gray';
            },
            vLineColor: function (i, node) {
              return (i === 0 || i === node.table.widths.length) ? 'black' : 'gray';
            },
            // hLineStyle: function (i, node) { return {dash: { length: 10, space: 4 }}; },
            // vLineStyle: function (i, node) { return {dash: { length: 10, space: 4 }}; },
            // paddingLeft: function(i, node) { return 4; },
            // paddingRight: function(i, node) { return 4; },
            // paddingTop: function(i, node) { return 2; },
            // paddingBottom: function(i, node) { return 2; },
            // fillColor: function (rowIndex, node, columnIndex) { return null; }
          }
        }, //end Page 3
        { defaultStyle: { font: 'Sarabun' }, pageBreak: 'after', text: '' },
        {
          // layout: 'lightHorizontalLines', // optional
          defaultStyle: { font: 'Sarabun' },
          table: {
            // headers are automatically repeated if the table spans over multiple pages
            // you can declare how many rows should be treated as headers
            widths: [100, 'auto', 100],
            heights: 'auto',
            margin: [10, 10, 10, 10],
            pageBreak: 'before',
            body: [
              // [{ rowSpan: 2, text: './assets/img/buu_logo.jpg'image: 'assets/img/buu_logo.jpg', width: 100 }, 'ใบสมัครงานสหกิจศึกษา/ฝึกงาน', { rowSpan: 2, text: 'IN-S002' }],
              [{ rowSpan: 4, border: [true, true, false, false], text: './assets/img/buu_logo.jpg', style: 'tableHeader' }, { border: [false, true, false, false], text: 'ใบสมัครงานสหกิจศึกษา/ฝึกงาน', alignment: 'center', style: 'tableHeader' }, { rowSpan: 4, border: [false, true, true, false], text: 'IN-S002', alignment: 'right', style: 'tableHeader' }],
              ['', { border: [false, false, false, false], text: 'APPLICATION FOR COOPERATIVE EDUCATION JOB', bold: true, alignment: 'center', style: 'tableHeader' }, ''],
              ['', { border: [false, false, false, false], text: 'วิชาสหกิจศึกษา คณะวิทยาการสารสนเทศ มหาวิทยาลัยบูรพา', alignment: 'center', style: 'tableHeader' }, ''],
              ['', { border: [false, false, false, true], text: 'Cooperative Education --- Faculty of Informatics Burapha University', bold: true, alignment: 'center', style: 'tableHeader' }, ''],

              [{
                keepWithHeaderRows: 1, colSpan: 3, table: {
                  widths: '*',
                  body: [
                    [{ text: `โปรดอธิบายให้ผู้อื่นรู้จักตัวท่านดีขึ้น`, alignment: 'left' }],
                    [this.AppForm.get('SpecialComputerSkills').value]
                  ]
                }
              }, '', ''],
              [{
                keepWithHeaderRows: 1, colSpan: 3, table: {
                  widths: '*',
                  body: [
                    [{ text: `ความสามารถพิเศษทางคอมพิวเตอร์`, alignment: 'center' }],
                    [this.AppForm.get('SpecialComputerSkills2').value]
                  ]
                }
              }, '', '']

            ]
          },
          layout: {
            hLineWidth: function (i, node) {
              return (i === 0 || i === node.table.body.length) ? 1 : 1;
            },
            vLineWidth: function (i, node) {
              return (i === 0 || i === node.table.widths.length) ? 1 : 1;
            },
            hLineColor: function (i, node) {
              return (i === 0 || i === node.table.body.length) ? 'black' : 'gray';
            },
            vLineColor: function (i, node) {
              return (i === 0 || i === node.table.widths.length) ? 'black' : 'gray';
            },
            // hLineStyle: function (i, node) { return {dash: { length: 10, space: 4 }}; },
            // vLineStyle: function (i, node) { return {dash: { length: 10, space: 4 }}; },
            // paddingLeft: function(i, node) { return 4; },
            // paddingRight: function(i, node) { return 4; },
            // paddingTop: function(i, node) { return 2; },
            // paddingBottom: function(i, node) { return 2; },
            // fillColor: function (rowIndex, node, columnIndex) { return null; }
          }
        }//, end Page 4
      ]
    };

    // download the PDF
    // pdfMake.createPdf(docDefinition).download();
    pdfMake.createPdf(docDefinition).download();

  }

  loadingProvinces() {
    this.appFormService.getProvince().subscribe((data: {}) => {
      this.A2Provinces = this.Provinces = data;
    }, (err) => { }, () => {
      for (var i = 0; i < this.Provinces.length; i++) {
        if (this.Provinces[i].id == this.stdBornPlace) {
          this.selectedBornPlace(this.Provinces[i]);
          return;
        }
      }
    });
  }

  // loadingAmphures(adr: boolean, pv: number) {
  //   this.appFormService.getAmphure(pv).subscribe((data: {}) => {
  //     if (adr === true) { this.Amphures = data; return; }
  //     this.A2Amphures = data;
  //   });

  // }

  // loadingDistricts(adr: boolean, amp: number) {
  //   this.appFormService.getDistrict(amp).subscribe((data: {}) => {
  //     if (adr === true) { this.Districts = data; return; }
  //     this.A2Districts = data;
  //   });
  // }

  enableAddressOther(event) {
    this.FDAddressOther = false;

    if (event === 0) {
      this.FDAddressOther = true;
    } else if (event === 1) {
      if (this.AppForm.get('Address1').value != null) {
        this.AppForm.get('stdParentAddress').setValue(this.AppForm.get('Address1').value);
      } else {
        this.AppForm.get('stdParentAddress').setValue(this.userData.stdHouseParticularsAddress);
      }
    } else if (event === 2) {
      if (this.AppForm.get('Address2').value != null) {
        this.AppForm.get('stdParentAddress').setValue(this.AppForm.get('Address2').value);
      } else {
        this.AppForm.get('stdParentAddress').setValue(this.userData.stdNowAddress);
      }
    } else {
      this.AppForm.get('stdParentAddress').setValue(this.userData.stdParentAddress);
    }
  }

  // }

  public get getFDAddressOther() {
    return this.FDAddressOther;
  }

  // showAmphures(adr: boolean = true, $event) {
  //   console.log('adr : ',adr);
  //   console.log('$event : ',$event);
  //   if ($event) {
  //     if (adr === true) {
  //       this.Amphures = null;
  //       this.AppForm.get('selectedAmphures').patchValue(null);
  //       this.Districts = null;
  //       this.AppForm.get('selectedDistricts').patchValue(null);
  //       this.Zipcode = null;

  //       this.Provinces = this.AppForm.get('selectedProvinces').value;
  //       this.loadingAmphures(adr, $event.id);

  //     } else if (adr === false) {
  //       this.A2Amphures = null;
  //       this.AppForm.get('selectedAmphures2').patchValue(null);
  //       this.A2Districts = null;
  //       this.AppForm.get('selectedDistricts2').patchValue(null);
  //       this.A2Zipcode = null;

  //       this.A2Provinces = this.AppForm.get('selectedProvinces2').value;
  //       this.loadingAmphures(adr, $event.id);
  //     }
  //   }
  // }

  // showDistricts(adr: boolean = true, $event) {
  //   if ($event) {
  //     if (adr === true) {
  //       this.Districts = null;
  //       this.AppForm.get('selectedDistricts').patchValue(null);
  //       this.Zipcode = null;

  //       this.loadingDistricts(adr, $event.id);

  //     } else if (adr === false) {
  //       this.A2Districts = null;
  //       this.AppForm.get('selectedDistricts2').patchValue(null);
  //       this.A2Zipcode = null;

  //       this.loadingDistricts(adr, $event.id);
  //     }
  //   }

  // }

  // showZipcode(adr: boolean = true, $event) {
  //   if ($event.zipcode === 0) {
  //     return;
  //   }
  //   if (adr === true) { this.Zipcode = $event.zipcode } else { this.A2Zipcode = $event.zipcode }
  // }

  // public get getZipcode() {
  //   return this.Zipcode;
  // }

  // public get getA2Zipcode() {
  //   return this.A2Zipcode;
  // }


  // SameAddress() {
  //   this.SameAddress1 = this.AppForm.get('SameAddress1').value;
  //   if(this.SameAddress1 === true){
  //     this.showAmphures(false, this.Provinces);
  //     this.showDistricts(false, this.Amphures);
  //     this.showZipcode(false, this.Districts)
  //     this.TriggerAddress();
  //   }
  // }

  // TriggerAddress(){
  //   this.AppForm.get('selectedProvinces2').patchValue(this.AppForm.get('selectedProvinces').value);
  //   console.log('this -> ',this.Amphures);

  //   this.AppForm.get('selectedAmphures2').patchValue(this.AppForm.get('selectedAmphures').value);


  // }

}
