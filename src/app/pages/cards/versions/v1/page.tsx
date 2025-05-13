"use client";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  useMotionValueEvent,
} from "framer-motion";
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
  dragPercentage: number;
  setDragPercentage: (percentage: number) => void;
  onSwipe: (cardId: number) => void;
  cardContainerSize: { width: number; height: number };
}

const CardMotionItem: React.FC<CardMotionItemProps> = ({
  card,
  index,
  onSwipe,
  setDragPercentage,
}) => {
  const x = useMotionValue(0);
  const translateX = useTransform(x, [-100, 0, 100], [-100, 0, 100]);
  const rotateY = useTransform(x, [-200, 0, 200], [65, 0, -65]);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // const completeness = Math.min(Math.abs(dragPercentage) / 170, 1);
  const completeness = 0;

  useMotionValueEvent(x, "change", (latest) => {
    if (!isTransitioning) {
      setDragPercentage(latest);
    }
  });

  const handleDragEnd = async () => {
    const xValue = x.get();
    if (xValue > SWIPE_THRESHOLD || xValue < -SWIPE_THRESHOLD) {
      setIsTransitioning(true);
      // Animate to the edge first
      await animate(x, xValue > 0 ? 170 : -170, {
        duration: 0.1,
      });
      onSwipe(card.id);
      // Keep completeness at 1 during the array rearrangement
      await new Promise((resolve) => setTimeout(resolve, 50));
      // Now reset position with a spring animation
      await animate(x, 0, {
        duration: SWIPE_ANIMATION_DURATION_MS,
        type: "spring",
      });
      setDragPercentage(0);
      setIsTransitioning(false);
    } else {
      // If not past threshold, just animate back to center
      await animate(x, 0, {
        duration: SWIPE_ANIMATION_DURATION_MS,
        type: "spring",
      });
    }
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
        scale: 1 - (4 - index - (isTransitioning ? 1 : completeness)) * 0.01,
        rotate: (4 - index - (isTransitioning ? 1 : completeness)) * 2,
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
  const [dragPercentage, setDragPercentage] = useState(0);
  const [cards, setCards] = useState<CardData[]>(initialCardsData);
  const [swipedCardInfo, setSwipedCardInfo] = useState<{
    id: number;
    direction: number;
  } | null>(null);

  const cardContainerSize = { width: 300, height: 400 }; // Define fixed card size

  const handleActualSwipe = () => {
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
            dragPercentage={dragPercentage}
            setDragPercentage={setDragPercentage}
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
