// veriler
let content;
// kullanıcının sepeti
const userCard = []
// navı aç
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";

    return loadCard();
  }
  

//   navı kapat
  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft= "0";
    document.body.style.backgroundColor = "white";
  }




  // sayfa hazır olduğunda
  window.onload = async function() {

    // kod 23. satırda durması gerek. 23. satır ne zaman hazır olursa
    // kod tekrar çalışmaya devam etmeli.
    const data = await fetch('product.json')
    content = await data.json()
    console.log("gelen veriler:", content)

    const parentDiv = document.querySelector('.flex-container')
    // verileri mapla
    content.map(data => {

     const div = document.createElement('div');
     // dive class ekle
     div.classList.add("flex-item");
     const h1 = document.createElement('h1');
     const img = document.createElement('img');

     h1.innerText = data.name
     img.src = data.icon
     img.alt = data.name

     // button ekle
     const button = document.createElement('button');
     // butonu stillendir
     button.innerText = "Sepete Ekle"
     button.setAttribute('onclick', `addToCard(${data.id})`)
     button.style.padding = "8px";
     button.style.cursor = "pointer";

     const buttonunParenti = document.createElement('div')
     buttonunParenti.style.textAlign = "end";
     buttonunParenti.appendChild(button)



     div.appendChild(h1)
     div.appendChild(img)
     div.appendChild(buttonunParenti)
     // divi parente gönder
     parentDiv.appendChild(div)

    })
  }



  // sepete ekle
  const addToCard = (id) => {

    // orijinal veriyi ara

    const karttaMi = userCard.find(data => data.id == id)

    // karttaysa
    if(karttaMi) {

    karttaMi.count += 1

   // kartta değilse
   } else {

    const item = content.find(data => data.id == id) // obje halini döndürür
    item.count = 1;
    // usercarda pushla
    userCard.push(item)


   }


   console.log("user sepeti:", userCard)
  }



  // sepeti yükle
  const loadCard = () => {

    console.log("TETİK")

    const ul = document.querySelector('#product-list')
    ul.innerHTML = "";

    userCard.map(data => {

        const li = document.createElement('li')
        const div = document.createElement('div')
        div.classList.add('shop-item')
        const img = document.createElement('img')

        img.src = data.icon;
        img.alt = data.name;

        const h1 = document.createElement('h1')
        h1.innerText = data.name

        const optionsDiv = document.createElement('div')
        optionsDiv.classList.add('optionsDiv')

        const remove = document.createElement('span')
        remove.innerText = "-"
        remove.classList.add('removeItem')

        const add = document.createElement('span')
        add.classList.add('addItem')
        add.innerText = "+"

        optionsDiv.appendChild(add)
        optionsDiv.appendChild(remove)

        div.appendChild(h1)
        div.appendChild(img)
        div.appendChild(optionsDiv)

        li.appendChild(div)
        ul.appendChild(li)
    })



  }