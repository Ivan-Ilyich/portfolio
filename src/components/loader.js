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
    console.log('useLayoutEffect running');
    console.log('Initial refs:', { logoRef: logoRef.current, loaderRef: loaderRef.current });

    const timeout = setTimeout(() => {
      setIsMounted(true);
      console.log('After timeout - Refs:', { logoRef: logoRef.current, loaderRef: loaderRef.current });

      if (!logoRef.current || !loaderRef.current) {
        console.warn('Refs not ready:', { logoRef: logoRef.current, loaderRef: loaderRef.current });
        return;
      }

      const logoPaths = logoRef.current.querySelectorAll('path');
      const logoB = logoRef.current.querySelector('#B');

      console.log('Found elements:', {
        paths: logoPaths.length,
        pathElements: Array.from(logoPaths).map(p => p.outerHTML),
        logoB: logoB?.outerHTML
      });

      if (!logoPaths.length || !logoB) {
        console.warn('Logo elements not found', { paths: logoPaths, logoB });
        return;
      }

      console.log('Starting animation timeline');
      const loader = anime.timeline({
        complete: () => {
          console.log('Animation complete');
          // Log final computed styles
          const firstPath = logoPaths[0];
          const computedStyle = window.getComputedStyle(firstPath);
          console.log('Final computed styles:', {
            strokeDashoffset: computedStyle.strokeDashoffset,
            opacity: computedStyle.opacity,
            stroke: computedStyle.stroke
          });
          finishLoading();
        },
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
          targets: logoRef.current,
          delay: 500,
          duration: 300,
          easing: 'easeInOutQuart',
          opacity: 0,
          scale: 0.1,
        })
        .add({
          targets: loaderRef.current,
          duration: 200,
          easing: 'easeInOutQuart',
          opacity: 0,
          zIndex: -1,
        });

      console.log('Animation timeline created');
    }, 100);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <StyledLoader className="loader" ref={loaderRef}>
      <Helmet bodyAttributes={{ class: `hidden` }} />
      {console.log('Render - logoRef content:', logoRef.current?.innerHTML)}
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
