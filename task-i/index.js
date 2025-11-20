
// index.js



function showOfferDialog(hisName, stats, img) {
    let cdialog = document.createElement("dialog");
    const title_div = document.createElement("div");

    title_div.id= "title_div";
    const Name_dialog = document.createElement("h1");
    Name_dialog.id= "dialog_title";
    Name_dialog.innerHTML = hisName;

    const button_close = document.createElement("button");
    button_close.onclick = () => {cdialog.close(); cdialog.remove()};
    button_close.id ="close";
    button_close.innerHTML="&#10006"; 
    title_div.appendChild(button_close);

    title_div.appendChild(Name_dialog);
    cdialog.appendChild(title_div);
    const img_div = document.createElement("div");
    const div_img= document.createElement("img");
    div_img.src=img;
    img_div.id="dialog_img";
    
    img_div.appendChild(div_img);

    cdialog.appendChild(img_div);

    const text_div = document.createElement("div");

    const Stats_dialog = document.createElement("h1");
    text_div.id ="dialog_text"
    Stats_dialog.innerHTML = stats;


    text_div.appendChild(Stats_dialog);

    cdialog.appendChild(text_div);
    
    const price_div = document.createElement("div");
    


    const section_dialog=document.querySelector(".showcase-products");

    section_dialog.appendChild(cdialog);

    cdialog.showModal();
}


