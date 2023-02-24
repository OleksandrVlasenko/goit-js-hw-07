import { galleryItems } from "./gallery-items.js";
// Change code below this line
const galleryEl = document.querySelector(".gallery");

// Створення і рендер розмітки на підставі масиву даних galleryItems і наданого шаблону елемента галереї.
const markupForRendering = galleryItems
	.map(({ preview, original, description }) => {
		return `<li>
			<a class="gallery__item" href="${original}">
				<img class="gallery__image" src="${preview}" alt="${description}"/>
			</a>
		</li>`;
	})
	.join("");

galleryEl.insertAdjacentHTML("beforeend", markupForRendering);

// Прибираємо нижні падінги у img
const imgEl = document.querySelectorAll(".gallery img");

imgEl.forEach(elem => (elem.style.display = "block"));

// Створюємо галерею Simplelightbox
var lightbox = new SimpleLightbox(".gallery a", {
	captionsData: "alt",
	captionDelay: 250,
});
