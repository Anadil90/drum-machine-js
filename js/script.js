const drumPad = document.querySelectorAll(".drum-pad");
const audioSrc = document.querySelectorAll(".clip");
const display = document.getElementById("display");
const Switch = document.getElementById("on-off-switch");
const bank = document.getElementById("on-off-switch-custom");
const switchState1 = document.querySelector(".switchState1");
const switchState2 = document.querySelector("switchState2");

const soundBank_A = [
     {   
        id: "Bass Drum",
        src: "sound assets/Bass Drum.wav",
        keyCode: 113
    },
    
    {
        id: "Clap",
        src: "sound assets/clap.wav",
        keyCode: 119
    },

     {
        id: "Hi Hat",
        src: "sound assets/Hi Hat.wav",
        keyCode: 101
    },

     {
        id: "Closed Hi Hat",
        src: "sound assets/Hi Hat closed.wav",
        keyCode: 97
    },

     {
        id: "Snare",
        src: "sound assets/Snare hit.wav",
        keyCode: 115
    },

     {
        id: "Stick Hit",
        src: "sound assets/Stick Hit.wav",
        keyCode: 100
    },

    {
        id: "Cymball Crash",
        src: "sound assets/Cymball Crash.wav",
        keyCode: 122
    },

     {
        id: "Clean Ride",
        src: "sound assets/Clean Ride.wav",
        keyCode: 120
    },

     {
        id: "Gong",
        src: "sound assets/Gong.wav",
        keyCode: 99
    }
]


const soundBank_B = [
    {
        id: "Cowbell",
        src: "sound assets/Cowbell.wav",
        trigger: "Q",
        keyCode: 113
    },

    {
        id: "Hi Hat Closing",
        src: "sound assets/Hi hat Closing.wav",
        trigger: "W",
        keyCode: 119
    },

    {
        id: "Hi Hat",
        src: "sound assets/Hi Hat 2.wav",
        trigger: "E",
        keyCode: 101
    },

    {
        id: "High Tom",
        src: "sound assets/High Tom.wav",
        trigger: "A",
        keyCode: 97
    },

    {
        id: "Mid Tom",
        src: "sound assets/Mid Tom.wav",
        trigger: "S",
        keyCode: 115
    },

    {
        id: "Low Tom",
        src: "sound assets/Low Tom.wav",
        trigger: "D",
        keyCode: 100
    },

    {
        id: "Snare",
        src: "sound assets/Snare 2.wav",
        trigger: "Z",
        keyCode: 122
    },

    {
        id: "Trance Kick",
        src: "sound assets/Trance Kick.wav",
        trigger: "X",
        keyCode: 120
    },

    {
        id: "Cymball",
        src: "sound assets/Cymball crash 2.wav",
        trigger: "C",
        keyCode: 99
    }

]

// volume mute switch .................................>
new DG.OnOffSwitch({
    el: '#on-off-switch',
    listener:function(name, checked){
        // toggle volume mute 
        if(checked === true) {
            // set muted property to audio element 
            $(".clip").prop("muted", "muted")
            
            switchState1.innerHTML = "sound off";
            


        }else {
            // unset muted option from audio element 
            $(".clip").prop("muted", "")
            switchState1.innerHTML = "sound on"
    
        }
    }
})
// ....................................................>
 // set event listener to drum pad elements .......>
//  play drum when drum pad elements are clicked
 function drumClick () {
    for(let i = 0; i < drumPad.length; i++) {
    drumPad[i].addEventListener('click', () => {
        audioSrc[i].load()
        audioSrc[i].play()
    
        display.innerHTML = drumPad[i].id;
        }) 
    }
 }
 drumClick()

//  play drums when the key associated with drum pads are pressed 
function drumKeyPress () {

    for(let i = 0; i < drumPad.length; i++) {
            document.addEventListener("keypress", (event) => {
                if( event.which === soundBank_A[i].keyCode) {
                    console.log(audioSrc[i].id)
                    audioSrc[i].load()
                    audioSrc[i].play()
                    $(drumPad[i])[0].click(function(){
                        console.log("click")
                           let audio = audioSrc[i];
                   let playPromise;
                   playPromise = audio.play();
                   
                   if(playPromise != undefined) {
                    playPromise.then(() => {
                    
                    }).catch(e => {
                        console.log("error loading audio")
                        playPromise.then(() => {
                            audioSrc[i].load()
                            audioSrc[i].play()
                        })
                    })
                }
                    })
                    display.innerHTML = soundBank_A[i].id;
            }
            })
                
        
            
    }
        
}
drumKeyPress()

// ................................................> 

// switch sound bank ..................................>
new DG.OnOffSwitch({

    el:'#on-off-switch-custom',
    height: 30,
    width: 64,
    trackColorOn:'#F57C00',
    trackColorOff:'#666',
    trackBorderColor:'#555',
    textColorOff:'#ffc',
    textOn:'B',
    textOff:'A',
    el: '#on-off-switch',
    listener:function(name, checked){
        // switch to sound bank B
        if(checked === true) { 
            console.log("sound bank B")
            // set sound bank value to B 
            for(let i = 0; i < audioSrc.length; i++) {
                audioSrc[i].setAttribute("src", soundBank_B[i].src);
                audioSrc[i].setAttribute("id", soundBank_B[i].id);
                document.addEventListener("keypress", (event) => {
                    if(event.which === soundBank_B[i].keyCode) {
                        // set src from soundBank_B to audio element 
                        console.log("pressed", soundBank_B[i].id)
            
            audioSrc[i].play();
            // display drum element being played
            display.innerHTML = soundBank_B[i].id 
                    }
                })
            
            }
            
        }

        else{

            for(let i = 0; i < audioSrc.length; i++) {
                 audioSrc[i].setAttribute("src", soundBank_A[i].src);
                 audioSrc[i].setAttribute("id", soundBank_A[i].id);
                document.addEventListener("keypress", (event) => {
                    if(event.which === soundBank_A[i].keyCode) {
                        // set src from soundBank_B to audio element 
                        console.log("pressed", soundBank_A[i].src)
            
                        audioSrc[i].play();
                        // display drum element being played
                        display.innerHTML = soundBank_A[i].id
                    }
                })
            
            }
            
        }
    }
});


// ....................................................>



    



