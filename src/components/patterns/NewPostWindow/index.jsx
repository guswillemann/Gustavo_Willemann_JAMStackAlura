/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import styled from 'styled-components';
import Button, { IconButton } from '../../commons/Button';
import useWebsitePageContext from '../../wrappers/WebsitePage/context';
import Box from '../../foundation/layout/Box';
import PostImage from '../../commons/PostImage';

import NewPostWrapper from './NewPostWrapper';
import ImageUrlForm from './ImageUrlForm';
import FilterOptions from './FilterOptions';
import userService from '../../../services/user/userService';

const BackButton = styled(IconButton)`
  position: absolute;
  top: 12px;
  left: 12px;
  transform: rotate(180deg);
`;

const CloseButton = styled(IconButton)`
  position: absolute;
  top: 12px;
  right: 12px;
`;

export default function NewPostWindow() {
  const {
    modalProps,
    toggleModal,
    setNewPost,
  } = useWebsitePageContext();

  const [imgSrc, setImgSrc] = useState('');
  const [urlString, setUrlString] = useState('');
  const [isSelectingFilter, setIsSelectingFilter] = useState(false);
  const [filterClass, setFilterClass] = useState(undefined);

  const isDisabled = !imgSrc || (isSelectingFilter && filterClass === undefined);

  async function completeNewPost() {
    await userService.sendNewPost({
      photoUrl: urlString,
      description: 'Post Description',
      filter: filterClass,
    })
      .then((post) => setNewPost(post));
  }

  function handleClick() {
    if (isSelectingFilter) completeNewPost();
    else setIsSelectingFilter(true);
  }

  function onBack() {
    setIsSelectingFilter(false);
    setFilterClass(undefined);
  }

  return (
    <Box
      display="flex"
      justifyContent="space-around"
      flex="1"
    >
      <NewPostWrapper
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...modalProps}
      >
        {isSelectingFilter && <BackButton type="button" onClick={onBack}><img src="/icons/arrow-right-dark.svg" alt="Voltar" /></BackButton>}
        <CloseButton type="button" onClick={() => toggleModal()}><img src="/icons/xIcon.svg" alt="Fechar" /></CloseButton>

        <PostImage imgSrc={imgSrc} filterClass={filterClass} alt="Imagem escolhida" />

        {isSelectingFilter
          ? (
            <FilterOptions
              imgSrc={imgSrc}
              setFilterClass={setFilterClass}
            />
          )
          : (
            <ImageUrlForm
              urlString={urlString}
              setUrlString={setUrlString}
              setImgSrc={setImgSrc}
            />
          )}

        <Box
          padding="0 24px"
        >
          <Button
            variant="primary.main"
            fullWidth
            onClick={handleClick}
            disabled={isDisabled}
            type="button"
          >
            {isSelectingFilter ? 'Postar' : 'Avançar'}
          </Button>
        </Box>
      </NewPostWrapper>
    </Box>
  );
}
