const reviews = [
    {
        timestamp: '20/09/2026 21:41:46',
        name: 'Giorgia',
        connection: 'Tommaso’s boss',
        food: 5,
        sleep: 5,
        neighborhood: 5,
        hosts: 5,
        comment: `Coming to Leppäcaasa is always like feeling at home, the quality of the food significantly improves with my presence though💅

Sometimes the hosts are a bit lazy and tend to leave mugs everywhere🙄

The gigantic TV and the audio system are a plus, even if my ears sometimes do suffer a bit🙉

Honorable mención: triumvirato Prisma-Lidl-K market I love you❤️`
    },
    {
        name: 'Federico',
        connection: 'Friend of Tommaso and Parpi',
        food: 4,
        sleep: null,
        neighborhood: 4,
        hosts: 5,
        comment: 'Incredible sauna, incredibile hosts. The true italian "Bella vita" or smth like that'
    },
    {
        name: 'Doc',
        connection: 'I got dragged out there for the first time right after a 160 km ride earlier this spring.',
        food: 3,
        sleep: null,
        neighborhood: 1,
        hosts: 5,
        comment: `I appreciated the place and liked the hosts very much. I had to rate the food with only three stars because the vegan Nutella I was offered had sugar as the first ingredient. On the other hand, I really appreciated the selection of pasta sauces in the pantry, clearly of authentic regional Italian origin. It's a pity I didn't get to taste them.

Da rivedere la quantità di imprecazioni verso l’Altissimo da parte di uno dei proprietari di casa.`
    },
    {
        name: 'il Van Aert del basso Garda',
        connection: 'I unfortunately befriended Tommaso at some dramatic point of my life, a series of events later brought me to his house.',
        food: 4,
        sleep: 2,
        neighborhood: 3,
        hosts: 2,
        comment: `Great quality for both vegans and heavy meat eaters. The couple who lives in the apartment has a steady, romantic relationship but extremely different eating habits, so you’ll find whatever you’ll need.

Espresso quality is top notch, too.`
    },
    {
        name: 'Maty',
        connection: 'Tommaso and Giorgia’s friend',
        food: 5,
        sleep: 5,
        neighborhood: 4,
        hosts: 5,
        comment: `Coffee and breakfast were amazing, it ruined my porridge and coffee at home forever...currently looking for a new espresso machine.

I've also bought an airfrier as soon as I got home...be careful if you stay here you'll wanna spend a lot of cash when you get back from vacation.

TV is a bit small, I would like to watch Napoli's weddings on a bigger screen next time.

Bathroom is very nice and loundry service convenient and cheap.

Super close to the train station if you need to run away from your hosts.`
    },
    {
        name: 'Fra Tac',
        connection: 'Gently invited by Tommaso, through a common acquaintance (Giorgia)',
        food: 5,
        sleep: 5,
        neighborhood: 5,
        hosts: 5,
        comment: `Chef Giorgia needs a mention of honor, I still dream about the tofu pancakes. I dove deeper into Veneto and bestemmia culture, for better or worse. Found out the real meaning of cojone (not sure of the spelling). I use the expression “what’s the policy of…” way to much after my Leppacasa experience. I received a private lecture on finance, investing and obligations. Overall, I’d recommend and come back for a second round.`
    },
    {
        name: 'Lara',
        connection: 'Tommaso’s friend',
        food: 5,
        sleep: 5,
        neighborhood: 5,
        hosts: 5,
        comment: 'The best possible experience to have in Finland—the sauna is a bonus. The hosts are absolute gems, though they snore actually loudly!!!!!!!!! (But whatever...)'
    },
    {
        name: 'Angie',
        connection: 'Giorgia’s bff',
        food: 4,
        sleep: 4,
        neighborhood: 5,
        hosts: 5,
        comment: 'You have questionable taste when it comes to LED lights, but I love you guys anyway🩷'
    },
    {
        name: 'DajeRomaDaje',
        connection: "Tommaso's collegue/friend but still invited by mistake",
        food: 5,
        sleep: 1,
        neighborhood: 5,
        hosts: 5,
        comment: 'Great food and movies... omg italian classics'
    },


    {
        name: 'Sfacc',
        connection: 'Tommaso’s colleague',
        food: 4,
        sleep: null,
        neighborhood: 3,
        hosts: 5,
        comment: 'I love the smart features of the apartment. Very nice terrace, perfect to {redacted}. Good and healthy food I would say. Overall, good quality/price ratio.'
    },
    {
        name: 'Alty',
        connection: 'Parpi’s friend',
        food: 4,
        sleep: 4,
        neighborhood: 5,
        hosts: 5,
        comment: 'Che terrazzo della madonna'
    },
    {
        name: 'Beba',
        connection: 'Tommaso’s cousin and opinionated "compagno di banco" from the middle school. ',
        food: 5,
        sleep: 5,
        neighborhood: 5,
        hosts: 5,
        comment: 'Got the princess treatment experience with Tommaso picking me up directly at the airport 💅 then got blessed with the mystical experience of sauna + magical \{redacted\} on the terrace. Big plus the personal barista making Oat cappuccinos in the morning 😉'
    },
    {
        name: 'iramisu',
        connection: 'came for the tram videos, never left',
        food: 5,
        sleep: 3,
        neighborhood: 2,
        hosts: 5,
        comment: `Impeccable vibes. Warm atmosphere, welcoming hosts, good soundsystem. I have never had a bad food experience in this place. Would treat any butter found in the fridge with extreme caution tho. Once saw aurora from the balcony.`
    },
    {
        name: 'lászló',
        connection: 'helped to fill up LeppaCasa with stuff day 0 🫡',
        food: 5,
        sleep: 1,
        neighborhood: 2,
        hosts: 5,
        comment: `Bängeri food, 10/10 the best toast with butter I ever had in my entire life. Bängeri vibes with good events + company. Even tho the music choices are often times questionable, the sound system is definitely not. And the one constant: lovely hosts 💞`
    },
    {
        name: 'Alice - The Degrees Holder',
        connection: 'helped to fill up LeppaCasa with stuff day 0 🫡',
        food: 4,
        sleep: null,
        neighborhood: 5,
        hosts: 4,
        comment: `Food can be questionable, but the hosts do their best to put love in whatever they make. Sauna and balcony are definitely my highlights. A lot of bestemmie, be prepared if you're Christian (and also if you believe in Jesus).`
    },
    {
        name: 'Surry',
        connection: 'Parpi and Tommaso’s friend',
        food: 5,
        sleep: null,
        neighborhood: 3,
        hosts: 4,
        comment: `Leppäcaasa is that place where all poets come and gather to discuss of the world’s greatest challenges and achievements - while giving space to creativity and the fine arts.
It’s the righteous successor to Schrute Farms.

As the balcony garden turns to bloom in summer, the great green wall of basil takes over in what could be described as the best representation of an Italian stronghold abroad.

Great food and hospitality overall, except for one of the hosts (Tommaso) which is never at home when you visit - as he’s probably on a bike somewhere in the middle of Finland.`
    },
    {
        name: 'Caro',
        connection: 'Here for the coffee',
        food: 5,
        sleep: null,
        neighborhood: 5,
        hosts: 1,
        comment: `I started coming to Leppacasa for F1 and a BBQ. Somehow, it quickly escalated into tennis, volleyball games, cremini marchigiani, pizza, focaccia, beer, wine, salami, cake. At this point, not sure if we come for the sport, the friends or the food. Probably the food.
Every visit somehow becomes a gourmet cooking gathering, with lot of fun and absolutely no regrets.`
    },
    {
        name: 'Toni',
        connection: 'Parpi’s friend',
        food: 4,
        sleep: 2,
        neighborhood: 5,
        hosts: 5,
        comment: 'Incredibile house and incredible host, unfortunately I can’t rate the food because we have always ate out, but it’s a great excuse for another experience there 😉 I will definitely suggest this accommodation for a 2 days vacation in Helsinki.'
    },
    {
        name: 'zuppa',
        connection: 'Parpi’s friend and co-couch owner from good old Otaniemi days',
        food: 5,
        sleep: 5,
        neighborhood: 5,
        hosts: 5,
        comment: 'Best bed and breakfast of Finland, 5 stars. Stayed here so often I basically became part of the furniture.'
    },

];
