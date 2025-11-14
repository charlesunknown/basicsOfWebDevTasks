
// index.js



function showOfferDialog(hisName, stats, img) {
    let cdialog = document.createElement("dialog");
    const Name_dialog = document.createElement("h1");
    Name_dialog.innerHTML = hisName;

    const text_div = document.createElement("div");

    const Stats_dialog = document.createElement("h2");
    text_div.id ="dialog_text"
    Stats_dialog.innerHTML = stats;

    cdialog.appendChild(Name_dialog);

    text_div.appendChild(Stats_dialog);

    cdialog.appendChild(text_div);

    const img_div = document.createElement("div");
    const div_img= document.createElement("img");
    div_img.src=img;
    img_div.id="dialog_img";
    
    img_div.appendChild(div_img);

    cdialog.appendChild(img_div);

    const button_close = document.createElement("button");
    button_close.onclick = () => {cdialog.close(); cdialog.remove()};
    button_close.id ="close";
    button_close.innerHTML="&#10006"; 
    cdialog.appendChild(button_close);

    const section_dialog=document.querySelector(".showcase-products");

    section_dialog.appendChild(cdialog);

    cdialog.showModal();
}


