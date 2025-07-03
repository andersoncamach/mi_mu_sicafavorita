document.addEventListener('DOMContentLoaded', function () {
  const audioPlayer = document.getElementById('audioPlayer');
  let currentButton = null;

  document.querySelectorAll('.card button').forEach(button => {
    button.addEventListener('click', function () {
      const audioUrl = this.getAttribute('data-audio');

      if (currentButton === this && !audioPlayer.paused) {
        // Pausar si ya está sonando
        audioPlayer.pause();
        this.querySelector('.play-icon').textContent = '▶';
        this.classList.remove('playing');
        return;
      }

      // Cambiar a una nueva canción
      if (currentButton) {
        currentButton.querySelector('.play-icon').textContent = '▶';
        currentButton.classList.remove('playing');
      }

      audioPlayer.src = audioUrl;
      audioPlayer.play()
        .then(() => {
          this.querySelector('.play-icon').textContent = '❚❚';
          this.classList.add('playing');
          currentButton = this;
        })
        .catch(err => {
          alert("No se pudo reproducir el audio. Verifica el enlace.");
          console.error(err);
        });
    });
  });

  audioPlayer.addEventListener('ended', function () {
    if (currentButton) {
      currentButton.querySelector('.play-icon').textContent = '▶';
      currentButton.classList.remove('playing');
      currentButton = null;
    }
  });
});