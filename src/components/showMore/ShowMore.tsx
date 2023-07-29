import React, { useEffect } from "react";

import styles from "./ShowMore.module.css";

interface ShowMoreProps extends React.HTMLAttributes<HTMLDivElement> {
  maxHeight?: string;
}

const ShowMore = ({ maxHeight, children, ...rest }: ShowMoreProps) => {
  const [showMore, setShowMore] = React.useState(false);
  const [overflow, setOverflow] = React.useState(false);
  const divElement = React.useRef<HTMLDivElement>(null);

  const style = {
    overflow: "hidden",
    maxHeight: showMore ? "none" : maxHeight,
  };

  useEffect(() => {
    const htmlDivElement = divElement.current;
    if (htmlDivElement) {
      setOverflow(
        htmlDivElement.clientHeight >
          (htmlDivElement.parentElement as HTMLDivElement)?.clientHeight
      );
    } else {
      setOverflow(false);
    }
  }, [children, showMore, maxHeight]);

  return (
    <div {...rest}>
      <div style={style}>
        <div className={styles.wrapper} ref={divElement}>
          {children}
        </div>
      </div>
      {(showMore || overflow) && (
        <div className={styles['button-wrapper']}>
          <button
            className={styles.button}
            type="button"
            onClick={(e) => setShowMore((value) => !value)}
          >
            {!showMore ? "Show More" : "Show Less"}
          </button>
        </div>
      )}
    </div>
  );
};

export default ShowMore;
