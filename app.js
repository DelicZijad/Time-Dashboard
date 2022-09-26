'use strict';
//getting the json data
const getData=async()=>{
    const response=await fetch('data.json');
    const data=await response.json();
    return data
}
//pointer->points to the mode(daily,weekly,monthly)
//Initialy udefined
let pointer;
//starting index of the modes array(ie 0)
let index=0;

const modes=[...document.getElementsByClassName('profile--mode')]
const cards=[...document.getElementsByClassName('card')]
/*
our starting mode will be daily(so index=0)
modes[0] will have classlist active->color white
pointer=modes[0].textContent=daily
*/
load()
/*
all the amounts of hours (current and previous in the card elements will be determined bt the pointer)
Initial pointer is daily,so we get the amounts by using the pointer on the retrieved json data,according to the execute function.
*/
execute()

modes.forEach((mode,i)=>{
    mode.addEventListener('click',function(e){
        modes.forEach(mode=>mode.classList.remove('active'))
        mode.classList.add('active')
        index=i;
        /*
clicking on any mode button will change the index and therefore change the pointer(eg.from daily to weekly),and that will lead to change of content on the card elements according to the pointer once we call the execute function
         */
        load()
        execute()
    })
})

async function execute(){
    const data=await getData();
    
    cards.forEach((card,i)=>{
const amount=card.querySelector('.amount')
amount.textContent=data[i].timeframes[pointer].current
const prevAmount=card.querySelector('.prevAmount')
prevAmount.textContent=data[i].timeframes[pointer].previous
const change=card.querySelector('.card--change')
if(pointer==='daily')change.textContent='Yesterday'
if(pointer==='weekly')change.textContent='Last Week'
if(pointer==='monthly')change.textContent='Last Month'
})
}
function load(){
modes[index].classList.add('active')
pointer=modes[index].textContent
}