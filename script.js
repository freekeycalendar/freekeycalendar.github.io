let url = 'https://api.sheety.co/1e98435928ea803a2e7aa06d00608900/fkcSocialCalendar/sheet1';
fetch(url)
.then((response) => response.json())
.then(json => {
  // Do something with the data
  console.log(json.sheet1S);
});
