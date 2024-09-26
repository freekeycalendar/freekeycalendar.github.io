
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
  // let url = 'https://api.sheety.co/1e98435928ea803a2e7aa06d00608900/fkcSocialCalendar/events';
  // fetch(url)
  // .then((response) => response.json())
  // .then(json => {
  //   // Do something with the data
  //   return json.events;
  // });
  return RESPONSE;
}


function addRow() {
  let url = 'https://api.sheety.co/1e98435928ea803a2e7aa06d00608900/fkcSocialCalendar/events';
  let body = {
    event: {
        "event": "amazing hangout",
        "date": "9/30",
        "location": "the alley",
    },
  }
    
  fetch(url, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
  .then((response) => response.json())
  .then(json => {
    // Do something with object
    console.log(json.sheet1);
  })
  .catch((err) => {
      console.log(err);
  });
}

function renderRows() {
    let rows = getRows();
    for (let i = 0; i < rows.length; i++) {
        let r = rows[i];
        let event = r['event'];
        let date = r['date'];
        let location = r['location'];
        const node = document.createElement("div");
        const titlenode = document.createElement("div");
        titlenode.innerText = event;
        titlenode.classList.add("title");
        const datenode = document.createElement("div");
        datenode.innerText = date;
        datenode.classList.add("date");
        const locationnode = document.createElement("div");
        locationnode.innerText = location;

        locationnode.classList.add("location");
        node.appendChild(datenode);
        node.appendChild(titlenode);
        node.appendChild(locationnode);

        node.clasList.add("event");

        document.getElementById("eventDaddy").appendChild(node);
    }
}


renderRows();
