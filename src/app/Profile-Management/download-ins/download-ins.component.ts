import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentdataInterface } from '../../_models/stu-data-interface';
import { StudentDataService } from '../../services/std-ins-form.service';
import { AuthGuard } from '../../_guards';
import { User, Role } from '../../_models';
import { UserService, AuthenticationService } from '../../_services';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-download-ins',
  templateUrl: './download-ins.component.html',
  styleUrls: ['./download-ins.component.css']
})
export class DownloadInsComponent implements OnInit {

  currentUser: User;
  userFromApi: User;
  std: any

  constructor(
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private studentdataService: StudentDataService,
    private authGuardService: AuthGuard
  ) {
    this.userFromApi = this.currentUser = this.authenticationService.currentUserValue;
  }

  ngOnInit() {
    // this.getstudentdata(this.currentUser.userId);
    this.getstudentdata(this.currentUser.userId);
    // this.printout();
    // console.log("std id : ", this.currentUser.userId);
    //this.getstudentdata()
  }
  get isSignin() {
    if (this.currentUser != null) {
      return true;
    }
    return false;
  }

  get isUser() {
    return this.currentUser && this.currentUser.userId === Role.User;
  }

  getstudentdata(stdId: number) {

    // console.log("std id : ", stdId);
    // console.log("std : ", this.userFromApi);
    this.studentdataService.getstdBystdId(stdId).subscribe((data: {}) => {
      this.std = data;
    });
  }

  printout() {
    // const doc = new jsPDF();
    // var res = doc.autoTableHtmlToJson(document.getElementById("test"));

    // doc.autoTable(res.columns, res.data, {
    //   margin: { top: 40, horizontal: 10 }, startY: false, theme: 'grid', pageBreak:
    //     'always', tableWidth: 'auto', columnWidth: 'wrap', showHeader: 'everyPage',
    //   tableLineColor: 200, tableLineWidth: 0,
    //   columnStyles: {
    //     0: { columnWidth: 'auto' }, 1: { columnWidth: 'auto' }, 2: { columnWidth: 'auto' }, 3:
    //       { columnWidth: 'auto' }, 4: { columnWidth: 'auto' },
    //     5: { columnWidth: 'auto' }, 6: { columnWidth: 'auto' }, 7: { columnWidth: 'auto' }, 8:
    //       { columnWidth: 'auto' }
    //   },
    //   headerStyles: { theme: 'grid' },
    //   styles: {
    //     overflow: 'linebreak', columnWidth: 'wrap', font: 'arial', fontSize: 10,
    //     cellPadding: 8, overflowColumns: 'linebreak'
    //   },
    // });
    // doc.autoTable({ html: '#test' });
    // doc.save('table.pdf');
    // =======================================================================
    // var doc = new jsPDF('p', 'pt');

    // var res = doc.autoTableHtmlToJson(document.getElementById("test"));
    // console.log(res);
    // doc.autoTable(res.columns, res.data, { margin: { top: 80 } });

    // var header = function (data) {
    //   doc.setFontSize(18);
    //   doc.setTextColor(40);
    //   doc.setFontStyle('normal');
    //   //doc.addImage(headerImgData, 'JPEG', data.settings.margin.left, 20, 50, 50);
    //   doc.text("Testing Report", data.settings.margin.left, 50);
    // };

    // var options = {
    //   beforePageContent: header,
    //   margin: {
    //     top: 80
    //   },
    //   startY: doc.autoTableEndPosY() + 20
    // };

    // doc.autoTable(res.columns, res.data, options);

    // doc.save("table.pdf");
    window.print();
  }

}
