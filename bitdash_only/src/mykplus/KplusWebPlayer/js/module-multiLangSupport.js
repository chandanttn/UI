
var errorMsgsObj = [
    {
        /*index 0*/
        eng: "We're unable to log you in. Please try again later or contact our Customer Support Center.",
        vie: "Không thể truy cập. Vui lòng thử lại sau hoặc liên hệ Tổng đài hỗ trợ khách hàng."
    },
    {
        /*index 1*/
        eng: "We're experiencing some problems. Please try again later or contact our support. ",
        vie: "Chưa thực hiện được yêu cầu. Vui lòng thử lại sau hoặc liên hệ Tổng đài hỗ trợ khách hàng."
    },
    {
        /*index 2*/
        eng: "Your device time is incorrect. Please adjust and reload application.",
        vie: "Thời gian trên máy chưa đúng. Vui lòng chỉnh lại và mở lại ứng dụng."
    },
    {
        /*index 3*/
        eng: "The playback is stopped because you are watching too many streams concurrently.",
        vie: "Tín hiệu tạm ngưng do tài khoản có quá nhiều kết nối cùng lúc."
    },
    {
        /*index 4*/
        eng: "Unfortunately, this program is currently not available for internet broadcast. Please tune in later for other programs.",
        vie: "Rất tiếc, chương trình này chưa được phát qua internet. Vui lòng đón xem các chương trình tiếp theo"
    },
    {
        /*index 5*/
        eng: "This service can only be used in Vietnam.",
        vie: "Dịch vụ chỉ được cung cấp trong phạm vi lãnh thổ Việt Nam."
    },
    {
        /*index 6*/
        eng: "This channel does not belong to your package. Kindly contact our support center.",
        vie: "Kênh này không thuộc gói kênh của bạn. Vui lòng liên hệ Tổng đài hỗ trợ khách hàng."
    },
    {
        /*index 7*/
        eng: "It seems you have a pop-up blocker turned on.",
        vie: "Trình duyệt của bạn đang chặn pop-up."
    },
    {
        /*index 8*/
        eng: "You are using too many devices. Please contact our support if you still want to use this device.",
        vie: "Vượt quá số lượng thiết bị đăng ký dịch vụ. Vui lòng liên hệ Tổng đài hỗ trợ khách hàng."
    },
    {
        /*index 9*/
        eng: "No information available",
        vie: "Hiện tại không có thông tin"
    },
    {
        /*index 10*/
        eng: "Please check your internet connection and try again. ",
        vie: "Vui lòng kiểm tra kết nối và thử lại."
    },
    {
        /*index 11*/
        eng: "Your account has been locked. Kindly contact our Call Center 19001592 for further support.",
        vie: "Tài khoản đã bị khóa. Vui lòng liên hệ 19001592 để được hỗ trợ thêm."
    },
    {
        /*index 12*/
        eng: "Stop tampering with Finger Print.",
        vie: "Stop tampering with Finger Print."
    },
    {
        /*index 13*/
        eng: "Start-over duration has expired.",
        vie: "Đã quá thời hạn xem lại."
    },
    {
        /*index 14*/
        eng: "The internet connection is not stable. Please check then refresh this page.",
        vie: "Kết nối mạng không ổn định. Vui lòng kiểm tra rồi tải lại (refresh) trang này."
    },
    {
        /*index 15*/
        eng: "Device limit exceeded or network interruption. Please refresh the browser (F5) to try again or contact our support 19001592.",
        vie: "Đã vượt quá số lượng thiết bị đăng kí dịch vụ hoặc kết nối mạng bị gián đoạn. Vui lòng làm mới trình duyệt (F5) để thử lại hoặc liên hệ 19001592 để được hỗ trợ."
    }
];

var weekDays = [
    {
        /*index 0*/
        eng: "Sunday",
        vie: "Chủ nhật"
    },
    {
        /*index 1*/
        eng: "Monday",
        vie: "Thứ 2"
    },
    {
        /*index 2*/
        eng: "Tuesday",
        vie: "Thứ 3"
    },
    {
        /*index 3*/
        eng: "Wednesday",
        vie: "Thứ 4"
    },
    {
        /*index 4*/
        eng: "Thursday",
        vie: "Thứ 5"
    },
    {
        /*index 5*/
        eng: "Friday",
        vie: "Thứ 6"
    },
    {
        /*index 6*/
        eng: "Saturday",
        vie: "Thứ 7"
    }

];

var monthDays = [
    {
        /*index 0*/
        eng: "Jan",
        vie: "Tháng 1"
    },
    {
        /*index 1*/
        eng: "Feb",
        vie: "Tháng 2"
    },
    {
        /*index 2*/
        eng: "Mar",
        vie: "Tháng 3"
    },
    {
        /*index 3*/
        eng: "Apr",
        vie: "Tháng 4"
    },
    {
        /*index 4*/
        eng: "May",
        vie: "Tháng 5"
    },
    {
        /*index 5*/
        eng: "Jun",
        vie: "Tháng 6"
    },
    {
        /*index 6*/
        eng: "Jul",
        vie: "Tháng 7"
    },
    {
        /*index 7*/
        eng: "Aug",
        vie: "Tháng 8"
    },
    {
        /*index 8*/
        eng: "Sep",
        vie: "Tháng 9"
    },
    {
        /*index 9*/
        eng: "Oct",
        vie: "Tháng 10"
    },
    {
        /*index 10*/
        eng: "Nov",
        vie: "Tháng 11"
    },
    {
        /*index 11*/
        eng: "Dec",
        vie: "Tháng 12"
    }

];

module.exports = {

    
    labelsObjArr : [
        {
            /*index 0*/
            eng: 'Language',
            vie: 'Ngôn ngữ'
        },
        {
            /*index 1*/
            eng: 'Quality',
            vie: 'Chất lượng'
        },
        {
            /*index 2*/
            eng: 'Info',
            vie: 'Giới thiệu'
        },
        {
            /*index 3*/
            eng: 'myK+',
            vie: 'myK+'
        },
        {
            /*index 4*/
            eng: 'Vietnamese',
            vie: 'Tiếng Việt'
        },
        {
            /*index 5*/
            eng: 'Original',
            vie: 'Ngôn ngữ gốc'
        },
        {
            /*index 6*/
            eng: 'Video Quality',
            vie: 'Chất lượng hình ảnh'
        },
        {
            /*index 7*/
            eng: 'Current Bandwidth',
            vie: 'Băng thông hiện tại'
        },
        {
            /*index 8*/
            eng: 'Limit video buffer duration',
            vie: 'Giới hạn thời gian tải video'
        },
        {
            /*index 9*/
            eng: 'Limit bandwidth',
            vie: 'Giới hạn băng thông'
        },
        {
            /*index 10*/
            eng: 'Info',
            vie: 'Giới thiệu'
        },
        {
            /*index 11*/
            eng: 'Broadcast Schedule',
            vie: 'Lịch phát sóng'
        },
        {
            /*index 12*/
            eng: 'Broadcast info: ',
            vie: 'Thông tin phát sóng: '
        },
        {
            /*index 13*/
            eng: 'Director: ',
            vie: 'Đạo diễn: '
        },
        {
            /*index 14*/
            eng: 'Cast: ',
            vie: 'Diễn viên: '
        },
        {
            /*index 15*/
            eng: 'Summary: ',
            vie: 'Tóm tắt: '
        },
        {
            /*index 16*/
            eng: 'NEXT',
            vie: 'Tiếp theo'
        },
        {
            /*index 17*/
            eng: 'Genre: ',
            vie: 'Thể loại: '
        },
        {
            /*index 18*/
            eng: ' seconds',
            vie: ' giây'
        },
        {
            /*index 19*/
            eng: 'mins',
            vie: 'phút'
        },
        {
            /*index 20*/
            eng: 'On now',
            vie: 'Đang phát sóng'
        },
        {
            /*index 21*/
            eng: 'START OVER',
            vie: 'Xem lại'
        }
    ],


    
    getWeekDayName(dayEngTxt, language) {
        var returnVal;

        weekDays.forEach((wkDay) => {
            if (wkDay.eng === dayEngTxt) {
                if (language === 'eng') {
                    returnVal = wkDay.eng;
                } else {
                    returnVal = wkDay.vie;
                }
            }
        });

        return returnVal;
    },

   
    getMonthName(monthNum, language) {
        if (language === 'eng') {
            return monthDays[monthNum].eng;
        } else {
            return monthDays[monthNum].vie;
        }
    },

    
    getLabel(labelId, language) {
        if (labelId < 0 || labelId >= this.labelsObjArr.length) {
            throw 'invalid labelId supplied to getLabel function in this';
        }

        if (language === 'eng') {
            return this.labelsObjArr[labelId].eng;
        } else if (language === 'vie') {
            return this.labelsObjArr[labelId].vie;
        }
    },

    
    getErrorMsg(msgId, language) {
        if (msgId < 0 || msgId >= errorMsgsObj.length) {
            throw 'invalid labelId supplied to getLabel function in this';
        }

        if (language === 'eng') {
            return errorMsgsObj[msgId].eng;
        } else if (language === 'vie') {
            return errorMsgsObj[msgId].vie;
        }
    }

}