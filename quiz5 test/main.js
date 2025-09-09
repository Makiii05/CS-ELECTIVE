let grand_total_con = document.querySelector("#grand_total");
let checkout_btn = document.querySelector("#checkout");
const modal = document.getElementById("myModal");
const closeBtn = document.querySelector(".close");
const completeCheckoutBtn = document.querySelector("#complete-checkout");
let modalItems = document.getElementById("modal-items");
let modalTotal = document.getElementById("modal-total");
let change = document.getElementById("change-display");
let tendered = document.getElementById("tendered-display");
let sum = 0;

for(let i = 1; i < 4; i++) {
    let price = document.querySelector("#price"+i);
    let input = document.querySelector("#input"+i);
    let plus = document.querySelector("#plus"+i);
    let minus = document.querySelector("#minus"+i);
    let total = document.querySelector("#total"+i);

    plus.onclick = function(){
        input.value++;
        total.innerHTML = calculate_total(input.value, price.innerHTML);
        update_grand_total();
    }
    minus.onclick = function () {
        if (input.value > 0) {
            input.value--;
            total.innerHTML = calculate_total(input.value, price.innerHTML);
            update_grand_total();
        }
    }
    input.onchange = function () {
        if(input.value < 0){
            input.value = 0;
        }
        total.innerHTML = calculate_total(input.value, price.innerHTML);
        update_grand_total();
    }
}

function calculate_total(quan, price) {
    return "₱" + (parseFloat(quan) * parseFloat(price)).toFixed(2);
}

function update_grand_total() {
    sum = 0;
    for (let i = 1; i < 4; i++) {
        let price = document.querySelector("#price" + i);
        let input = document.querySelector("#input" + i);
        sum += parseFloat(price.innerHTML) * parseFloat(input.value);
    }
    grand_total_con.innerHTML = "Grand Total: ₱ " + sum.toFixed(2);
}

checkout_btn.onclick = function() {
    sum = 0;
    modalItems.innerHTML = "";

    for (let i = 1; i < 4; i++) {
        let input = document.querySelector("#input" + i);
        let price = document.querySelector("#price" + i).innerHTML;
        let itemName = document.querySelectorAll(".item-name")[i - 1].textContent;
        let imgSrc = document.querySelectorAll(".card-img img")[i - 1].src;

        if (parseInt(input.value) > 0) {
            let itemTotal = parseFloat(price) * parseInt(input.value);
            sum += itemTotal;

            let itemDiv = document.createElement("div");
            itemDiv.classList.add("modal-item");
            itemDiv.innerHTML = `
                <img src="${imgSrc}" class="modal-img">
                <div class="modal-item-details">
                    <div>${itemName}</div>
                    <div>Floor Price: ₱${parseFloat(price).toFixed(2)}</div>
                    <div>Qty: ${input.value}</div>
                    <div>Total: ₱${itemTotal.toFixed(2)}</div>
                </div>
            `;
            modalItems.appendChild(itemDiv);
        }
    }

    modalTotal.innerText = "Grand Total: ₱" + sum.toFixed(2);

    let tenderedAmount;
    do {
        tenderedAmount = parseFloat(prompt("Tendered amount: "));
        if (isNaN(tenderedAmount)) {
            alert("Please enter a valid number.");
        } else if (tenderedAmount < sum) {
            alert("Insufficient amount. Please enter an amount greater than or equal to the total.");
        }
    } while (isNaN(tenderedAmount) || tenderedAmount < sum);

    let changeValue = tenderedAmount - sum;
    change.innerText = "Change: ₱" + changeValue.toFixed(2);
    tendered.innerText = "Tendered: ₱" + tenderedAmount.toFixed(2);

    modal.style.display = "block";
    setTimeout(() => modal.classList.add("show"), 10);
};

closeBtn.onclick = function() {
    modal.classList.remove("show");
    setTimeout(() => modal.style.display = "none", 400);
}

completeCheckoutBtn.onclick = function() {
    modal.classList.remove("show");
    setTimeout(() => modal.style.display = "none", 400);

    for (let i = 1; i < 4; i++) {
        let input = document.querySelector("#input" + i);
        let total = document.querySelector("#total" + i);
        input.value = 0;
        total.innerHTML = "₱0.00";
    }

    grand_total_con.innerHTML = "Grand Total: ₱ 0.00";

    modalItems.innerHTML = "";
    modalTotal.innerText = "Grand Total: ₱0.00";
    tendered.innerText = "Tendered: ₱0.00";
    change.innerText = "Change: ₱0.00";
}
