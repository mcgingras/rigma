"use client";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useState } from "react";

interface CardData {
  id: number;
  content: string;
  bgColor: string;
}

const initialCardsData: CardData[] = [
  { id: 1, content: "Card 1", bgColor: "bg-red-500" },
  { id: 2, content: "Card 2", bgColor: "bg-blue-500" },
  { id: 3, content: "Card 3", bgColor: "bg-green-500" },
  { id: 4, content: "Card 4", bgColor: "bg-yellow-400" },
  { id: 5, content: "Card 5", bgColor: "bg-purple-500" },
];

const SWIPE_THRESHOLD = 100; // Minimum x offset for a swipe
const SWIPE_ANIMATION_DURATION_MS = 1; // Duration for swipe-off animation

interface CardMotionItemProps {
  card: CardData;
  index: number;
  isTopCard: boolean;
  currentSwipedCardInfo: { id: number; direction: number } | null;
  totalCards: number;
  onSwipe: (cardId: number) => void;
  cardContainerSize: { width: number; height: number };
}

const CardMotionItem: React.FC<CardMotionItemProps> = ({
  card,
  index,
  onSwipe,
}) => {
  const x = useMotionValue(0);
  const translateX = useTransform(x, [-100, 0, 100], [-100, 0, 100]);
  const rotateY = useTransform(x, [-200, 0, 200], [65, 0, -65]);

  const handleDragEnd = async () => {
    const xValue = x.get();

    if (xValue > SWIPE_THRESHOLD) {
      // Animate card off screen to the right
      x.stop();
      if (xValue < 170) {
        await animate(x, 170, {
          duration: 0.1,
        });
      }
      onSwipe(card.id);
    } else if (xValue < -SWIPE_THRESHOLD) {
      // Animate card off screen to the left
      x.stop();
      if (xValue > -170) {
        await animate(x, -170, {
          duration: 0.1,
        });
      }
      onSwipe(card.id);
    }

    await animate(x, 0, {
      duration: SWIPE_ANIMATION_DURATION_MS,
      type: "spring",
    });
  };

  return (
    <motion.div
      className={`w-full h-full rounded-xl shadow-lg ${card.bgColor} absolute cursor-grab`}
      drag="x"
      style={{
        x,
        translateX,
        rotateY,
        transformStyle: "preserve-3d",
        scale: 1 - (4 - index) * 0.02,
        rotate: (index % 2 === 0 ? 1 : -1) * (4 - index) * 2,
      }}
      onDragEnd={handleDragEnd}
      dragElastic={0.3}
      dragMomentum={false}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
    >
      <div className="h-full w-full p-4">
        <p className="text-2xl font-bold text-white">Hello from {card.id}</p>
        <span className="text-white">Maybe we need some text here</span>
      </div>
    </motion.div>
  );
};

export default function CardsPage() {
  const [cards, setCards] = useState<CardData[]>(initialCardsData);
  const [swipedCardInfo, setSwipedCardInfo] = useState<{
    id: number;
    direction: number;
  } | null>(null);

  const cardContainerSize = { width: 300, height: 400 }; // Define fixed card size

  const handleActualSwipe = (cardId: number) => {
    setTimeout(() => {
      setCards((prevCards) => {
        const newCards = [...prevCards];
        const lastCard = newCards.pop();
        if (lastCard) {
          newCards.unshift(lastCard);
        }
        return newCards;
      });
      setSwipedCardInfo(null);
    }, 10);
  };

  // Removed getCardAnimProps from here, logic moved to calculateAnimProps

  return (
    <main className="h-screen w-screen bg-gray-200 flex flex-col items-center justify-center overflow-hidden select-none">
      <div
        className="relative"
        style={{
          width: cardContainerSize.width,
          height: cardContainerSize.height,
          perspective: "1500px",
          perspectiveOrigin: "left center",
        }}
      >
        {cards.map((cardItem, idx) => (
          <CardMotionItem
            key={cardItem.id}
            card={cardItem}
            index={idx}
            isTopCard={idx === 0}
            currentSwipedCardInfo={swipedCardInfo}
            totalCards={cards.length}
            onSwipe={handleActualSwipe}
            cardContainerSize={cardContainerSize}
          />
        ))}
      </div>
    </main>
  );
}
