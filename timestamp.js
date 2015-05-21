angular.module('ghotaFilters', []).filter('timestamp', function() {
  return function(input) {
    return (input) => {
        var retArr = [],
          dayTimeParts = [],
          hoursMinutesSeconds = [],
          days = '0',
          time = '0',
          showSeconds = false;

        function removeLeadingZeros(str) {
          if (str[0] !== undefined) {
            if (str[0] === '-' && str[1] !== undefined && str[1] === '0') {
              str = '-' + str.substr(2);
            } else if (str[0] === '0') {
              str = str.substr(1);
            }
          }
          return str;
        }

        if (input !== undefined) {
          dayTimeParts = input.split('.');
          switch (dayTimeParts.length) {
            case 3:
              days = dayTimeParts[0];
              time = dayTimeParts[1];
              break;
            case 2:
              if (dayTimeParts[0].indexOf(':') > -1) {
                time = dayTimeParts[0];
              } else {
                days = dayTimeParts[0];
                time = dayTimeParts[1];
              }
              break;
            case 1:
              time = dayTimeParts[0];
              break;
          }

          if (days !== '0') {
            retArr.push(removeLeadingZeros(days) + ' Days');
          }

          else if (time !== '00:00:00') {
            hoursMinutesSeconds = time.split(':');
            if (hoursMinutesSeconds[0] !== '00') {
              retArr.push(removeLeadingZeros(hoursMinutesSeconds[0]) + ' Hours');
            }
            if (hoursMinutesSeconds[1] !== '00') {
              retArr.push(removeLeadingZeros(hoursMinutesSeconds[1]) + ' Min');
            }
            if (showSeconds && hoursMinutesSeconds[2] !== '00') {
              retArr.push(removeLeadingZeros(hoursMinutesSeconds[2]) + ' Seconds');
            }
          }
        }

        if (retArr.length === 0) {
          retArr.push('N\\A');
        }

        return retArr.join(', ');
      };
  };
});