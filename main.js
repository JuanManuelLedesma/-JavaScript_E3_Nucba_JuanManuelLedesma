
class Pizza {
    constructor (id, nombre, ingredientes, precio, img){
        this.id = id;
        this.nombre = nombre;
        this.ingredientes = ingredientes;
        this.precio = precio;
        this.img = img;
    }
}


const pizzas = [
    new Pizza (1, 'Muzzarella', ['Muzzarella ', ' Orégano', ' Aceitunas Verdes'], 400, './assets/pizzaMuzzarella.jpg'),
    new Pizza (2, 'Fugazzeta', ['Muzzrella', ' Cebolla', ' Orégano', ' Aceitunas Negras'], 600, './assets/pizzaFugazzeta.jpg'),
    new Pizza (3, 'Provolone', ['Provolone', ' Tomate', ' Aceitunas Negras'], 800, './assets/pizzaProvolone.jpg'),
    new Pizza (4, 'Mediterranea', ['Burrata', ' Albahaca', ' Aceite de oliva', ' Jamón Crudo'], 1200, './assets/pizzaMediterranea.jpg'),
    new Pizza (5, 'Jamón y Morrones', ['Muzzarella', ' Jamón', ' Morrones', ' Aceitunas Verdes'], 550, './assets/pizzaJamonMorrones.jpg'),
    new Pizza (6, 'Tremenda', ['Cheddar', ' Bacon', ' Huevo Frito', ' Papas Fritas'], 2000, './assets/pizzaHuevoFrito.jpg')
];


const form = document.getElementById ("form");
const numberInput = document.getElementById ("pizza-numero");
const pizza = document.getElementById("nombre-precio");

let pizzass = JSON.parse(localStorage.getItem('pizzass'))

const saveLocalStorage = (pizzasList) => {
    localStorage.setItem("pizzass", JSON.stringify(pizzasList));
}

const checkNumberInput = (pizzaNumero) => {
    return !isEmpty(pizzaNumero) && isNumber(pizzaNumero);
}

const isEmpty = (value) => value === "";

const isNumber = (value) =>{
    return !isNaN(+value);
}

const showError = (input, message) => {
    const formField = input.parentElement;
    formField.classList.remove ("success");
    formField.classList.add ("error");
    const error = formField.querySelector("small");
    error.textContent = message;
}

const showSuccess = (input) => {
    const formField = input.parentElement;
    formField.classList.remove ("error");
    formField.classList.add ("success");
    const error = formField.querySelector("small");
    error.textContent = "";
}

const getPizzaById = (pizzaNumero) =>{
    let resultPizza = null;
    pizzas.forEach(pizza => {
        if (pizzaNumero === pizza.id){
            resultPizza = pizza      
        }
    });
    return resultPizza;
}

const cleanForm = (input) =>{
    const formField = input.parentElement;
    formField.classList.remove ("error");
    formField.classList.remove ("success");
    const error = formField.querySelector("small");
    error.textContent = "";
}

const renderPizza = pizzaInfo => {
    const {id, nombre, ingredientes, precio} = pizzaInfo;
    return `
        <img src="${pizzaInfo.img}">
        <div class="container">
            <h2>${pizzaInfo.nombre}</h2>
            <h4>$ ${pizzaInfo.precio}</h4>
            <p>Ingredientes: ${pizzaInfo.ingredientes}</p>
        </div>
    `
}

const renderPizzas = pizzaInfos => {
    pizza.innerHTML = renderPizza(pizzaInfos);
}



form.addEventListener("submit", (e) => {
    e.preventDefault();
    cleanForm (numberInput);
    const pizzaNumero = numberInput.value.trim();
    let isNumberInputValid = checkNumberInput(pizzaNumero);
    if(!isNumberInputValid){
        showError (numberInput, 'No insertó un número válido');
        return;
      }
      const pizzaData = getPizzaById(+pizzaNumero);
      if (!pizzaData){
        showError (numberInput, 'El número no pertenece a ninguna pizza');
        return;
      } 
      showSuccess(numberInput);
      window.addEventListener('DOMContentloaded', renderPizzas(pizzaData));
      saveLocalStorage(pizzaData)
    })


const init = () => {
    renderPizzas(pizzass)
  }
init();
