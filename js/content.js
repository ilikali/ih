
function createImage(canvasX, canvasY, imageUrl, siteTitle, siteCategory, siteUrl ) {
  let image = miro.board.widgets.create({type:'image', url: imageUrl, scale:0.2,  x: canvasX, y: canvasY})
  let text = miro.board.widgets.create({
    type:'shape',
    width: 258,
    x: canvasX,
    y: canvasY+119,
    style: {
      backgroundColor: "#ffffff",
      borderOpacity: 0,
      fontSize: 12
    },
    text: "<strong>"+siteTitle+"<br/></strong><a href='"+siteUrl+"'>"+siteUrl+"</a>"
  })
  // let frame = miro.board.widgets.create({type:'frame', width: 300, height: 500, title: siteTitle, childrenIds: [image[0].id, text[0].id], style:{backgroundColor: "#ffffff"}})
}




function renderResult(obj) {
  const container = document.querySelector('.results')
  container.innerHTML += `<div class="search_result" data-image-url="${obj.image.url}" data-site-url="${obj.url}" data-site-title="${obj.name}" data-site-category="${obj.industry.name}"><div class="sr_image" style="background-image:url(${obj.image.url});"></div><div class="sr_desc"><b>${obj.name}</b><p>${obj.industry.name}</p></div></div>`
  const imageOptions = {
    draggableItemSelector: '.search_result',
    getDraggableItemPreview: (targetElement) => {
      currentImageUrl = targetElement.getAttribute('data-image-url')
      currentSiteTitle = targetElement.getAttribute('data-site-title')
      currentSiteCategory = targetElement.getAttribute('data-site-category')
      currentSiteUrl = targetElement.getAttribute('data-site-url')
      return {
        width: 350,
        height: 190,
        url: currentImageUrl,
      }
    },
    onDrop: (canvasX, canvasY) => {
      createImage(canvasX, canvasY, currentImageUrl, currentSiteTitle, currentSiteCategory, currentSiteUrl)
    },
  }
  miro.board.ui.initDraggableItemsContainer(container, imageOptions)
}

function bootstrap() {

  const container = document.getElementById('container')


  fetch('https://insight-hunter.com/api/v1/get_categories').then(function(response) {
    return response.json();
  }).then(function(data) {
    console.log(data)
    for (var i = 0; i < data.length; i++){
      let obj = data[i];
      const container = document.querySelector('.category_select')
      container.innerHTML += `<option value="${obj.id}">${obj.name}</option>`
    }
  })

  let currentImageUrl
  let currentSiteTitle
  let currentSiteCategory
  let currentSiteUrl

  fetch('https://insight-hunter.com/api/v1/home').then(function(response) {
    return response.json();
  }).then(function(data) {
    $(".results").html("");
    for (var i = 0; i < data.length; i++){
      let obj = data[i];
      renderResult(obj)
    }
  })

  $(document).on('change', '.category_select', function (e) {
    data = $(".search_form").serialize()
    $.ajax({
        url: 'https://insight-hunter.com/api/v1/search',
        data: data,
        type: "GET",
        dataType: "json",
        success: function(data) {
          $(".results").html("");
          for (var i = 0; i < data.length; i++){
            let obj = data[i];
            renderResult(obj)
          }
        }
    });
  })







}

miro.onReady(bootstrap())
