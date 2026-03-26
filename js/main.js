document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute("href"))
            .scrollIntoView({behavior: "smooth"});
    });
});

// Simple lightbox
document.querySelectorAll('.gallery-grid img').forEach(img => {
    img.addEventListener('click', () => {
        const overlay = document.createElement('div');
        overlay.style.position = 'fixed';
        overlay.style.top = 0;
        overlay.style.left = 0;
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.background = 'rgba(0,0,0,0.8)';
        overlay.style.display = 'flex';
        overlay.style.alignItems = 'center';
        overlay.style.justifyContent = 'center';
        overlay.style.cursor = 'pointer';
        overlay.innerHTML = `<img src="${img.src}" style="max-width:90%; max-height:90%; border-radius:8px;">`;
        document.body.appendChild(overlay);
        overlay.addEventListener('click', () => overlay.remove());
    });
});

const chatToggleBtn = document.getElementById("chat-toggle-btn");
const chatWidget = document.getElementById("chat-widget");
const chatCloseBtn = document.getElementById("chat-close");
const chatMessages = document.getElementById("chat-messages");
const chatInput = document.getElementById("chat-input");
const chatSend = document.getElementById("chat-send");
const quickButtons = document.querySelectorAll(".quick-btn");

function addMessage(text, sender) {
    const wrapper = document.createElement("div");
    wrapper.className = "chat-message " + sender;

    const bubble = document.createElement("div");
    bubble.className = "chat-bubble";
    bubble.textContent = text;

    wrapper.appendChild(bubble);
    chatMessages.appendChild(wrapper);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function getBotReply(message) {
    const msg = message.toLowerCase().trim();

    // Записване
    if (
        msg.includes("запиша") ||
        msg.includes("записване") ||
        msg.includes("час") ||
        msg.includes("преглед")
    ) {
        return "Можете да запишете час по телефон на +359 889 392 661. Кабинетът работи от понеделник до петък: 09:00–12:00 и 14:30–18:30.";
    }

    // Телефон / контакт
    if (
        msg.includes("телефон") ||
        msg.includes("номер") ||
        msg.includes("обадя") ||
        msg.includes("контакт")
    ) {
        return "Можете да се свържете с кабинета на телефон +359 889 392 661.";
    }

    // Адрес / локация
    if (
        msg.includes("адрес") ||
        msg.includes("къде") ||
        msg.includes("намира") ||
        msg.includes("локация") ||
        msg.includes("младост")
    ) {
        return "Кабинетът се намира в ж.к. Младост 1, бл. 38, 1415 София, България. На сайта има и карта за по-лесно намиране.";
    }

    // НЗОК
    if (
        msg.includes("нзок") ||
        msg.includes("здравна каса") ||
        msg.includes("каса")
    ) {
        return "Да, кабинетът работи с НЗОК. За конкретна процедура е най-добре да се обадите предварително, за да уточните какво точно се покрива.";
    }

    // Работно време
    if (
        msg.includes("работно време") ||
        msg.includes("работното време") ||
        msg.includes("работите") ||
        msg.includes("отворено") ||
        msg.includes("кога")
    ) {
        return "Работното време е от понеделник до петък: 09:00–12:00 и 14:30–18:30.";
    }

    // Услуги - общо
    if (
        msg.includes("услуги") ||
        msg.includes("предлагате") ||
        msg.includes("какво правите") ||
        msg.includes("какво лекувате")
    ) {
        return "Предлагаме прегледи и диагностика, пломби, ендодонтско лечение, екстракции, профилактика, протетика, протези и ортодонтия.";
    }

    // Пломби / кариес
    if (
        msg.includes("пломба") ||
        msg.includes("пломби") ||
        msg.includes("кариес") ||
        msg.includes("обтурация")
    ) {
        return "Да, предлагаме фотополимерни пломби. Ориентировъчните цени са: 45€ за 1 повърхност, 50€ за 2 повърхности и 55€ за 3 повърхности.";
    }

    // Кореново лечение
    if (
        msg.includes("кореново") ||
        msg.includes("канал") ||
        msg.includes("ендодонт") ||
        msg.includes("нерв")
    ) {
        return "Да, предлагаме ендодонтско лечение. В ценоразписа са посочени девитализация, обработка на коренов канал, запълване на канал и поставяне на коренов щифт.";
    }

    // Вадене на зъб
    if (
        msg.includes("вадене") ||
        msg.includes("вадите") ||
        msg.includes("екстракц") ||
        msg.includes("мъдрец")
    ) {
        return "Да, извършват се екстракции. Ориентировъчната цена за екстракция на зъб с анестезия е 45€, а за временен зъб – 18€.";
    }

    // Почистване / зъбен камък / AirFlow
    if (
        msg.includes("почистване") ||
        msg.includes("зъбен камък") ||
        msg.includes("airflow") ||
        msg.includes("полиране") ||
        msg.includes("профилактика")
    ) {
        return "Да, предлагаме профилактика. Почистването на зъбен камък с ултразвук е 38€, а AirFlow е 28€.";
    }

    // Корони / протетика
    if (
        msg.includes("корона") ||
        msg.includes("корони") ||
        msg.includes("цирконий") ||
        msg.includes("металокерами") ||
        msg.includes("протетика")
    ) {
        return "Да, предлагаме протетика. Има бленд-керамични, метало-керамични и циркониеви корони, както и временни корони, сваляне и циментиране.";
    }

    // Протези
    if (
        msg.includes("протеза") ||
        msg.includes("протези")
    ) {
        return "Да, предлагаме частични и цели протези. На сайта са посочени плакова протеза, мека протеза за една челюст и Кемени-микропротеза.";
    }

    // Брекети / алайнери / ортодонтия
    if (
        msg.includes("брекети") ||
        msg.includes("алайнери") ||
        msg.includes("ортодонт") ||
        msg.includes("захапка")
    ) {
        return "Да, предлагаме ортодонтия – брекети, алайнери и снемаем ортодонтски апарат. Посочените ориентировъчни цени за брекети и алайнери са 2000€.";
    }

    // Цени - общо
    if (
        msg.includes("цена") ||
        msg.includes("цени") ||
        msg.includes("струва") ||
        msg.includes("колко струва")
    ) {
        return "Цените зависят от процедурата. Например: преглед – 15€, почистване на зъбен камък – 38€, пломба – от 45€, екстракция с анестезия – 45€. Всички цени са ориентировъчни и се уточняват след преглед.";
    }

    // Болка / спешност
    if (
        msg.includes("болка") ||
        msg.includes("боли") ||
        msg.includes("подуване") ||
        msg.includes("оток") ||
        msg.includes("спешно")
    ) {
        return "При силна болка, оток или възпаление е добре да се свържете с кабинета възможно най-скоро на +359 889 392 661, за да получите насоки и час.";
    }

    // Деца
    if (
        msg.includes("деца") ||
        msg.includes("дете") ||
        msg.includes("детски")
    ) {
        return "За лечение на деца е добре да се свържете предварително с кабинета по телефона, за да получите насоки и подходящ час.";
    }

    // Отзиви / доверие
    if (
        msg.includes("отзиви") ||
        msg.includes("мнения") ||
        msg.includes("ревюта") ||
        msg.includes("google")
    ) {
        return "На сайта има секция с отзиви от Google и бутон „Виж всички отзиви в Google“, където можете да разгледате мненията на пациенти.";
    }

    return "Благодарим за съобщението. Можем да помогнем с информация за услуги, цени, НЗОК, адрес, работно време и записване на час. За директна връзка: +359 889 392 661.";
}

function sendMessage(customText) {
    const text = customText || chatInput.value.trim();
    if (!text) return;

    addMessage(text, "user");
    chatInput.value = "";

    setTimeout(() => {
        const reply = getBotReply(text);
        addMessage(reply, "bot");
    }, 400);
}

chatToggleBtn.addEventListener("click", () => {
    chatWidget.style.display = "flex";
    chatToggleBtn.style.display = "none";

    if (!chatMessages.dataset.started) {
        addMessage("Здравейте! 👋 С какво можем да помогнем?\nМожете да попитате за НЗОК, услуги, цени, адрес, работно време или записване на час.", "bot");
        chatMessages.dataset.started = "true";
    }
});

chatCloseBtn.addEventListener("click", () => {
    chatWidget.style.display = "none";
    chatToggleBtn.style.display = "block";
});

chatSend.addEventListener("click", () => sendMessage());

chatInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        sendMessage();
    }
});

quickButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        sendMessage(btn.dataset.question);
    });
});
