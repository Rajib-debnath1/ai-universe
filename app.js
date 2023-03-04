const loadUniverse = () =>{
    fetch('https://openapi.programming-hero.com/api/ai/tools')
    .then(res => res.json())
    .then(data =>displayUniverse(data.data.tools.slice(0,6),data.data.tools))
}






const displayUniverse = (universes,universes2) =>{
    const aiContainer = document.getElementById('ai-container');

    // show all added

    // const showAll = document.getElementById('show-all')
    // if( universes.length > 6){
    //   // universes = universes.slice(0, 6)
    //     showAll.classList.remove('d-none');
    // }
    // else{
    //     showAll.classList.add('d-none');
    // }
const processSearch = () =>{
  
  console.log(universes,universes2)
  const showAll = document.getElementById('show-all')
  showAll.classList.add('d-none');
  return universes=universes2 ;
}
document.getElementById('btn-show-all').addEventListener('click',function(){
  processSearch();
  })
console.log(universes)
    universes.forEach(universe => {
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML= `
        <div class="card">
        <img src="${universe.image}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">Features</h5>
          ${
            universe.features.map((item,i) =>`<p class="card-text">${i+1} ${item}</p>`)
          }
          
          <h5>${universe.name}</5>
          <section class="d-flex justify-content-between">
          <p style="font-size:15px; margin-top: 10px;"><i class="fa-duotone fa-calendar-days"></i>${universe.published_in
          }</p>
          <button onclick="modalFunction('${universe.id}','${universe.image}')" type="button" class="border-0 text-danger" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
            →
        </button>

          </section>
        </div>
      </div>
        `;
        aiContainer.appendChild(phoneDiv);
    });
  //  console.log(universes)
}
// document.getElementById("")

const modalFunction = (id,img)=>{

  // console.log(id,"form modal")
  fetch(`https://openapi.programming-hero.com/api/ai/tool/${id}`)
    .then(res => res.json())
    .then(data =>diplayModalData(data.data))

  const diplayModalData = modalData =>{
   console.log(modalData.logo,"modalll")
  const modalBody = document.getElementById("modalBody")

modalBody.innerHTML=`
<div class="row row-cols-2 p-2">
<section class="col border border-info rounded-3">
    <p>
       ${modalData.
        description
        }
    </p>
    <div class="row row-cols-3 px-3">
       
        ${
          modalData.pricing.map(singlePrice=> `<div class="cols px-4 py-3 text-primary bg-light">
          <span>${singlePrice.price}</span>
          <span>${singlePrice.plan}</span>
      </div>`)
        }
       

    </div>
    <div class="d-block d-md-block d-lg-flex g-5 ">
        <aside class="px-3">
            <h3>Features </h3>
            <ul>
                <li class=""${Object.keys(modalData.features).map(li=>`<li class="">${li} </li>`)}
            </ul>
        </aside>
        <aside class="px-3">
            <h3>Integrations </h3>
            <ul>
                <li class=""${modalData.integrations.map(li=>`<li class="">${li}? </li>`)}
            </ul>
        </aside>

    </div>
</section>
<section class="col text-center">
  <div class="position-relative">
  <h6 classs="position-absolute top-0 end-0 bg-danger">
  ${modalData.accuracy.score? modalData.accuracy.score : 'data not found' }
  </h6>
  <img class="img-fluid " src="${img}" alt="">
  </div>
     
<aside class="">
    <h4> ${modalData.input_output_examples[0].input}</h4>
    <p>${modalData.accuracy.description}</p>
</aside>
</section>
</div>`
    }
}



loadUniverse()


