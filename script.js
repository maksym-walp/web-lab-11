function editPassword(password, messageId, minLength, maxLength) { 
    /* Параметр password задає атрибут id потрібного поля для вводу паролю, а параметр messageId – атрибут 
    id відповідного дескриптора <p>, в якому розміщатимемо текст-попередження. Параметри minLength та 
    maxLength задають відповідно мінімальну та максимальну довжини поля для вводу паролю у символах */

var password = document.getElementById(password); /* password вказує на поле для вводу паролю */
var message = document.getElementById(messageId); /* message вказує на контейнер <p></p>, куди будемо виводити текст-попередження */


if (password.value.length < minLength){ /* якщо кількість символів у полі для вводу паролю менша за minLength */
/* Формуємо текст-повідомлення про те, що символів замало. Зауважте, що тут ми користуємося властивістю innerText. 
innerText – це текст, записаний між відкриваючим та закриваючим тегами (в даному випадку, текст, записаний між тегами <p> та </p>)*/
    message.innerText = 'Пароль повинен містити не менше ' + minLength + ' символів';
    message.style.color = '#ff0000'; /* Задаємо тексту червоний колір */
}
else

if (password.value.length > maxLength){ 
    /* якщо кількість символів у полі для вводу паролю більша за maxLength, 
то формуємо відповідне повідомлення і виводимо його теж червоним шрифтом */

    message.innerText = 'Довжина паролю не повинна перевищувати ' + maxLength + ' символів';
    message.style.color = '#ff0000';
}
else{ 
    /* інакше (коли довжина поля для вводу паролю знаходиться у дозволених межах), 
    виводимо повідомлення “Ok” зеленим шрифтом */
    message.innerText = 'Ok';
    message.style.color = '#00cc00';
    return true;
}
}



function zoomMap(zoom, imageId) {
    // Отримуємо елемент зображення за ID
    var karta = document.getElementById(imageId);
    // Отримуємо всі області карти посилань
    var areas = document.querySelectorAll('map[name="map"] area');

    // Перебираємо кожну область карти посилань
    for (var i = 0; i < areas.length; i++) {
        // Отримуємо координати області та розбиваємо їх на масив
        var coords = areas[i].coords.split(',');
        // Множимо кожну координату на коефіцієнт масштабування та округлюємо
        for (var j = 0; j < coords.length; j++) {
            coords[j] = Math.round(coords[j] * zoom);
        }
        // Збираємо координати назад в рядок і записуємо в атрибут coords області
        areas[i].coords = coords.join(',');
    }

    // Масштабуємо саме зображення
    karta.width = Math.round(karta.width * zoom);
    karta.height = Math.round(karta.height * zoom);
}


// Оголошуємо масиви вулиць для кожного району
var streetsGal = ['Галицька', 'Шептицького', 'Краківська', 'Театральна', 'Вірменська'];
var streetsShev = ['Чорновола', 'Остряниці', 'Замарстинівська', 'Топольна', 'Варшавська'];
var streetsFran = ['Валова', 'Наукова', 'Княгині Ольги', 'В.Великого'];
var streetsLych = ['Личаківська', 'Пекарська', 'Нечуя-Левицького', 'Зелена'];
var streetsSykh = ['Хоткевича', 'Червоної Калини'];

// Оголошуємо масив streetsAll, де зберігаються всі вулиці за районами
var streetsAll = [null, streetsGal.sort(), streetsFran.sort(), streetsLych.sort(), streetsSykh.sort(), streetsShev.sort()];

// Функція для показу відповідних вулиць при виборі району
function showStreets(regionIndex, selectId) {
    var streetsSelect = document.getElementById(selectId);
    clearSelect(streetsSelect);

    if (regionIndex <= 0) {
        streetsSelect.style.visibility = 'hidden';
        return false;
    }

    streetsSelect.style.visibility = 'visible';

    if (regionIndex == 1) { // Якщо вибрано "Всі райони"
        for (var i = 1; i < streetsAll.length; i++) {
            for (var j = 0; j < streetsAll[i].length; j++) {
                var newStreet = new Option(streetsAll[i][j], streetsAll[i][j]);
                streetsSelect.add(newStreet);
            }
        }
    } else {
        for (var i = 0; i < streetsAll[regionIndex - 1].length; i++) {
            var newStreet = new Option(streetsAll[regionIndex - 1][i], streetsAll[regionIndex - 1][i]);
            streetsSelect.add(newStreet);
        }
    }
}

// Функція для очищення списку вулиць
function clearSelect(selectObject) {
    while (selectObject.length) {
        selectObject.remove(0);
    }
}


function getTotalPrice() {
    var sum = 0;
    var boxes = document.getElementsByName('goods');
    var selectedCount = 0;

    for (var i = 0; i < boxes.length; i++) {
        if (boxes[i].checked) {
            sum += parseInt(boxes[i].value);
            selectedCount++;
        }
    }

    document.getElementById('price').innerText = selectedCount >= 5 ? sum : 'Виберіть щонайменше 5 книг';
    document.getElementById('price').style.color = selectedCount >= 5 ? 'black' : 'red';
}

function assignFunctionToCheckboxes() {
    var boxes = document.getElementsByName('goods');

    for (var i = 0; i < boxes.length; i++) {
        boxes[i].onclick = getTotalPrice;
    }
}

window.onload = assignFunctionToCheckboxes;