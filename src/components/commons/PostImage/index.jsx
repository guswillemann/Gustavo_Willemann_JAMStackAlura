import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const PostImageWrapper = styled.figure`
  position: relative;
  width: ${({ width }) => width || '100%'};
  padding-top: 100%;
  margin: 0;
  font-size: 0;

  background-color: #d4d4d4;
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;

    background-image: url('/icons/imgPlaceholder.svg');
    background-repeat: no-repeat;
    background-position: center;
    
    opacity: 0.1;
  }

  img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export default function PostImage({
  imgSrc, filterClass, alt, width,
}) {
  const hasImgSrc = imgSrc !== '';

  return (
    <PostImageWrapper
      className={filterClass}
      width={width}
      isPlaceholder={!hasImgSrc}
    >
      {hasImgSrc && <img src={imgSrc} alt={alt} loading="lazy" />}
    </PostImageWrapper>
  );
}

PostImage.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  filterClass: PropTypes.string,
  alt: PropTypes.string,
  width: PropTypes.string,
};

PostImage.defaultProps = {
  alt: 'Imagem do post',
  filterClass: undefined,
  width: undefined,
};
