const textElement = document.getElementById('text');
const optionButtonsElement = document.getElementById('option-buttons')

let state = {};

function startGame() {
    state = {};
    showTextNode(1);
};

function showTextNode(textNodeIndex) {
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex);
    textElement.innerText = textNode.text;
    while (optionButtonsElement.firstChild) {
        optionButtonsElement.removeChild(optionButtonsElement.firstChild);
    };

    textNode.options.forEach(option => {
        if(showOption(option)) {
            const button = document.createElement('button');
            button.innerText = option.text;
            button.classList.add('btn');
            button.addEventListener('click', () => selectOption(option));
            optionButtonsElement.appendChild(button);
        };
    });
};

function showOption(option) {
    return option.requiredState == null || option.requiredState(state);
};

function selectOption(option) {
    const nextTextNodeId = option.nextText;
    if (nextTextNodeId <= 0) {
        startGame();
    };

    // Takes current state, adds everything from setState and overrides anything thats already there.
    // For ex. if state has blueGoo=true, and option.setState has it =false, it will override the true value
    // Returns a brand new object that is then set as the current state. 
    state = Object.assign(state, option.setState);
    showTextNode(nextTextNodeId);
};

//On the scoutship Yamath, launched in 2273, the crew near their destination: Proxima Centauri b. After two failed attempts, from the scoutships Mephistopheles and Sharuuma, this is to be the final chance to determine the exoplanet's potential for habitability.

//Unexpectedly, they get a signal coming from near Proxima Centauri b - from the Mephistopheles. Among the crew members to risk boarding the drifting scoutship is you.

const textNodes = [
    {
      id: 1,
      text: "You enter the Mephistopheles, trepidation slowing your steps. Where do you go?",
      options: [
        {
          text: "Go to the Communications room.",
          nextText: 2
        },
        {
          text: "Go to the Bridge.",
          nextText: 3
        },
        {
          text: "Go out an airlock.",
          nextText: 4
        }
      ]
    },
    {
      id: 2,
      text: "You make your way to the communications deck. The door opens, and the cold, slick sense of terror slithers down your spine. Blood stains the walls, the desks, everything. Aside from the remains of the brutal carnage, you see nothing of interest. The speaker in your suit beeps, and Jason tells you to hurry to Storage.",
      options: [
        {
          text: "Rush to Storage",
          setState: { isCursed: true },
          nextText: 5
        },
        {
          text: "Explore a little first",
          setState: { notCursed: true },
          nextText: 6
        },
      ]
    },
    {
      id: 3,
      text: "You go to the Bridge. In the Captain's seat is the Captain's slumped body, a deep gash sweeping up along the side of his neck. You see the small, bloody blade of an astro knife on the ground.",
      options: [
        {
          text: "Take the knife",
          setState: { knife: true },
          nextText: 7
        },
        {
          text: "Leave the knife",
          nextText: 7
        },
        {
          text: "Grab the knife and follow in the Captain's steps.",
          nextText: 8
        }
      ]
    },
    {
      id: 7,
      text: "The speaker in your suit beeps, and Jason tells you to hurry to Storage.",
      options: [
        {
          text: "Rush to Storage",
          setState: { isCursed: true },
          nextText: 5
        },
        {
          text: "Explore a little first",
          setState: { notCursed: true },
          nextText: 6
        },
      ]
    },
    {
      id: 4,
      text: "The great vacuum of space pull you violently from the airlock, and in death you drift through space as a corpseicle.",
      options: [
        {
          text: 'Restart',
          nextText: -1
        }
      ]
    },
    {
      id: 5,
      text: "You arrive at Storage with your lungs and legs burning. Jason is standing over an large, oddly shapen, metal box. He turns and grins at you. 'I was just about to open it without you,' he says wryly. 'You can do the honors my friend'. You walk over to the box and pry it open. Inside you see a gold ring with what looks like letters of some obscure or ancient language engraved on it. You pick it up, the ring surprisingly heavy for such a small thing. You and Jason find nothing else of value.",
      options: [
        {
          text: "Return to the Yamath.",
          nextText: 9
        }
      ]
    },
    {
      id: 6,
      text: "Your curiosity gets the better of you and wander around the ship, eventually meandering your way to the Communal Deck. You catch only a glimpse of the horrific scene before you, bodies and gore strewn about the floor, before turning away quickly and going to Storage. Once there, you see Jason standing over an open metal box, eyeing a gold ring. You ask if there was anything else, and he shakes his head in response. 'We should get back, I would rather not keep looking arouond to see more of the Mephistopheles crew'.",
      options: [
        {
          text: "Return to the Yamath.",
          nextText: 9
        }
      ]
    },
    // {
    //   id: 8,
    //   text: 'While exploring the castle you come across a horrible monster in your path.',
    //   options: [
    //     {
    //       text: 'Try to run',
    //       nextText: 8
    //     },
    //     {
    //       text: 'Attack it with your sword',
    //       requiredState: (currentState) => currentState.sword,
    //       nextText: 9
    //     },
    //     {
    //       text: 'Hide behind your shield',
    //       requiredState: (currentState) => currentState.shield,
    //       nextText: 10
    //     },
    //     {
    //       text: 'Throw the blue goo at it',
    //       requiredState: (currentState) => currentState.blueGoo,
    //       nextText: 11
    //     }
    //   ]
    // },
    {
      id: 8,
      text: "Despair sets in as you realize there is no hope. Not for humanity, and certainly not for you, and draw the blade down your throat.",
      options: [
        {
          text: 'Restart',
          nextText: -1
        }
      ]
    },
    {
      id: 9,
      text: "You are once again aboard the Yamath. You and Jason report your findings to Captain Jessop, who orders you to get some rest. With the promise of your talking to the ship psychatrist the next day. Your consciousness fades to black within seconds of lying on your bed.",
      options: [
        {
          //cursed route
          text: "Continue",
          requiredState: (currentState) => currentState.isCursed,
          nextText: 10
        },
        {
          //uncursed route
          text: "Continue",
          requiredState: (currentState) => currentState.notCursed,
          nextText: 1000
        },
      ]
    },
    {
      id: 10,
      text: "You feel so warmth. Vibrant. Alive! The world - or ship - is yours for the taking on this day. Where to go first?",
      options: [
        {
          text: "Go to the Cafeteria",
          nextText: 11
        },
        {
          text: "Go to the ship psychiatrist",
          nextText: 12
        },
        {
          text: "Go to the Oxygen Garden",
          nextText: 13
        }
      ]
    },




    {
      id: 1000,
      text: "A soft whirring sound wakes you. You groan as you lean up to see the door to your finish opening, but no one in sight.",
      options: [
        {
          text: "Go back to sleep",
          nextText: 1001
        },
        {
          text: "Call out to see who opened your door",
          nextText: 1002
        },
        {
          text: "Get up and go out to the hallway",
          nextText: 1003
        }
      ]
    },
    {
      id: 1001,
      text: "You mumble as you lie back down and close your eyes. As consciousness starts to fade once again, you hear shuffling to your side. Your eyes flash open in time to a large wrench being swung. It crashes into your head before you can react, fracturing the skull in a blinding burst of pain. You try to scream but your body doesn't respond. You hear the crunch of your skull as the wrench smashes into it again, and again...",
      options: [
        {
          text: 'Restart',
          nextText: -1
        }
      ]
    },
    {
      id: 1002,
      text: "You hear nothing. Not even footsteps. That faulty door's been such a nightmare as of late. You're too awake now to go back to sleep, so you get to your feet. You glance at your clock - it's 0600 hours.",
      options: [
        {
          text: "Trudge out to the hall",
          nextText: 1003
        }
      ]
    },
    {
      id: 1003,
      text: "Something grabs your attention at the end of the hallway, but you don't see anything unusual. Perhaps someone had just walked by and caught the corner of your eye. You shrug away the ill feeling. The Captain had been clear you need to talk to Jocelyn first thing.",
      options: [
        {
          text: "Check the ship's logs",
          nextText: 1004
        },
        {
          text: "Go see Jocelyn",
          nextText: 1005
        },
        {
          text: "Head to the Cafeteria for breakfast",
          nextText: 1006
        },
        {
          text: "Go see Captain Jessop",
          nextText: 1007
        }
      ]
    },
    {
      id: 1004,
      text: "In Communications, you log onto the terminal and see two new alerts. The first alert reads: 'Oxygen consumption levels increased by 46% between the hours of 0200 and 0400 compared to the average consumption during those hours'. You are about to read the next alert when you hear footsteps outside the room.",
      options: [
        {
          text: "Read the second alert",
          nextText: 1008
        },
        {
          text: "Go see Captain Jessop",
          nextText: 1007
        },
        {
          text: "Head to the Cafeteria for breakfast",
          nextText: 1009
        },
        {
          text: "Hide",
          nextText: 1010
        }
      ] 
    },
    {
      id: 1005,
      text: "You raise your fist to knock on the door and it opens. Jocelyn sits, looking as impassive as ever.",
      options: [
        {
          text: "Tell her what happened to the crew",
          nextText: 1012
        },
        {
          text: "Tell her about the ring",
          nextText: 1013
        },
        {
          text: "Tell her about this morning",
          nextText: 1014
        }
      ]
    },
    {
      id: 1006,
      text: "Once in the Cafeteria you go straight to the food dispenser. You see some hastily-cleaned ketchup or other sauce. You press the button to get today's breakfast. You hear some whirring, then the machine churns and starts to making clunking noises before stopping. You look down at your plate to see most of a hand sitting on it. Your heart begins pounding, threatening to burst from your ribcage. You turn to flee and find yourself facing someone in full spacesuit. You're almost too shocked to notice blade now sticking in your belly. The knife is yanked across your abdomen and removed in one fluid motion. You fumble to keep your organs in your body as you collapse to the ground. How is it getting so cold, so fast...?",
      options: [
        {
          text: "Restart",
          nextText: -1
        }
      ]
    },
    {
      id: 1007,
      text: "You go to the Bridge, only to find it empty. You had been so sure that Captain Jessop permanently resided to that room.",
      options: [
        {
          text: "Go to Jocelyn",
          nextText: 1011
        },
        {
          text: "Go to the Cafeteria",
          nextText: 1015
        },
        {
          text: "Grab the astro knife, then go to the Cafeteria",
          requiredState: (currentState) => currentState.knife,
          nextText: 1016
        }
      ]
    },
    {
      id: 1008,
      text: "You start to read the second alert when the door opens. You turn to see Captain Jessop, eyes narrowed. You can't tell if he's just grumpy as usual, suspicious of you, or about to chop your head off. Without a word he whips around and walks out of sight. You sigh, then read the second alert: 'Unidentified obstruction preventing proper airflow to Cafeteria.'",
      options: [
        {
          text: "Go to Cafeteria",
          nextText: 1015
        },
        {
          text: "Grab the astro knife, then go to the Cafeteria",
          requiredState: (currentState) => currentState.knife,
          nextText: 1016
        }
      ]
    },
    {
      id: 1009,
      text: "You enter the Cafeteria. Your stomach rumbles loudly, but it doesn't change the fact that Jasmine is at the food dispenser. You wait. Impatiently, but you wait nonetheless. Suddenly she shrieks like she just witnessed a murder.",
      options: [
        {
          text: "Go see if she's okay",
          nextText: 1017
        },
        {
          text: "Ask if she's okay",
          nextText: 1018
        },
        {
          text: "Run away",
          nextText: 1019
        }
      ]
    },
    {
      id: 1010,
      text: "With shocking agility you find yourself curled up behind the desk. The door opens and the padding of footsteps approach. They grow closer to the desk as your breathing gets shaky. You could swear each breath was as loud as a crack of thunder. Suddenly there's a loud bang on the table. 'What in the hell are you doing? This is why I told you to get your ass to Jocelyn', Jessop says. You look up at him, a little ashamed and very much embarrassed. 'Why are you sitting there all sheepish. Get your ass in gear now!' he shouts.",
      options: [
        {
          text: "Run to Jocelyn",
          nextText: 1011
        },
        {
          text: "Run to Jocelyn",
          nextText: 1011
        },
        {
          text: "Run to Jocelyn",
          nextText: 1011
        },
        {
          text: "Run to Jocelyn",
          nextText: 1011
        }
      ]
    },
    {
      id: 1011,
      text: "You race to Jocelyn, droplets of sweat on your brow when you arrive. Despite your sudden arrival and clear panic, her gaze is unwaveringly impassive.",
      options: [
        {
          text: "Tell her what happened to the crew",
          nextText: 1012
        },
        {
          text: "Tell her about the ring",
          nextText: 1013
        },
        {
          text: "Tell her about this morning",
          nextText: 1020
        }
      ]
    },
    {
      id: 1012,
      text: "You tell her about what you saw in the Mephistopheles, the tragic remains of its crew, yet her face gives nothing away. 'How does this make you feel?' she asks. 'You tell me, this has me confused as hell,' you respond. To your surprise this elicits a chuckle from her. 'I would be worried if that was not the case. For now, go make yourself busy. I am here if you need to talk'.",
      options: [
        {
          text: "option1",
          nextText: 1021
        },
        {
          text: "option2",
          nextText: 1022
        }
      ]
    },
    {
      id: 1013,
      text: "You tell her about the Jason, the metal box, and the gold ring. She cocks an eyebrow. 'Does that cause you discomfort?' she asks. You tell her you're unsure. 'Rather unhelpful.' She shakes her head at you and points you to the door. 'If you decide you have anything worth talking about, you know where to find me.",
      options: [
        {
          text: "option2",
          nextText: 1022
        },
        {
          text: "option3",
          nextText: 1023
        }
      ]
    },
    {
      id: 1014,
      text: "You tell her about your weird morning, how disconcerting it has been. 'Tell me what your concern is,' she orders. You think for a moment, piecing everything together in your mind. 'I worry that someone on the ship is going to do to us what happened on the Mephistopheles. Jessop told you what we found right?' She nods and purses her lips. 'I appreciate your coming to me. Focus on your work, and I will look into this.",
      options: [
        {
          text: "option3",
          nextText: 1023
        }
        {
          text: "option1",
          nextText: 1021
        }
      ]
    }

  ]
  

startGame();