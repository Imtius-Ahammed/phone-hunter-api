const loadPhones = async(inputFieldValue,datalimit) =>{
  const url =`https://openapi.programming-hero.com/api/phones?search=${inputFieldValue}`
  const res = await fetch(url);
  const data = await res.json();
  displayPhones(data.data,datalimit);
}
const displayPhones = (phones, datalimit) => {
  const phonesContainer = document.getElementById('phone-container')
  phonesContainer.innerHTML=``;


  const showALL = document.getElementById('show-all');
  if(datalimit && phones.length>10){
    phones = phones.slice(0,10);
    showALL.classList.remove('d-none');

  }
  else{
    showALL.classList.add('d-none');
  }
  
  const noPhone =document.getElementById('alert');
  if(phones.length===0){
    noPhone.classList.remove('d-none');

  }
  else{
    noPhone.classList.add('d-none');
  }

  phones.forEach(phone=>{
    console.log(phone)
    const divCol = document.createElement('div')
    divCol.innerHTML=`
    <div class="card p-4">
      <img src="${phone.image}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${phone.phone_name}</h5>
        <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
        <button onclick="loadPhoneDetails('${phone.slug}')" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailModal">Show Details</button>

        
      </div>
    `;
    phonesContainer.appendChild(divCol);
  })
  tooggleSpinner(false);

}
const processData = (datalimit)=>{
  tooggleSpinner(true);
  const inputField = document.getElementById('searchinput-field');
  const inputFieldValue = inputField.value;
  loadPhones(inputFieldValue, datalimit);
}

document.getElementById('btn-search').addEventListener('click',function(){
  processData(10);


})

document.getElementById('searchinput-field').addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    processData(10);
  }
});

const tooggleSpinner = isLoading=>{
  const loaderSection = document.getElementById('spinner');
  if(isLoading){
    loaderSection.classList.remove('d-none');
  }
  else{
    loaderSection.classList.add('d-none');
  }

}
document.getElementById('btn-show-all').addEventListener('click',function(){
  processData();

})

const loadPhoneDetails =async id =>{
  const url = `https://openapi.programming-hero.com/api/phone/${id}`
  const res = await fetch(url);
  const data = await res.json();
  displayPhoneDetails(data.data);
}
const displayPhoneDetails = phone => {
  console.log(phone);
  const modalTitle = document.getElementById('phoneDetailModalLabel');
  modalTitle.innerText = phone.name;
  const modalBody = document.getElementById('body');
  modalBody.innerHTML= `
  <p>Release Date: ${phone.releaseDate ? phone.releaseDate : 'No release date Found'} </p>
  <p>Others : ${phone.Others ? phone.Others.Bluetooth : 'No Bluetooth' }</p>
  
  `;
}



loadPhones('apple');