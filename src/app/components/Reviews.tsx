'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

import SectionTitle from '@/components/generated/SectionTitle';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface Review {
  name: string;
  comment: string;
  rating: number;
  image: string;
}

const reviews: Review[] = [
  {
    name: 'Sophie de Wit',
    comment:
      '@SavioDkh ook erg dankbaar en jullie daarbij ook dat jullie haar ook helpen en willen begelijden als ze iets vraagd dus hierbij ook alleen maar grote dank voor jullie alle en ehhhh die poll die openstond. ik trol graag dus dont worry savio is een van de beste traders die ik tot nu toe heb meegemaakt',
    rating: 4,
    image: 'review-1.png',
  },
  {
    name: 'Lotte Jansen',
    comment:
      'Ik geef jou geen kans jij wist mij in enkele dagen al te overtuigen jij bent geen financiële adviseur of weet ik het jij bent iemand die iedereen de juiste weg in wijst en laat zien hoe het moet en niet laat je niet van de wijs brengen en iemand die zonder grap kan zeggen dat jij niet kan traden vgm heeft die zn kop er niet bij of kijkt alleen wanneer het hem uitkomt',
    rating: 4.5,
    image: 'review-2.png',
  },
  {
    name: 'Thomas de Vries',
    comment:
      'Top, bedankt voor de uitleg ga sws verlengen Veel domme gropen gezeten niks begrepen 15 dagen bij jou gelijk snap ik het hoe markt werkt enz Kan ik ook reserveren voor 1 jaar?',
    rating: 3.5,
    image: 'review-3.png',
  },
  {
    name: 'Jasper van den Berg',
    comment: 'Bro echt respect voor wat je doet bro is heel professioneel en netjes georganiseerd ga zo door broer💯',
    rating: 4,
    image: 'review-4.png',
  },
  {
    name: 'Lars Vermeulen',
    comment:
      'Bro ben op je 1e call (btc short) van je na het joinen van de groep ingegaan en ik heb de 3 maanden prijs er al uit man, thanks bro 🫶🏻 nu net kleine partial position €150 gerealiseerd. Keiharde community!!',
    rating: 4.5,
    image: 'review-5.png',
  },
  {
    name: 'Iris van Leeuwen',
    comment:
      'hele fijne community, waar iedereen elkaar helpt. Uitleg geeft wanneer het nodig is en voor elkaar klaar staan. Ook wordt er snel gereageert. En natuurlijk veel calls die gedropt worden',
    rating: 4.5,
    image: 'review-6.png',
  },
  {
    name: 'Erik van Dijk',
    comment:
      'Dankjewel broeder voor je energie die je erin steekt en wij van profiteren, het wordt gewaardeerd. het 1000voudige is je gegunt',
    rating: 3.5,
    image: 'review-7.png',
  },
  {
    name: 'Eline Visser',
    comment:
      'Ik heb je gezegd, ik had mn twijfels maar vanaf de eerste week had ik al gelijk vetrouwen in je dat je een real one bent! Je weet hoe je dit aan gaat pakken en je hebt een plan om dit grandioos uit te spelen. Je bent flexibel, je speelt gelijk in de markt en staat klaar voor deze community in alle situaties en vragen💪🏻 Deze woorden zijn nu wat ik je als cadeau kan schenken, laten ze je motiveren om hiermee verder te gaan! Mochten we elkaar treffen, dan ga je een welverdiende cadeau van mij krijgen👌🏻',
    rating: 4.5,
    image: 'review-8.png',
  },
  {
    name: 'diaspora*',
    comment: 'Thanks nog bro voor de sessie heb in 1 uur meer geleerd dan ik voorheen dacht haha💪🏻',
    rating: 3.5,
    image: 'review-9.png',
  },
  {
    name: 'Tobias van der Meer',
    comment: 'Ben tot nu toe zeeeeer tevreden met deze groep Zit er pas 2 weken in ofzo',
    rating: 4,
    image: 'review-10.png',
  },
  {
    name: 'Noa Hendriks',
    comment:
      'Mooi en goed bericht nooit geen spijt gehad met joinen. Jij bent de beste die ik ken dat is niet om te slijmen maar jou resultaten liegen niet je bent keihard',
    rating: 4,
    image: 'review-10.png',
  },
  {
    name: 'Stefan Kuipers',
    comment:
      'Bro, echt heel veel respect voor wat je aan het bouwen bent hier. Wat je hebt neergezet, is niet zomaar een community, maar een plek waar we allemaal echt wat aan hebben. De waarde die je brengt en de energie die erin gestopt wordt, zijn uniek, en dat zie je niet vaak. Deze community is niet alleen een plek om erbij te zijn, maar ook een bron van inspiratie, ontwikkeling en om inzichten te krijgen. Ik ben super tevreden met alles wat ik hier heb geleerd en de support die je elke dag weer aanbiedt. Ik merk hoe dedicated je bent om de beste kennis en ervaring met ons allemaal te delen en het niveau van de community omhoog wilt halen om de beste en eerlijkste te zijn van NL (als we dat al niet zijn). Thanks voor de kans om zo lang deel uit te maken van deze groep, en weet dat je support en inzet echt worden gewaardeerd.',
    rating: 5,
    image: 'review-11.png',
  },
  {
    name: 'Daan Mulder',
    comment: 'wat ben ik blij dat ik in deze groep zit ik zweer het',
    rating: 3.5,
    image: 'review-12.png',
  },
  {
    name: 'Jan',
    comment: 'Eerste dag binnen maar voelt al als een goeie community',
    rating: 4,
    image: 'review-13.png',
  },
  {
    name: 'Anouk Meijer',
    comment: 'Ik heb van 13 euro nu bijna 300 gemaakt in 3 weken tijd',
    rating: 4,
    image: 'review-14.png',
  },
  {
    name: 'VifrA',
    comment: 'Leuke feature die liveservice',
    rating: 4,
    image: 'review-15.png',
  },
  {
    name: 'Ron',
    comment: 'Gaaf @Cryptoarchitect deze manier van community driven, houden we erin! Helaas moet ik gaan!',
    rating: 4.5,
    image: 'review-16.png',
  },
];

export default function Reviews() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const rows = gsap.utils.toArray<HTMLDivElement>('.review-row');

    rows.forEach((row, index) => {
      const direction = index % 2 === 0 ? 1 : -1;

      gsap.to(row, {
        x: `-${direction * 10}%`,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const renderReviewRow = (startIndex: number, rowIndex: number) => (
    <div className={`review-row flex gap-3 ${rowIndex % 2 === 0 ? '' : 'flex-row-reverse'}`}>
      {reviews.slice(startIndex, startIndex + 10).map((review, index) => (
        <div key={index} className="bg-black border w-full p-6 shadow-lg transition-all duration-300 relative ">
          <BluredBox />

          <div className="flex flex-col gap-2 w-[200px] sm:w-[500px] relative z-10">
            {/* Stars  */}
            <div className="flex items-center gap-2">
              <div className="flex gap-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="fill-white h-5 w-5" />
                ))}
              </div>

              <p className="">{review.rating}</p>
            </div>

            {/* Description  */}
            <p className=" text-white/80 mb-4">{review.comment.substring(0, 350)}...</p>

            {/* Name and date  */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Image
                  src={`/reviews-profiles/${review.image}`}
                  height={400}
                  width={400}
                  alt="Image"
                  className="h-10 w-10 rounded-full"
                />
                <h3 className="text-base font-medium text-white mb-2">{review.name}</h3>
              </div>

              <p>Jan 12</p>
            </div>
          </div>

          <BluredBox />
        </div>
      ))}
    </div>
  );

  return (
    <div ref={containerRef} className=" bg-own-primary-5 pt-8 overflow-hidden">
      <SectionTitle
        title="Voices from the community"
        description="Hear from our members as they share how we helped them master crypto investing and achieve their financial goals"
        isCentered={true}
        className="mb-10"
      />

      <div className=" overflow-hidden h-[800px]">
        <div className="-rotate-6 relative -top-[164px]">
          <div className="space-y-3">
            {renderReviewRow(0, 0)}
            {renderReviewRow(4, 1)}
            {renderReviewRow(8, 2)}
            {renderReviewRow(12, 3)}
          </div>
        </div>
      </div>
    </div>
  );
}

function BluredBox() {
  return (
    <div className="absolute right-0 top-0 overflow-hidden h-full w-full pointer-events-none">
      <div className="bg-own-primary-3 blur-3xl opacity-70 absolute top-2 right-2 h-[100px] w-[100px] z-[1]" />

      <div className="bg-own-primary-1 blur-3xl opacity-90 absolute bottom-2 left-2 h-[100px] w-[100px] z-[1]" />
    </div>
  );
}
