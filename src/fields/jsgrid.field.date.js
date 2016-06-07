(function(jsGrid, $, undefined) {

    // DateField depends on these two files from https://github.com/eternicode/bootstrap-datepicker/blob/master/docs/index.rst
    // bootstrap-datepicker3.min.css
    // bootstrap-datepicker.min.js
    
    $(document).ready(function () {
        if (!$.fn.datepicker) {
            console.log("jsGrid date field type depends on the following two files from: https://github.com/eternicode/bootstrap-datepicker/blob/master/docs/index.rst");
            console.log("bootstrap-datepicker3.min.css");
            console.log("bootstrap-datepicker.min.js");
        }
    });

    var DateField = function (config) {
        jsGrid.Field.call(this, config);
    };

    DateField.prototype = new jsGrid.Field({

        css: "date-field",
        align: "center",

        sorter: function (date1, date2) {
            return new Date(date1) - new Date(date2);
        },

        itemTemplate: function (value) {
            return this.getDateString(new Date(value));
        },

        insertTemplate: function (value) {
            if (this.checkForDatePicker()) {
                return this._insertPicker = $("<input>").datepicker({ defaultDate: new Date() });
            }
            return this._insertPicker = $("<input>").val(this.getDateString(new Date())).attr("type", "text");
        },

        editTemplate: function (value) {
            if (this.checkForDatePicker()) {
                return this._editPicker = $("<input>").datepicker().datepicker("setDate", new Date(value));
            }
            return this._editPicker = $("<input>").val(this.getDateString(new Date(value))).attr("type", "text");
        },

        insertValue: function () {
            if (this.checkForDatePicker()) {
                return this._insertPicker.datepicker("getDate").toISOString();
            }
            return new Date(this._insertPicker.val());
        },

        editValue: function () {
            if (this.checkForDatePicker()) {
                return this._editPicker.datepicker("getDate").toISOString();
            }
            return new Date(this._editPicker.val());
        },

        checkForDatePicker: function () {
            if (!$.fn.datepicker) {
                return false;
            }
            return true;
        },
        
        getDateString: function (dateValue) {
            var day = dateValue.getDate();
            var monthIndex = dateValue.getMonth();
            var year = dateValue.getFullYear();
            return (monthIndex + 1) + "/" + day + "/" + year;
        }
    });

    jsGrid.fields.date = DateField;

}(jsGrid, jQuery));
