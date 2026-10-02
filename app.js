const tabs=[...document.querySelectorAll(".tab")];
const views=[...document.querySelectorAll(".view")];
const modal=document.getElementById("modal");
const input=document.getElementById("modalInput");
const title=document.getElementById("modalTitle");
let currentAction=null;

function openView(id){
  tabs.forEach(t=>t.classList.toggle("active",t.dataset.view===id));
  views.forEach(v=>v.classList.toggle("active",v.id===id));
  document.querySelector(".content").scrollTop=0;
}
tabs.forEach(tab=>tab.addEventListener("click",()=>openView(tab.dataset.view)));

function showModal(modalTitle,placeholder,action){
  title.textContent=modalTitle;
  input.placeholder=placeholder;
  input.value="";
  currentAction=action;
  modal.classList.add("show");
  setTimeout(()=>input.focus(),50);
}
function closeModal(){modal.classList.remove("show");currentAction=null}

document.getElementById("cancel").addEventListener("click",closeModal);
document.getElementById("save").addEventListener("click",()=>{
  const value=input.value.trim();
  if(value && currentAction) currentAction(value);
  closeModal();
});
modal.addEventListener("click",e=>{if(e.target===modal)closeModal()});

document.getElementById("addActivity").addEventListener("click",()=>{
  showModal("Add Activity","Activity name",value=>{
    const card=document.createElement("div");
    card.className="card";
    card.innerHTML=`<b>${escapeHtml(value)}</b><div class="sub">Added to your Osaka itinerary</div>`;
    document.getElementById("extraActivities").appendChild(card);
  });
});

document.getElementById("addNote").addEventListener("click",()=>{
  showModal("Add Note","Note text",value=>{
    const note=document.createElement("div");
    note.className="note";
    note.innerHTML=`<b>${escapeHtml(value)}</b>`;
    document.getElementById("notesList").appendChild(note);
  });
});

document.getElementById("addExpense").addEventListener("click",()=>{
  showModal("Add Expense","Example: 5000 - Shopping",value=>{
    const parts=value.split("-");
    const amount=parts.shift().trim();
    const category=parts.join("-").trim()||"Other";
    const row=document.createElement("div");
    row.className="money";
    row.innerHTML=`<strong>${escapeHtml(amount)}</strong><span>${escapeHtml(category)}</span>`;
    document.getElementById("expenseList").appendChild(row);
  });
});

document.getElementById("hotelDetails").addEventListener("click",()=>{
  alert("The Ritz-Carlton, Osaka\nCheck-in: 3 PM\nStay: Oct 2 - Oct 4");
});

function escapeHtml(value){
  return value.replace(/[&<>"']/g,char=>({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"
  }[char]));
}