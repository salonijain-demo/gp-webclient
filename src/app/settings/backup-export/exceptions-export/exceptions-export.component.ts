import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-exceptions-export',
  templateUrl: './exceptions-export.component.html',
  styleUrls: ['./exceptions-export.component.scss']
})
export class ExceptionsExportComponent implements OnInit {

  exception = {
    start: {
    open: false,
    time: new Date()
    },
    end: {
      open: false,
      time: new Date()
    }
  }

  serial = {
    start: {
    open: false,
    time: new Date()
    },
    end: {
      open: false,
      time: new Date()
    }
  }
  startDate = new Date(1990, 0, 1);

  constructor() { }

  ngOnInit() {
  }

  open_picker = function (event, object) {
    event.preventDefault();
    event.stopPropagation();
    object.open = true;
  };

  // $scope.download_csv = function (which) {
  //   if (['exception', 'serial'].indexOf(which) != -1) {
  //     if ($scope[which].start.time <= $scope[which].end.time) {
  //       var st_time = $scope[which].start.time.toUTCString();
  //       var ed_time = $scope[which].end.time.toUTCString();
  //       url = $rootScope.api_url + '/settings/order_' + which + 's.csv?start=' + st_time + '&end=' + ed_time
  //       $http.get(url)
  //         .success(function (response) {
  //           // to download csv from S3
  //           var downloadLink = angular.element('<a></a>');//create a new  <a> tag element
  //           downloadLink.attr('href', response.filename.url);
  //           downloadLink.attr('download', response.filename.filename);
  //           downloadLink.attr('target','_self');
  //           downloadLink[0].click();//call click function
  //         }).error(notification.server_error);

  //       // $window.open('/settings/order_' + which + 's.csv?start=' + $scope[which].start.time + '&end=' + $scope[which].end.time);
  //     } else {
  //       $scope.notify('Start time can not be after End time');
  //     }
  //   } else {
  //     $scope.notify('Unknown csv requested');
  //   }
  // }
}
