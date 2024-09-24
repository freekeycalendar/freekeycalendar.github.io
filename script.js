
const RESPONSE = 
[
    {
        "event": "Cool people concert",
        "date": "9/28",
        "location": "The Greek",
        "id": 2
    },
    {
        "event": "lame concert",
        "date": "9/30",
        "location": "my basement",
        "id": 3
    }
]


function getRows() {
  // let url = 'https://api.sheety.co/1e98435928ea803a2e7aa06d00608900/fkcSocialCalendar/sheet1';
  // fetch(url)
  // .then((response) => response.json())
  // .then(json => {
  //   // Do something with the data
  //   console.log(json.sheet1S);
  // });
  return RESPONSE;
}


function addRow() {
  let url = 'https://api.sheety.co/1e98435928ea803a2e7aa06d00608900/fkcSocialCalendar/sheet1';
  let body = {
    event: {
        "event": "amazing hangout",
        "date": "9/30",
        "location": "the alley",
    },
  }
    
  fetch(url, {
    method: 'POST',
    body: JSON.stringify(body)
  })
  .then((response) => response.json())
  .then(json => {
    // Do something with object
    console.log(json.sheet1);
  });
}
