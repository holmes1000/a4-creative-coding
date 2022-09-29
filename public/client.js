const start = function() {
    document.body.innerHTML = ''
    const canvas = document.createElement( 'canvas' )
    document.body.appendChild( canvas )
    canvas.width = canvas.height = 512
    const ctx = canvas.getContext( '2d' )

    // audio init
    const audioCtx = new AudioContext()
    const audioElement = document.createElement( 'audio' )
    document.body.appendChild( audioElement )

    // audio graph setup
    const analyser = audioCtx.createAnalyser()
    analyser.fftSize = 1024 // 512 bins
    const player = audioCtx.createMediaElementSource( audioElement )
    player.connect( audioCtx.destination )
    player.connect( analyser )

    // make sure, for this example, that your audiofle is accesssible
    // from your server's root directory... here we assume the file is
    // in the ssame location as our index.html file
    audioElement.src = './ufo ufo - _Strange Clouds_.mp3'
    audioElement.play()

    const results = new Uint8Array( analyser.frequencyBinCount )

    draw = function() {
      // temporal recursion, call tthe function in the future
      window.requestAnimationFrame( draw )
      
      // fill our canvas with a black box
      // by doing this every frame we 'clear' the canvas
      ctx.fillStyle = 'black' 
      ctx.fillRect( 0,0,canvas.width,canvas.height )
      
      // set the color to white for drawing our visuaization
      //ctx.fillStyle = 'white' 
      
      analyser.getByteFrequencyData( results )
      
      for( let i = 0; i < analyser.frequencyBinCount; i++ ) {
        let r = (i * results[i]) / 5;
        let g = i;
        let b = results[i] / 5;
        ctx.fillStyle = `rgb(${r}, ${g}, ${b})`
        ctx.fillRect( results[i] , i,  1,  1)
        ctx.fillRect(canvas.width-results[i] , i,  1,  1)
      }
    }
    draw()
  }

  window.onload = ()=> document.querySelector('button').onclick = start