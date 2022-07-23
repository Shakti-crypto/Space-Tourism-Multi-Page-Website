const nav=document.getElementById("primary-navigation")
const navButton=document.querySelector(".mobile-nav-toggle")
ResizeImageInTechnology;

function ResizeImageInTechnology(){
    // Setting the image in technology tab for desktop window
    const technologyPage=document.querySelector(".technology")
    const desktopPageMinSize=45; //in em
    if(technologyPage!=null){
        const mainContainer=technologyPage.querySelector("#main");
        const image=mainContainer.querySelector("img:not([hidden])");
        if((window.innerWidth/parseFloat(window.getComputedStyle(document.body).getPropertyValue('font-size')))>desktopPageMinSize){
            SetPortraitImage(image);
        }
        else{
            SetLandscapeImage(image);
        }
    }
}

window.addEventListener("resize",ResizeImageInTechnology)

navButton.addEventListener("click",()=>{
    const navState=nav.getAttribute("data-visible")
    if(navState === "false"){
        nav.setAttribute("data-visible",true)
        navButton.setAttribute("aria-expanded",true)
    }
    else{
        nav.setAttribute("data-visible",false)
        navButton.setAttribute("aria-expanded",false)
    }
})

const tabsList=document.querySelector('[role="tablist"]');
const tabs=tabsList.querySelectorAll('[role="tab"]');
let tabFocus=0;
tabsList.addEventListener('keydown', (e)  =>{
    const keyCodeLeft=37;
    const keyCodeRight=39;
    if(e.keyCode===keyCodeLeft || e.keyCode===keyCodeRight){
        tabs[tabFocus].setAttribute("tabindex",-1);
    }
    if(e.keyCode===keyCodeLeft){
        tabFocus--;
        if(tabFocus < 0){
            tabFocus=tabs.length-1;
        }
    }
    if(e.keyCode===keyCodeRight){
        tabFocus++;
        if(tabFocus>=tabs.length){
            tabFocus=0;
        }
    }
    tabs[tabFocus].setAttribute("tabindex",0);
    tabs[tabFocus].focus()
})

tabs.forEach(tab => {
    tab.addEventListener("click",ChangeTabPanel);
});

function ChangeTabPanel(e){
    const SelectedTab=e.target;
    const SelectedTabPanel=SelectedTab.getAttribute("aria-controls");
    const targetImage=SelectedTab.getAttribute("data-image");

    
    const tabsContainer=SelectedTab.parentNode;
    const mainContainer=tabsContainer.parentNode;
    
    tabsContainer.querySelector("[aria-selected='true']").setAttribute("aria-selected",false);
    SelectedTab.setAttribute("aria-selected",true);

    HideContent(mainContainer,"[role='tabpanel']");
    ShowContent(mainContainer,`#${SelectedTabPanel}`);
    
    HideContent(mainContainer,"img");
    ShowContent(mainContainer,`#${targetImage}`);
    ResizeImageInTechnology();

    
}

function HideContent(parent,content){
    parent.querySelectorAll(content).
    forEach((item)=>item.setAttribute("hidden",true));
}
function ShowContent(parent,content){
    parent.querySelector(content).removeAttribute("hidden");
}



function SetPortraitImage(image){
    image.src=`assets/technology/${image.id}-portrait.jpg`
}
function SetLandscapeImage(image){
    image.src=`assets/technology/${image.id}-landscape.jpg`
}

