
const RESPONSE = 
[
    {
        "event": "Cool people concert",
        "date": "9/28",
        "time": "8pm",
        "location": "The Greek",
        "image link": "https://cdn.prod.website-files.com/654be393d1f855d893dfbd53/6664ae41dc4bf349f1438ee4_3c62edc0-3d9f-4fcb-bfc7-905a0275059d-p-1600.png",
        "description": "This will be a really cool concert that happens at the greek. if you don't come you're a loser",
        "id": 2
    },
    {
        "event": "lame concert",
        "date": "9/30",
        "location": "my basement",
        "image link": "https://cdn.prod.website-files.com/654be393d1f855d893dfbd53/6639af43e09b142b1467c81c_charlie_poster_out_of_time.png",
        "description": "This concert is honestly gonna suck, idk why you would come",
        "id": 3
    },
    {
        "event": "suspicious concert",
        "date": "11/1",
        "location": "somewhere",
        "id": 4
    },
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
        let time = r['time'];
        let location = r['location'];
        let imagelink = r['image link'];
        let description = r['description']
        
        const node = document.createElement("div");
        node.classList.add("event");

        const sepnode = document.createElement("hr");
        sepnode.classList.add("separator");
        node.appendChild(sepnode);

        maybeAddImage(imagelink);
        addTitle(event);
        addDate(date, time);
        addLocation(location);
        maybeAddDescription(description);

        document.getElementById("eventDaddy").appendChild(node);
    }
}

function addLocation(location) {
    const locationnode = document.createElement("div");
    locationnode.innerText = location;
    locationnode.classList.add("location");        
    node.appendChild(locationnode);
}

function addDate(date, time) {
    const datenode = document.createElement("div");
    const datetext = time ? date + " @ " + time : date;
    datenode.innerText = datetext;
    datenode.classList.add("date");
    node.appendChild(datenode);
}


function addTitle(event) { 
    const titlenode = document.createElement("div");
    titlenode.innerText = event;
    titlenode.classList.add("title");
    node.appendChild(titlenode);
}

function maybeAddDescription(description) {
    if (description) {
        const descriptionnode = document.createElement("div");
        descriptionnode.innerText = description;
        descriptionnode.classList.add("description");        
        node.appendChild(descriptionnode);
    }
}

function maybeAddImage(imagelink) {
    // Optional image
    if (imagelink) {
        const imagenode = document.createElement("img");
        imagenode.src = imagelink;
        imagenode.classList.add("image");
        node.appendChild(imagenode);
    }
}

renderRows();
