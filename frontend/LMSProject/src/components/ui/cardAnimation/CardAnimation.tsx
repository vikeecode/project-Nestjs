import React from "react";
import styled from "styled-components";

interface AnimatedAuthCardProps {
  children: React.ReactNode;
}

const AnimatedAuthCard: React.FC<AnimatedAuthCardProps> = ({ children }) => {
  return (
    <StyledWrapper>
      <div className="parent">
        <div className="card">
          <div className="glass" />
          <div className="content">{children}</div>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .parent {
    width: 100%;
    max-width: 420px;
    margin: 0 auto;
    perspective: 1000px;
  }

  .card {
    position: relative;
    border-radius: 30px;
    background: linear-gradient(
      135deg,
      rgb(168, 85, 247) 0%,
      rgb(126, 34, 206) 100%
    );
    transition: all 0.5s ease-in-out;
    transform-style: preserve-3d;
    box-shadow:
      rgba(88, 28, 135, 0) 40px 50px 25px -40px,
      rgba(88, 28, 135, 0.25) 0px 25px 25px -5px;
    padding: 8px;
  }

  .glass {
    position: absolute;
    inset: 8px;
    border-radius: 26px;
    background: linear-gradient(
      0deg,
      rgba(255, 255, 255, 0.6) 0%,
      rgba(255, 255, 255, 0.92) 100%
    );
    border-left: 1px solid white;
    border-bottom: 1px solid white;
    transition: all 0.5s ease-in-out;
    transform: translate3d(0px, 0px, 15px);
    transform-style: preserve-3d;
  }

  .content {
    position: relative;
    padding: 28px 24px;
    transform: translate3d(0, 0, 26px);
    transform-style: preserve-3d;
  }

  /* subtle tilt only on hover — desktop only, respects reduced motion */
  @media (hover: hover) and (pointer: fine) {
    .parent:hover .card {
      transform: rotate3d(1, 1, 0, 6deg);
      box-shadow:
        rgba(88, 28, 135, 0.3) 20px 40px 25px -35px,
        rgba(88, 28, 135, 0.15) 0px 25px 30px 0px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .card,
    .glass {
      transition: none;
    }
    .parent:hover .card {
      transform: none;
    }
  }
`;

export default AnimatedAuthCard;
