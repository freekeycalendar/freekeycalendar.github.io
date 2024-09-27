
/* exported gapiLoaded */
/* exported gisLoaded */
/* exported handleAuthClick */
/* exported handleSignoutClick */
/* exported buttonClick */

// TODO(developer): Set to client ID and API key from the Developer Console
const CLIENT_ID = '<YOUR_CLIENT_ID>';
const API_KEY = 'AIzaSyBdvxbF9de3dZ8I28KcTI6p6bYqqjBnRrg';
const spreadsheetId = '1aiBHwvFfLx21bpbXbQ6edn7Zyp_JK08oEqZYNnbTiSs'
// Discovery doc URL for APIs used by the quickstart
const DISCOVERY_DOCS = [
  'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest',
  'https://sheets.googleapis.com/$discovery/rest?version=v4',
];
// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
const SCOPES = [
  'https://www.googleapis.com/auth/drive',
  'https://www.googleapis.com/auth/spreadsheets',
];
let tokenClient;
let gapiInited = false;
let gisInited = false;
// const assert = chai.assert;
mocha.setup('bdd');
/**
 * Callback after api.js is loaded.
 */
function gapiLoaded() {
  gapi.load('client', initializeGapiClient);
}
/**
 * Callback after the API client is loaded. Loads the
 * discovery doc to initialize the API.
 */
async function initializeGapiClient() {
  await gapi.client.init({
    apiKey: API_KEY,
    discoveryDocs: DISCOVERY_DOCS,
  });
  gapiInited = true;
  getRows();
}



function getRows() {
  let useTestData = false;
  let useGapi = true;
  if (useGapi) {
    try {
        gapi.client.sheets.spreadsheets.values.batchGet({
          spreadsheetId: spreadsheetId,
          ranges: ["A1:H100"],
        }).then((response) => {
          renderRows(response.result.valueRanges[0].values);
        });
      } catch (err) {
          console.log(err);
        console.log(err.message);
        return;
      }
  } else if (useTestData) {
    renderRows(RESPONSE);
    //sheety
  } else {
    let url = 'https://api.sheety.co/1e98435928ea803a2e7aa06d00608900/fkcSocialCalendar/events';
    fetch(url)
    .then((response) => response.json())
    .then(json => {
      renderRows(json.events);
    });
  }
}


function renderRows(rows) {
    //hide loader
    document.getElementById("loader").style.visibility = "hidden";
  
    let sortedRows = rows.slice(1).sort((a, b) =>  new Date(a[1]) - new Date(b[1]));
  
    for (let i = 0; i < sortedRows.length; i++) {
        let r = rows[i];
        // let event = r['event'];
        // let date = r['date (mm/dd)'];
        // let time = r['time'];
        // let location = r['location'];
        // let imagelink = r['imageLink (optional)'];
        // let description = r['description (optional)']
        // let cost = r['cost (optional)']
        // let link = r['link (optional)']
        let event = r[0];
        let date = r[1];
        let time = r[2];
        let location = r[3];
        let imagelink = r[7];
        let description = r[6]
        let cost = r[5]
        let link = r[4]

        if (!(event && date && time && location)) continue;
        if (new Date(date).setYear(2024) - Date.now() < 0) continue;

        const node = document.createElement("div");
        node.classList.add("event");

        const sepnode = document.createElement("hr");
        sepnode.classList.add("separator");
        node.appendChild(sepnode);

        maybeAddImage(node, imagelink);
        addTitle(node, event);
        addDate(node, date, time);
        addLocation(node, location);
        maybeAddCost(node, cost);
        maybeAddLink(node, link);
        maybeAddDescription(node, description);

        document.getElementById("eventDaddy").appendChild(node);
    }
}

function addLocation(node, location) {
    const locationnode = document.createElement("div");
    locationnode.innerText = location;
    locationnode.classList.add("location");        
    node.appendChild(locationnode);
}

function addDate(node, date, time) {
    const datenode = document.createElement("div");
    const datetext = time ? date + " @ " + time : date;
    datenode.innerText = datetext;
    datenode.classList.add("date");
    node.appendChild(datenode);
}


function addTitle(node, event) { 
    const titlenode = document.createElement("div");
    titlenode.innerText = event;
    titlenode.classList.add("title");
    node.appendChild(titlenode);
}

function maybeAddDescription(node, description) {
    if (description) {
        const descriptionnode = document.createElement("div");
        descriptionnode.innerText = description;
        descriptionnode.classList.add("description");        
        node.appendChild(descriptionnode);
    }
}

function maybeAddLink(node, link) {
    if (link) {
        const linknode = document.createElement("a");
        linknode.innerText = link;
        linknode.href = link
        linknode.classList.add("link");        
        node.appendChild(linknode);
    }
}


function maybeAddCost(node, cost) {
    if (cost) {
        const costnode = document.createElement("div");
        costnode.innerText = cost;
        costnode.classList.add("cost");        
        node.appendChild(costnode);
    }
}


function maybeAddImage(node, imagelink) {
    // Optional image
    if (imagelink) {
        const imagenode = document.createElement("img");
        imagenode.src = imagelink;
        imagenode.classList.add("image");
        node.appendChild(imagenode);
    }
}

// actually do the thing

// getRows();





//dont need this


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
    renderRows(json.sheet1);
  })
  .catch((err) => {
      console.log(err);
  });
}



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
