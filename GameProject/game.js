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
          nextText: 100
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
          text: "Go to the Biosphere",
          nextText: 13
        }
      ]
    },
    {
      id: 11,
      text: 'You threw your jar of goo at the monster and it exploded. After the dust settled you saw the monster was destroyed. Seeing your victory you decide to claim this castle as your and live out the rest of your days there.',
      options: [
        {
          text: 'Congratulations. Play Again.',
          nextText: -1
        }
      ]
    }
  ]
  

startGame();