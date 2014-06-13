"use strict";

function downloadCSV() {
    function sheet_from_array_of_arrays() {
        var row_num = data.length;
        var keys = Object.keys(data[0])
        var col_num = keys.length;

        var ws = {};
        var range = {s: {c: 0, r: 0}, e: {c: col_num, r: row_num }};
        ws['!ref'] = XLSX.utils.encode_range(range);

        for (var R = 0; R < row_num; R++) {
            for (var C = 0; C < col_num; C++) {
                var cell_ref = XLSX.utils.encode_cell({c: C, r: R});
                var cell = {v: data[R][keys[C]] };
                cell.t = 's';
                ws[cell_ref] = cell;
            }
        }
        return ws;
    }

    function s2ab(s) {
        var buf = new ArrayBuffer(s.length);
        var view = new Uint8Array(buf);
        for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
        return buf;
    }

    function Workbook() {
        if (!(this instanceof Workbook)) return new Workbook();
        this.SheetNames = [];
        this.Sheets = {};
    }

    var ws = sheet_from_array_of_arrays();

    var workbook = new Workbook();
    workbook.SheetNames.push("テスト");
    workbook.Sheets["テスト"] = ws;

    var wbout = XLSX.write(workbook, {
        bookType: 'xlsx',
        bookSST: true,
        type: 'binary'
    });

    saveAs(new Blob([s2ab(wbout)], {type: ""}), "report.xlsx");
}
