function batchGetValues(spreadsheetId, _ranges, callback) {
  let ranges = [
    // Range names ...
  ];
  ranges = _ranges;
  try {
    gapi.client.sheets.spreadsheets.values.batchGet({
      spreadsheetId: spreadsheetId,
      ranges: ranges,
    }).then((response) => {
      const result = response.result;
      console.log(`${result.valueRanges.length} ranges retrieved.`);
      if (callback) callback(response);
    });
  } catch (err) {
    document.getElementById('content').innerText = err.message;
    return;
  }
}

batchGetValues('1aiBHwvFfLx21bpbXbQ6edn7Zyp_JK08oEqZYNnbTiSs')

// fetch(
//   "https://docs.google.com/spreadsheets/d/1aiBHwvFfLx21bpbXbQ6edn7Zyp_JK08oEqZYNnbTiSs/edit?gid=0#gid=0"
// )
//   .then((response) => response.text())
//   .then((data) => process(data));

// function process(data) {

//   // new DOMParser().parseFromString(temp1[0][0], "text/xml").firstChild.innerHTML

//   let rows = [];
//   let cells = [];
//   let tempString = "";
//   let skipHeader = false

//   for (let i = 0; i < data.length; i++) {
//     if (data[i - 3] == "/" && data[i - 2] == "t" && data[i - 1] == "r") {
//       if(skipHeader){
//         rows.push(cells);
//         cells = [];
//       }
//       skipHeader = true
//     }
//     if (data[i - 3] == "<" && data[i - 2] == "t" && data[i - 1] == "d") {
//       while (data[i] !== ">") {
//         i++;
//       }
//       i++;
//       let j = i;
//       while (data[j] + data[j + 1] + data[j + 2] + data[j + 3] !== "</td") {
//         tempString += data[j];
//         j++;
//       }

//       cells.push(tempString);
//       tempString = "";
//     }
//   }
//   console.log(rows);
// }
