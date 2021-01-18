const icon24 =
  '<circle id="Oval" fill="#FDB635" cx="11" cy="11" r="11"></circle><path d="M6.440564,13.0847883 C7.23616553,13.0847883 7.881128,13.7373807 7.881128,14.5423941 C7.881128,15.3474076 7.23616553,16 6.440564,16 C5.64496247,16 5,15.3474076 5,14.5423941 C5,13.7373807 5.64496247,13.0847883 6.440564,13.0847883 Z M12.2728747,6.03429169 L12.2728747,10.1003659 L15.6900553,10.1003659 L15.6900553,6.03429169 L18,6.03429169 L18,15.853633 L15.6898487,15.853633 L15.6898487,12.1610037 L12.2728747,12.1610037 L12.2728747,15.853633 L9.97656896,15.853633 L9.97656896,6.03429169 L12.2728747,6.03429169 Z M7.57900426,6 L7.57900426,12.4549922 L5.30212374,12.4549922 L5.30212374,6 L7.57900426,6 Z" id="Combined-Shape" fill="#000000" fill-rule="nonzero"></path>'

function run() {
  miro.initialize({
    extensionPoints: {
      bottomBar: {
        title: 'Insight Hunter',
        svgIcon: icon24,
        onClick: async () => {
          const authorized = await miro.isAuthorized()
          if (authorized) {
            miro.board.ui.openLibrary('dist/content.html', {title: 'Insight Hunter'})
          } else {
            miro.board.ui.openModal('dist/not-authorized.html').then((res) => {
              if (res === 'success') {
                miro.board.ui.openLibrary('dist/content.html', {title: 'Insight Hunter'})
              }
            })
          }
        },
      },
    },
  })
}

miro.onReady(run)
