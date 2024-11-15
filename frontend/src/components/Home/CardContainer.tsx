// CardContainer.tsx
import React from "react";
import { Card, CardProps } from "./Card";

interface CardContainerProps {
  title: string;
  description: string;
  cards: CardProps[];
}

const CardContainer: React.FC<CardContainerProps> = ({
  title,
  description,
  cards,
}) => {
  return (
    <div className="flex flex-col w-[90%] mx-auto hide-scroll">
      <div className="mb-6">
        <p className="font-bold text-2xl text-gray-100 mb-2">{title}</p>
        <p className="text-gray-100 text-sm">{description}</p>
      </div>

      <div className="flex flex-row overflow-x-auto gap-4 pb-20">
        {cards.map((cardData, index) => (
          <Card
            key={index}
            imageSrc={cardData.imageSrc}
            profileSrc={cardData.profileSrc}
            title={cardData.title}
            subtitle={cardData.subtitle}
            linkUrl={cardData.linkUrl}
          />
        ))}
      </div>
    </div>
  );
};

export default CardContainer;
