import React, { JSX } from "react";
import ContentLoader from "react-content-loader";

const PizzaCardSkeleton = (): JSX.Element => (
  <ContentLoader
    className="pizza-card"
    speed={2}
    width={280}
    height={465}
    viewBox="0 0 280 465"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <circle cx="140" cy="140" r="125" />
    <rect x="0" y="285" rx="10" ry="10" width="280" height="20" />
    <rect x="1" y="320" rx="10" ry="10" width="280" height="80" />
    <rect x="0" y="423" rx="10" ry="10" width="90" height="30" />
    <rect x="130" y="415" rx="25" ry="25" width="150" height="45" />
  </ContentLoader>
);

export default PizzaCardSkeleton;
