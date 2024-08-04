import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export function createImages(data) {
  let gallery = new SimpleLightbox('.gallery a', {
    overlay: false,
    overlayOpacity: 0.7,
    nav: true,
    captions: true,
    captionsData: 'alt',
    captionDelay: 350,
  });
  const container = document.querySelector('.gallery');
  let images = data.hits
    .map(
      hit =>
        `<div class="gallery-list">
      <a href="${hit.largeImageURL}">
      <img class="image" src="${hit.webformatURL}" alt="${hit.tags}" />
      </a>
      <div class ="gallery-list-text">
      <div class="gallery-list-stat">
      <h5>likes</h5>
      <p>${hit.likes}</p></div>
      <div class="gallery-list-stat">
      <h5>views</h5>
      <p>${hit.views}</p></div>
      <div class="gallery-list-stat">
      <h5>comments</h5>
      <p>${hit.comments}</p></div>
      <div class="gallery-list-stat">
      <h5>downloads</h5>
      <p>${hit.downloads}</p></div></div></div>`
    )
    .join('');
  container.insertAdjacentHTML('beforeend', images);
  gallery.refresh();
}

export function clearImages() {
  const container = document.querySelector('.gallery');
  container.innerHTML = '';
}
