import React from "react";
import { useTranslation } from "react-i18next";
import { Card, Carousel } from "./AppleCard";

export function AppleCardsCarouselDemo() {
  const { t } = useTranslation();
  const data = Array.from({ length: 5 }, (_, index) => ({
    title: t(`slide${index + 1}H1`),
    src: `/media/offert${index + 1}.png`,
    category: t("serviceLabel"),
  }));

  return (
    <Carousel
      items={data.map((card, index) => (
        <Card key={card.src} card={card} index={index} />
      ))}
    />
  );
}
