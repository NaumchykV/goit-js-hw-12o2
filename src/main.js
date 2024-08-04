import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import searchImages from './js/pixabay-api';
import { createImages, clearImages } from './js/render-functions';

const form = document.querySelector('.gallery-form');
const input = document.querySelector('.gallery-input');
const loader = document.querySelector('.loader');
const bmloader =document.querySelector('.load-more-loader') 
const loadMoreBtn = document.querySelector('[data-action="load-more"]');
let searchWord = '';

form.addEventListener('submit', handleSubmit);
loadMoreBtn.addEventListener('click', handleLoadMore);

const params = {
  page: 1,
  q: "",
  per_page: 15,
};

async function handleSubmit(event) {
  event.preventDefault();
  clearImages();
  
  searchWord = input.value.trim();
  params.page = 1;

  if (searchWord === '') {
    iziToast.error({
      position: 'topRight',
      message: 'Please fill the input',
    });
    loader.classList.add('hidden');
    loadMoreBtn.classList.add('is-hidden');
    form.reset()
    return;
  }
  loader.classList.remove('hiden');
try {
  const data = await searchImages(searchWord);
  if (data.total === 0) {
    iziToast.error({
      position: 'topRight',
      message: 'Sorry, there are no images matching your search query. Please try again!',
    });
    loadMoreBtn.classList.add('is-hidden');
  } else {
    createImages(data);
    loadMoreBtn.classList.remove('is-hidden');
  }
  loader.classList.add('hiden');}
 catch (error) {
  iziToast.error({
            position: 'topRight',
            message:
              'Виникла помилка під час отримання зображень. Будь ласка, спробуйте пізніше.',
          });
          loader.classList.add('hiden');

}
finally {
  form.reset();
}
}

async function handleLoadMore() {
  params.page += 1;
  
  loadMoreBtn.classList.add('is-hidden');
  bmloader.classList.remove('hiden');
  try {
  const data = await searchImages(searchWord, params.page);
  createImages(data);
  const galleryCard = document.querySelector('.gallery-list');
  const cardHeight = galleryCard.getBoundingClientRect().height;

  window.scrollBy({
    top: (cardHeight + 24) * 5,
    behavior: 'smooth'
  });

    if (params.page * params.per_page >= data.totalHits) {
    loadMoreBtn.classList.add('is-hidden');
    iziToast.info({
      position: 'topRight',
      message: "We're sorry, but you've reached the end of search results.",
    });
        }
        else {loadMoreBtn.classList.remove('is-hidden');}}
  catch (error) {
    iziToast.error({
              position: 'topRight',
              message:
                'Виникла помилка під час отримання зображень. Будь ласка, спробуйте пізніше.',
            });
            bmloader.classList.add('hiden');
  
  }
  finally {
  bmloader.classList.add('hiden')
}}