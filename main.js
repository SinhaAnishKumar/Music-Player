let previous = document.querySelector('#pre'), play = document.querySelector('#play'), next = document.querySelector('#next'), title = document.querySelector('#title'), recent_volume = document.querySelector('#volume'), volume_icon = document.querySelector('#volume_icon'), volume_show = document.querySelector('#volume_show'), slider = document.querySelector('#duration_slider'), full_duration = document.querySelector('#full_duration'), passed_duration = document.querySelector('#passed_duration'), track_image = document.querySelector('#track_image'), present = document.querySelector('#present'), total = document.querySelector('#total'), artist = document.querySelector('#artist'), main = document.querySelector('#main'), list = document.querySelector('#list'), repeat = document.querySelector('#repeat'), shuffle = document.querySelector('#shuffle');

let timer, link, All_song, max, index_no = 0;

// Creating An Audio Element.
let track = document.createElement('audio');

fetch("https://nihal-priyadarshi.github.io/Tarana/db.json")
     .then(function (response) {
          return response.json();
     })
     .then(function (data) {

          All_song = data;
          // console.log(index_no);
          // console.log(All_song.length);
          max = All_song.length;
          // console.log(All_song[index_no].path);

          track.src = All_song[index_no].path;
          title.innerHTML = All_song[index_no].name;
          track_image.src = All_song[index_no].img;
          artist.innerHTML = All_song[index_no].singer;

          track.load();
          // console.log(recent_volume.value);
          track.volume = recent_volume.value / 100;
          // console.log(track.volume);


          timer = setInterval(range_slider, 1000);
          total.innerHTML = All_song.length;
          present.innerHTML = index_no + 1;

          All_song.forEach(element => {
               // console.log(element.singer);

               link = document.createElement('a');
               link.innerHTML = `${element.id}. ${element.name} &rarr; ${element.singer} <br/><br/>`;


               link.addEventListener('click', function () {
                    // console.log(element.id);
                    // console.log(All_song[element.id-1]);
                    index_no = element.id - 1;
                    track.src = All_song[element.id - 1].path;
                    title.innerHTML = All_song[element.id - 1].name;
                    track_image.src = element.img;
                    artist.innerHTML = element.singer;
                    present.innerHTML = All_song[element.id - 1].id;
                    playsong();

                    nochange();
                    clearInterval(timer);
                    reset_slider();

               });

               list.appendChild(link);

          });
     });

var first_click = true;
pausesong();

play.onclick = function () {
     if (first_click) {
          playsong();
          first_click = false;
     }
     else {
          pausesong();
          first_click = true;
     }
}

var first = true;
volume_icon.onclick = function () {
     if (first) {
          mute_sound();
          first = false;
          volume_icon.classList.add('fa-volume-off');
          volume_icon.classList.remove('fa-volume-up');
          volume_icon.title = "Unmute";
     } else {
          reset_sound();
          first = true;
          volume_icon.classList.remove('fa-volume-off');
          volume_icon.classList.add('fa-volume-up');
          volume_icon.title = "Mute";
     }
}

// Sound Functions
var curVolume, curVolVal;
function mute_sound() {
     curVolVal = recent_volume.value;
     curVolume = recent_volume.value / 100;
     track.volume = 0;
     volume.value = 0;
     volume_show.innerHTML = 0;
}

function reset_sound() {
     track.volume = curVolume;
     volume.value = curVolVal;
     volume_show.innerHTML = curVolVal;
}

// change volume
function volume_change() {
     volume_icon.title = "Mute";
     // playsong();
     // first_click = false;
     if (volume_icon.classList.contains('fa-volume-off')) {
          first = true;
          volume_icon.classList.add('fa-volume-up');
     }

     volume_show.innerHTML = recent_volume.value;
     track.volume = recent_volume.value / 100;
     if (track.volume == 0) {
          first = false;
          volume_icon.title = "Unmute";
          volume_icon.classList.add('fa-volume-off');
          volume_icon.classList.remove('fa-volume-up');
     } else {
          first = true;
          volume_icon.title = "Mute";
          volume_icon.classList.remove('fa-volume-off');
          volume_icon.classList.add('fa-volume-up');
     }

}


recent_volume.oninput = function () {
     volume_show.innerHTML = this.value;
     track.volume = this.value / 100;
}

// Reset Song Slider
function reset_slider() {
     slider.value = 0;
}

// Play Song
function playsong() {
     track.play();
     first_click = false;
     play.innerHTML = '<i class="fa fa-pause" aria-hidden="true"></i>';
     play.title = "Pause";
}

// Pause Song
function pausesong() {
     track.pause();
     first_click = true;
     play.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
     play.title = "Play";
}

// Next Song
function next_song() {
     if (index_no < All_song.length - 1) {
          index_no += 1;
          track.src = All_song[index_no].path;
          title.innerHTML = All_song[index_no].name;
          track_image.src = All_song[index_no].img;
          artist.innerHTML = All_song[index_no].singer;

          track.load();

          timer = setInterval(range_slider, 1000);
          total.innerHTML = All_song.length;
          present.innerHTML = index_no + 1;
          playsong();
     } else {
          index_no = 0;
          track.src = All_song[index_no].path;
          title.innerHTML = All_song[index_no].name;
          track_image.src = All_song[index_no].img;
          artist.innerHTML = All_song[index_no].singer;

          track.load();

          timer = setInterval(range_slider, 1000);
          total.innerHTML = All_song.length;
          present.innerHTML = index_no + 1;
          playsong();

     }
}

// Previous Song
function previous_song() {
     if (index_no > 0) {
          index_no -= 1;
          track.src = All_song[index_no].path;
          title.innerHTML = All_song[index_no].name;
          track_image.src = All_song[index_no].img;
          artist.innerHTML = All_song[index_no].singer;

          track.load();

          timer = setInterval(range_slider, 1000);
          total.innerHTML = All_song.length;
          present.innerHTML = index_no + 1;
          playsong();

     } else {
          index_no = All_song.length - 1;
          track.src = All_song[index_no].path;
          title.innerHTML = All_song[index_no].name;
          track_image.src = All_song[index_no].img;
          artist.innerHTML = All_song[index_no].singer;

          track.load();

          timer = setInterval(range_slider, 1000);
          total.innerHTML = All_song.length;
          present.innerHTML = index_no + 1;
          playsong();
     }
}

var curmins, cursecs;

// Change Slider Position 
function change_duration() {
     slider_position = track.duration * (slider.value / 100);
     track.currentTime = slider_position;
     curmins = Math.floor(track.currentTime / 60), cursecs = Math.floor(track.currentTime - curmins * 60);


     if (cursecs < 10) {
          passed_duration.innerHTML = `${curmins} : 0${cursecs}`;
     } else {
          passed_duration.innerHTML = `${curmins} : ${cursecs}`;
     }
}

slider.onchange = function () {
     slider_position = track.duration * (slider.value / 100);
     track.currentTime = slider_position;

}

// For Repeat
var select = true;
repeat.innerHTML = ``;

// For Shuffle
var selected = true;

function range_slider() {
     let position = 0;

     // Update Slider Position
     if (!isNaN(track.duration)) {
          
          position = track.currentTime * (100 / track.duration);
          slider.value = position;
          
          curmins = Math.floor(track.currentTime / 60), cursecs = Math.floor(track.currentTime - curmins * 60);
          if (cursecs < 10) {
               passed_duration.innerHTML = `${curmins} : 0${cursecs}`;
          } else {
               passed_duration.innerHTML = `${curmins} : ${cursecs}`;
          }

          var durmins = Math.floor(track.duration / 60), dursecs = Math.floor(track.duration - durmins * 60);
          if (dursecs < 10) {
               full_duration.innerHTML = `${durmins} : 0${dursecs}`;
          } else {
               full_duration.innerHTML = `${durmins} : ${dursecs}`;
          }
     }

     repeat.onclick = function () {
          if (select) {
               repeat.innerHTML = `1`;
               repeat.classList.add('selected');
               repeat.classList.remove('repeat');
               repeat.title = "Disable repeat";
               if (track.ended) {
                    // console.log(index_no);
                    track.src = All_song[index_no].path;
                    title.innerHTML = All_song[index_no].name;
                    track_image.src = All_song[index_no].img;
                    artist.innerHTML = All_song[index_no].singer;

                    track.load();

                    timer = setInterval(range_slider, 1000);
                    total.innerHTML = All_song.length;
                    present.innerHTML = index_no + 1;
                    playsong();

               }

               select = false;

          } else {
               repeat.innerHTML = ``;
               repeat.classList.add('repeat');
               repeat.classList.remove('selected');
               select = true;
               repeat.title = "Enable repeat";
          }
     }


     shuffle.onclick = function () {

          if (selected) {

               shuffle.classList.add('selected');
               shuffle.classList.remove('shuffle');
               // console.log(shuffle.className);
               selected = false;
               shuffle.title = "Disable shuffle";

               if (track.ended) {

               } else {
                    var anotherRandom = Math.floor(Math.random() * max);
                    // console.log(anotherRandom);
                    index_no = anotherRandom;
                    // console.log(index_no);
                    track.src = All_song[index_no].path;
                    title.innerHTML = All_song[index_no].name;
                    track_image.src = All_song[index_no].img;
                    artist.innerHTML = All_song[index_no].singer;

                    track.load();

                    timer = setInterval(range_slider, 1000);
                    total.innerHTML = All_song.length;
                    present.innerHTML = index_no + 1;
                    playsong();
               }

          } else {
               shuffle.classList.remove('selected');
               shuffle.classList.add('shuffle');
               selected = true;
               shuffle.title = "Enable shuffle";
          }
     }


     // Function Will Run When The Song Is Over
     if (track.ended) {
          if (shuffle.classList.contains("selected") && repeat.innerHTML == '') {
               var random = Math.floor(Math.random() * max);
               index_no = random;
               track.src = All_song[index_no].path;
               title.innerHTML = All_song[index_no].name;
               track_image.src = All_song[index_no].img;
               artist.innerHTML = All_song[index_no].singer;

               track.load();

               timer = setInterval(range_slider, 1000);
               total.innerHTML = All_song.length;
               present.innerHTML = index_no + 1;
               playsong();
          }

          else if (repeat.innerHTML == '') {
               next_song();
          }
          else {
               if (track.ended) {
                    // console.log(index_no);
                    track.src = All_song[index_no].path;
                    title.innerHTML = All_song[index_no].name;
                    track_image.src = All_song[index_no].img;
                    artist.innerHTML = All_song[index_no].singer;

                    track.load();

                    timer = setInterval(range_slider, 1000);
                    total.innerHTML = All_song.length;
                    present.innerHTML = index_no + 1;
                    playsong();
               }
          }
     }
}

// Function To Open And Close Documentation.
const hide_show = document.getElementById('hide_show'), main_body_hide = document.getElementById('main_body_hide');

var click = true;
nochange();

hide_show.onclick = function () {
     if (click) {
          change();
          click = false;
     }
     else {
          nochange();
          click = true;
     }
}

function change() {
     main_body_hide.style.display = '';
     main.style.display = 'none';
     hide_show.innerText = 'X';
     hide_show.style.color = "#fff";
}

function nochange() {
     main_body_hide.style.display = 'none';
     main.style.display = '';
     hide_show.innerText = '☰';
     hide_show.style.color = "#fff";
}
