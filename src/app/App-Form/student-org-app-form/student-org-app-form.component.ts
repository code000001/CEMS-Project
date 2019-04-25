import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthenticationService } from '../../_services';
import { AppFormService } from '../../Services/app-form.service';
import { OrganizationService } from '../../services/organization.service';
import { Userappform, AnouncementInterface, OrganizationDataInterface } from '../../_models';
import { PositionDataInterface } from '../../_models/position-data-interface';
// import { KeyedWrite } from '@angular/compiler';
import { formatDate } from '@angular/common';

import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

@Component({
  selector: 'app-student-org-app-form',
  templateUrl: './student-org-app-form.component.html',
  styleUrls: ['./student-org-app-form.component.css']
})
export class StudentOrgAppFormComponent implements OnInit {
  org: OrganizationDataInterface;
  positionData: PositionDataInterface;
  ListPosition: PositionDataInterface[] = [];
  errortype: string = '';
  error: string = '';
  ann: number;
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

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private appFormService: AppFormService,
    private authenticationService: AuthenticationService,
    private http: HttpClient,
    private organizationService: OrganizationService
  ) {
    // this.activatedRoute.params.subscribe( params => this.orgId = params);

    this.LANGUAGEskill = [{ th: 'ฟัง', en: 'Listening', children: this.countLevel },
    { th: 'พูด', en: 'Speaking', children: this.countLevel },
    { th: 'อ่าน', en: 'Reading', children: this.countLevel },
    { th: 'เขียน', en: 'Writing', children: this.countLevel }]
    // this.loadingProvinces();
    this.loadingData();
    this.loadingProvinces();
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
    if (this.AppForm.get('stdParentMobileTel').value != null) { this.userData.stdParentMobile = this.AppForm.get('stdParentMobileTel').value }
    if (this.AppForm.get('stdYear').value != null) { this.userData.stdYear = this.AppForm.get('stdYear').value }
    if (this.AppForm.get('stdEmail').value != null) { this.userData.stdEmail = this.AppForm.get('stdEmail').value }
    // if (this.AppForm.get('stdGpax').value != null) { this.userData.stdGpax = this.AppForm.get('stdGpax').value }
    if (this.AppForm.get('stdHsGpa').value != null) { this.userData.stdHsGpa = this.AppForm.get('stdHsGpa').value }
    if (this.AppForm.get('stdFatherJob').value != null) { this.userData.stdFatherJob = this.AppForm.get('stdFatherJob').value }
    if (this.AppForm.get('stdParentMobile').value != null) { this.userData.stdParentMobile = this.AppForm.get('stdParentMobile').value }
    if (this.AppForm.get('stdMotherJob').value != null) { this.userData.stdMotherJob = this.AppForm.get('stdMotherJob').value }
    if (this.AppForm.get('stdMotherMobileTel').value != null) { this.userData.stdMotherMobileTel = this.AppForm.get('stdMotherMobileTel').value }
    if (this.AppForm.get('std_LastGpa').value != null) { this.userData.std_LastGpa = this.AppForm.get('std_LastGpa').value }


    // this.submitted = true;
    // console.log(this.userData);
    this.appFormService.updateStdAppForm(this.userData)
      .subscribe(() => {
        this.errortype = 'success';
        this.error = 'บันทึกข้อมูลสำเร็จ';
      }, err => {
        console.log(' err updateStdAppForm -> ', err);
        this.errortype = 'danger';
        this.error = 'ไม่สามารถบันทึกข้อมูลได้ กรุณาตรวจสอบข้อมูลของท่าน';
      });

    if (this.errortype != 'success') {

    } else {
      setTimeout(() => {
      }, 1000);

      window.location.reload();
    }
  }

  public get countLevel() {
    return this.LANGUAGElevel.length;
  }

  public get countskill() {
    return this.LANGUAGEskill.length;
  }

  ngOnInit() {


    // this.ann =  
    // this.appFormService.checkStatusAnn(parseInt(annid)).subscribe(response => { this.ann = response });
    // console.log('ann -> ',this.ann);

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
  }

  loadingData() {
    const annid = this.activatedRoute.snapshot.paramMap.get('ann');

    // console.log(parseInt(annid));
    this.appFormService.getAnn(parseInt(annid)).subscribe(data => {
      this.ann = data.annStatusId;
    });

    if (this.ann == 2) {
      this.router.navigate([`/view_announcement/${this.activatedRoute.snapshot.paramMap.get('id')}`]);
    }

    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.organizationService.getDetailById(parseInt(id))
      .subscribe(org =>
        this.org = org
      );

    this.organizationService.getPositionById(parseInt(annid))
      .subscribe(positionData => {
        this.positionData = positionData
        this.ListPosition.push(positionData);
        // console.log(this.ListPosition)
      });

    // this.userData.stdAge ;
    // this.today - newDate;
    this.appFormService.getINS02().subscribe(data => {
      // data.stdBornDate;
      // console.log(' date ',data.stdAge);
      this.stdBornPlace = parseInt(data.stdBornPlace);
      if (data.stdAge != "-" || data.stdAge != null) {
        data.stdAge = parseInt(formatDate(new Date(), 'yyyy', 'en')) - parseInt(formatDate(data.stdBornDate, 'yyyy', 'en'));
      }
      this.userData = data;
    });
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
    console.log(this.AppForm.get('SameAddress1').value);
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


  printout() {

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
