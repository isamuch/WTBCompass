// ------------------------------------------
// Main Function
// ------------------------------------------

function onPageLoad() {
  getDivineValue();
  getCompassList();
}

function updateMsg() {
  const cName = document.getElementById('cNames').value;
  const ign = document.getElementById('ign').value;
  const price = document.getElementById('price').value;
  const amout = document.getElementById('amout').value;

  if (!isEmpty(cName) && !isEmpty(ign) && !isEmpty(price) && !isEmpty(amout)) {
    const priceObj = calPrice();
    const msg = `@${ign} WTB ${amout}x ${cName} = ${priceObj.divine} div ${priceObj.chaos} c`;
    document.getElementById('msg').value = msg;
  }
}

function saveCompassName() {
  const cName = document.getElementById('cNames').value;
  localStorage.setItem('cName', cName);
}

function getCompassName() {
  const cName = localStorage.getItem('cName');
  if (!isEmpty(cName)) {
    document.getElementById('cNames').value = cName;
  }
}

function calPrice() {
  const dValue = document.getElementById('dValue').value;
  const price = document.getElementById('price').value;
  const amout = document.getElementById('amout').value;
  const netPrice = price * amout;

  const dPrice = parseInt(netPrice / dValue);
  const cPrice = netPrice - dPrice * dValue;

  return {
    divine: dPrice,
    chaos: cPrice,
  };
}

function copyMsg() {
  const msg = document.getElementById('msg').value;
  if (!isEmpty(msg)) {
    navigator.clipboard.writeText(msg);

    navigator.clipboard.writeText(msg).then(() => {
      alert('Copied the text: ' + msg);
    });
  }
}

// --------------------------------
// Reuse Function
// --------------------------------

function isEmpty(x) {
  return x === undefined || x === null || x.length === 0;
}

// --------------------------------
// API
// --------------------------------

function getCompassList() {
  fetch(
    'https://raw.githubusercontent.com/The-Forbidden-Trove/tft-data-prices/master/lsc/bulk-compasses.json'
  )
    .then((response) => response.json())
    .then((data) => {
      const cNames = [];
      for (const obj of data.data) {
        cNames.push(obj.name);
      }
      cNames.sort();

      const x = document.getElementById('cNames');
      for (const cName of cNames) {
        const option = document.createElement('option');
        option.text = cName;
        x.add(option);
      }

      getCompassName();
    });
}

function getDivineValue() {
  fetch('https://api.poe.watch/get?category=currency&league=Sanctum')
    .then((response) => response.json())
    .then((data) => {
      document.getElementById('dValue').value = parseInt(data[16].mean);
    });
}
