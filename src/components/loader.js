import React, { useLayoutEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import anime from 'animejs';
import styled from 'styled-components';
import { IconLoader } from '@components/icons';

const StyledLoader = styled.div`
  ${({ theme }) => theme.mixins.flexCenter};
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: var(--dark-navy);
  z-index: 99;

  .logo-wrapper {
    width: max-content;
    max-width: 100px;
    transition: var(--transition);
    svg {
      display: block;
      width: 100%;
      height: 100%;
      margin: 0 auto;
      fill: none;
      user-select: none;

      path {
        stroke: currentColor;
        stroke-width: 5;
        stroke-dasharray: 1000;
        stroke-dashoffset: 1000;
        opacity: 0;
      }

      #B {
        opacity: 0;
      }
    }
  }
`;

const Loader = ({ finishLoading }) => {
  const [isMounted, setIsMounted] = useState(false);
  const logoRef = useRef(null);
  const loaderRef = useRef(null);

  useLayoutEffect(() => {
    const timeout = setTimeout(() => {
      setIsMounted(true);

      let attempts = 0;
      const MAX_ATTEMPTS = 10;

      const checkAndAnimate = () => {
        const logoNode = logoRef.current;
        const loaderNode = loaderRef.current;

        if (!logoNode || !loaderNode || !logoNode.querySelectorAll) {
          if (attempts < MAX_ATTEMPTS) {
            attempts++;
            setTimeout(checkAndAnimate, 100);
          }
          return;
        }

        const logoPaths = logoNode.querySelectorAll('path');
        const logoB = logoNode.querySelector('#B');

        if (!logoPaths.length || !logoB) {
          return;
        }

        const loader = anime.timeline({
          complete: () => finishLoading(),
        });

        loader
          .add({
            targets: logoPaths,
            delay: 300,
            duration: 1500,
            easing: 'easeInOutQuart',
            strokeDashoffset: [anime.setDashoffset, 0],
            opacity: [0, 1],
            stroke: '#64ffda'
          })
          .add({
            targets: logoB,
            duration: 700,
            easing: 'easeInOutQuart',
            opacity: 1,
          })
          .add({
            targets: logoNode,
            delay: 500,
            duration: 300,
            easing: 'easeInOutQuart',
            opacity: 0,
            scale: 0.1,
          })
          .add({
            targets: loaderNode,
            duration: 200,
            easing: 'easeInOutQuart',
            opacity: 0,
            zIndex: -1,
          });
      };

      checkAndAnimate();
    }, 100);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <StyledLoader className="loader" ref={loaderRef}>
      <Helmet bodyAttributes={{ class: `hidden` }} />
      <div className="logo-wrapper" ref={logoRef}>
        <IconLoader />
      </div>
    </StyledLoader>
  );
};

Loader.propTypes = {
  finishLoading: PropTypes.func.isRequired,
};

export default Loader;
