/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
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

const NewPostWindowStates = {
  default: 'default',
  imgLoaded: 'imgLoaded',
  selectingFilter: 'selectingFilter',
  posting: 'posting',
};

export default function NewPostWindow() {
  const {
    modalProps,
    toggleModal,
    setNewPost,
  } = useWebsitePageContext();

  const [newPostWindowState, setNewPostWindowState] = useState(NewPostWindowStates.default);
  const [imgSrc, setImgSrc] = useState('');
  const [urlString, setUrlString] = useState('');
  const [filterClass, setFilterClass] = useState(undefined);

  useEffect(() => {
    if (imgSrc === '') setNewPostWindowState(NewPostWindowStates.default);
    else setNewPostWindowState(NewPostWindowStates.imgLoaded);
  }, [imgSrc]);

  const isDisabled = (newPostWindowState === NewPostWindowStates.default)
    || (newPostWindowState === NewPostWindowStates.isSelectingFilter && filterClass === undefined)
    || (newPostWindowState === NewPostWindowStates.posting);

  function resetPostWindow() {
    setNewPostWindowState(NewPostWindowStates.default);
    setImgSrc('');
    setUrlString('');
    setFilterClass(undefined);
    toggleModal();
  }

  async function completeNewPost() {
    setNewPostWindowState(NewPostWindowStates.posting);
    await userService.sendNewPost({
      photoUrl: urlString,
      description: 'Post Description',
      filter: filterClass,
    })
      .then((post) => {
        setNewPost(post);
        resetPostWindow();
      })
      .catch(() => {
        // eslint-disable-next-line no-alert
        alert('Falha na criação do post.');
        setNewPostWindowState(NewPostWindowStates.selectingFilter);
      });
  }

  function handleClick() {
    if (newPostWindowState === NewPostWindowStates.selectingFilter) completeNewPost();
    else setNewPostWindowState(NewPostWindowStates.selectingFilter);
  }

  function onBack() {
    setNewPostWindowState(NewPostWindowStates.imgLoaded);
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
        {newPostWindowState === NewPostWindowStates.selectingFilter && (
          <BackButton type="button" onClick={onBack}>
            <img src="/icons/arrow-right-dark.svg" alt="Voltar" />
          </BackButton>
        )}

        <CloseButton type="button" onClick={() => toggleModal()}>
          <img src="/icons/xIcon.svg" alt="Fechar" />
        </CloseButton>

        <PostImage imgSrc={imgSrc} filterClass={filterClass} alt="Imagem escolhida" />

        {(newPostWindowState === NewPostWindowStates.selectingFilter
          || newPostWindowState === NewPostWindowStates.posting)
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
            {newPostWindowState === NewPostWindowStates.selectingFilter ? 'Postar' : 'Avançar'}
          </Button>
        </Box>
      </NewPostWrapper>
    </Box>
  );
}
