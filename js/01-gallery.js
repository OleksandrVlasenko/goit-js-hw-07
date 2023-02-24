import { galleryItems } from "./gallery-items.js";
// Change code below this line

const galleryEl = document.querySelector(".gallery");

// Створення і рендер розмітки на підставі масиву даних galleryItems і наданого шаблону елемента галереї.
const markupForRendering = galleryItems
	.map(({ preview, original, description }) => {
		return `<div class="gallery__item">
				<a class="gallery__link" href="${original}">
					<img
						class="gallery__image"
						src="${preview}"
						data-source="${original}"
						alt="${description}"
					/>
				</a>
			</div>`;
	})
	.join("");

galleryEl.insertAdjacentHTML("beforeend", markupForRendering);

// Динамічно вираховуємо ширину полоси прокрутки
document.body.style.paddingRight = `calc(${
	window.innerWidth - window.visualViewport.width
}px - (100vw - 100%))`;

// Реалізація делегування на div.gallery і отримання url великого зображення.
galleryEl.addEventListener("click", onOpenModal);

function onOpenModal(event) {
	event.preventDefault();
	if (event.target.nodeName !== "IMG") {
		return;
	}

	// Створення модального вікна
	const {
		dataset: { source },
		alt,
	} = event.target;

	const modal = basicLightbox.create(
		`<img class="gallery__image" src="${source}" alt="${alt}">`,
	);
	modal.show();

	// Заборона прокручування сторінки
	bodyScrollLock.disableBodyScroll(document.body);

	// Закриття модалки і розблокування скролу сторінки по кліку
	modal.element().addEventListener("click", onCloseModalByClick);

	function onCloseModalByClick() {
		modal.close(() => bodyScrollLock.enableBodyScroll(document.body));
		modal.element().removeEventListener("click", onCloseModalByClick);
		document.removeEventListener("keyup", onCloseModal);
	}

	// Закриття модального вікна і розблокування скролу сторінки по клавіші Escape
	document.addEventListener("keyup", onCloseModal);

	function onCloseModal(event) {
		if (event.code === "Escape") {
			modal.close(() => bodyScrollLock.enableBodyScroll(document.body));
			modal.element().removeEventListener("click", onCloseModalByClick);
			document.removeEventListener("keyup", onCloseModal);
		}
	}
}
