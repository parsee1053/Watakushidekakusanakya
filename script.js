function getId() {
  let id = 0;
  while (true) {
    if (!document.getElementById(`mito-wrapper-id-${id}`)) {
      break;
    }
    id++;
  }
  return id;
}

function mito() {
  const imgURL = chrome.extension.getURL("mito.png");
  // imgタグ対応
  const imgList = document.querySelectorAll('img');
  for (let i = 0; i < imgList.length; i++) {
    if (!imgList[i].classList.contains('mito-background') && !imgList[i].classList.contains('mito-image')) {
      imgList[i].classList.add('mito-background');
      const id = getId();
      const mitoWrapper = $(`<div id="mito-wrapper-id-${id}" class="mito-wrapper"></div>`);
      $(imgList[i]).wrap(mitoWrapper);
      $(`#mito-wrapper-id-${id}`).append(`<img class="mito-image" src="${imgURL}">`);
    }
  }

  // http://www.nicovideo.jp/video_top のサムネ対応
  const thumbnailList = document.querySelectorAll('.Thumbnail');
  for (let i = 0; i < thumbnailList.length; i++) {
    if (!thumbnailList[i].classList.contains('mito-background') && !thumbnailList[i].classList.contains('mito-image')) {
      thumbnailList[i].classList.add('mito-background');
      const id = getId();
      const mitoWrapper = $(`<div id="mito-wrapper-id-${id}" class="mito-wrapper-niconico"></div>`);
      $(thumbnailList[i]).wrap(mitoWrapper);
      $(`#mito-wrapper-id-${id}`).append(`<img class="mito-image" src="${imgURL}">`);
    }
  }
}

function main() {
  mito();
  const target = document.querySelector('body');
  const observer = new MutationObserver(mito);
  const config = { childList: true, subtree: true };
  observer.observe(target, config);
}

main();
